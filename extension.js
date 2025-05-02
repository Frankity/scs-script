const vscode = require('vscode');
const path = require('path');

function activate(context) {
    const linkProvider = vscode.languages.registerDocumentLinkProvider({ language: 'sii' }, {
        provideDocumentLinks(document) {
            const links = [];
            // Expresión regular mejorada para detectar claves y directivas como @include
            const regex = /(?:\b\w+(?:\[\])?:|@include)\s*"([^"]+)"/g;
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

    context.subscriptions.push(linkProvider);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};