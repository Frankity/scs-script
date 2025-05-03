const vscode = require('vscode');
const path = require('path');
const reservedWords = require('./reservedWords'); 

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
    
        // const diagnosticsArray = [];
        // // Expresión regular para capturar palabras antes de ":" o en líneas sin ":"
        // const regex = /\b\w+\b/g;
    
        // for (let i = 0; i < document.lineCount; i++) {
        //     const line = document.lineAt(i);
        //     let match;
    
        //     // Dividir la línea en dos partes: antes y después de ":"
        //     const parts = line.text.split(":");
        //     const textToValidate = parts.length > 1 ? parts[0] : line.text;
    
        //     while ((match = regex.exec(textToValidate)) !== null) {
        //         const word = match[0];
    
        //         // Verificar si la palabra está en el arreglo de palabras reservadas
        //         const isReserved = reservedWords.some(item => item.name === word);
    
        //         if (!isReserved) {
        //             const range = new vscode.Range(i, match.index, i, match.index + word.length);
        //             const diagnostic = new vscode.Diagnostic(
        //                 range,
        //                 `"${word}" is not a valid reserved word.`,
        //                 vscode.DiagnosticSeverity.Error
        //             );
        //             diagnosticsArray.push(diagnostic);
        //         }
        //     }
        // }
    
        // diagnostics.set(document.uri, diagnosticsArray);
    }

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(validateDocument),
        vscode.workspace.onDidChangeTextDocument(e => validateDocument(e.document)),
        vscode.workspace.onDidCloseTextDocument(doc => diagnostics.delete(doc.uri))
    );

    context.subscriptions.push(linkProvider);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};