const vscode = require('vscode');
const path = require('path');
const reservedWords = require('./reservedWords'); 
const fs = require('fs');

function activate(context) {
    const linkProvider = vscode.languages.registerDocumentLinkProvider({ language: 'sii' }, {
        provideDocumentLinks(document) {
            const links = [];
            const regex = /(?:\b\w+(?:\[\])?:|@include)\s*"([^"]*\/[^"]*\/[^"]+)"/g;
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                let match;
                while ((match = regex.exec(line.text)) !== null) {
                    const start = match.index + match[0].indexOf(match[1]);
                    const end = start + match[1].length;
                    const range = new vscode.Range(i, start, i, end);

                    if (workspaceFolder) {
                        const targetPath = path.join(workspaceFolder, match[1].replace(/\//g, path.sep));
                        const targetUri = vscode.Uri.file(targetPath);
                        links.push(new vscode.DocumentLink(range, targetUri));
                    }
                }
            }

            return links;
        }
    });

    const hoverProvider = vscode.languages.registerHoverProvider('sii', {
        provideHover(document, position) {
            const wordRange = document.getWordRangeAtPosition(position);
            const word = document.getText(wordRange);
    
            const reservedWord = reservedWords.find(item => item.name === word);
    
            if (reservedWord) {
                const markdown = new vscode.MarkdownString();
                markdown.appendMarkdown(`**${reservedWord.name}**`);
                markdown.appendMarkdown(`\n\n${reservedWord.description}`);
                markdown.appendMarkdown(`\n\nType: **${reservedWord.type}**`);
                markdown.appendMarkdown(`\n\n---\n`);
                markdown.appendMarkdown(`\`Example usage for:\`\n`);
                markdown.appendMarkdown(`\`\`\`sii\n${reservedWord.example}\n\`\`\``);
                markdown.appendMarkdown(`\n\n---\n`);
                markdown.appendMarkdown(`[Check reference guide.](https://modding.scssoft.com/index.php?search=${reservedWord.name}&title=Special%3ASearch&go=Go)`);
                markdown.isTrusted = true;
                return new vscode.Hover(markdown, wordRange);
            }
        }
    });

    const completionProvider = vscode.languages.registerCompletionItemProvider('sii', {
        provideCompletionItems() {
            const completionItems = [];
            for (const reservedWord of reservedWords) {
                const item = new vscode.CompletionItem(
                    reservedWord.name,
                    vscode.CompletionItemKind.Keyword
                );
                item.detail = `Type: ${reservedWord.type}`;
                completionItems.push(item);
            }
            return completionItems;
        }
    });

    context.subscriptions.push(hoverProvider, completionProvider);

    const diagnostics = vscode.languages.createDiagnosticCollection("reservedWords");

    function validateDocument(document) {
        if (document.languageId !== "sii") return;

        const diagnosticsArray = [];
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

        // Expresión regular para paths y @include
        const regex = /@include\s+"([^"]+)"|"(\/[^"]+\/[^"]+)"/g;

        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            let match;
            while ((match = regex.exec(line.text)) !== null) {
                // match[1] es para @include, match[2] para paths normales
                const filePath = match[1] || match[2];
                if (filePath && workspaceFolder) {
                    const absPath = path.join(workspaceFolder, filePath.replace(/\//g, path.sep));
                    if (!fs.existsSync(absPath)) {
                        const start = match.index + line.text.slice(match.index).indexOf(filePath);
                        const end = start + filePath.length;
                        const range = new vscode.Range(i, start, i, end);
                        diagnosticsArray.push(new vscode.Diagnostic(
                            range,
                            `Referenced file does not exist: ${filePath}`,
                            vscode.DiagnosticSeverity.Warning
                        ));
                    }
                }
            }
        }

        diagnostics.set(document.uri, diagnosticsArray);
    }

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(validateDocument),
        vscode.workspace.onDidChangeTextDocument(e => validateDocument(e.document)),
        vscode.workspace.onDidCloseTextDocument(doc => diagnostics.delete(doc.uri))
    );

    const formatDocumentCommand = vscode.commands.registerCommand('extension.formatSiiDocument', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
    
        const document = editor.document;
        const text = document.getText();
    
        // Expresión regular para capturar bloques y formatearlos
        const formattedText = text.replace(
            /(\w+\s*:\s*\.\w+)\s*{([\s\S]*?)}/g,
            (match, header, body) => {
                const formattedBody = body
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line) // Eliminar líneas vacías
                    .map(line => `\t\t${line}`) // Agregar indentación
                    .join('\n');
                return `${header}\n\t{\n${formattedBody}\n\t}`;
            }
        );
    
        // Reemplazar el contenido del editor con el texto formateado
        editor.edit(editBuilder => {
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(text.length)
            );
            editBuilder.replace(fullRange, formattedText);
        });
    });
    
    // Registrar el comando
    context.subscriptions.push(formatDocumentCommand);

    const formattingProvider = vscode.languages.registerDocumentFormattingEditProvider('sii', {
        provideDocumentFormattingEdits(document) {
            const edits = [];
            const text = document.getText();

            // Separar por líneas y procesar indentación
            const lines = text.split('\n');
            let indentLevel = 0;
            const indent = '\t';
            const formattedLines = [];

            for (let line of lines) {
                let trimmed = line.trim();

                // Disminuir indentación si la línea es solo "}"
                if (trimmed === '}') indentLevel--;

                // Aplicar indentación
                if (trimmed.length > 0) {
                    formattedLines.push(indent.repeat(indentLevel) + trimmed);
                } else {
                    formattedLines.push('');
                }

                // Aumentar indentación si la línea termina con "{"
                if (trimmed.endsWith('{')) indentLevel++;
            }

            const formattedText = formattedLines.join('\n');

            // Crear un rango que cubra todo el documento
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(text.length)
            );

            edits.push(vscode.TextEdit.replace(fullRange, formattedText));
            return edits;
        }
    });

    // Registrar el formateador
    context.subscriptions.push(formattingProvider);

    context.subscriptions.push(linkProvider);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};