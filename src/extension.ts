import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'vscode-pixel2rem.px2rem',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      const pxRegex = /(\d+(\.\d+)?)px/;
      const remRegex = /(\d+(\.\d+)?)rem/;
      const matchPx = text.match(pxRegex);
      const matchRem = text.match(remRegex);

      if (matchPx) {
        const pxValue = parseFloat(matchPx[1]);
        const remValue = pxValue / 16;

        const convertedText = text.replace(pxRegex, `${remValue}rem`);

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, convertedText);
        });

        return;
      }

      if (matchRem) {
        const remValue = parseFloat(matchRem[1]);
        const pxValue = remValue * 16;

        const convertedText = text.replace(remRegex, `${pxValue}px`);

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, convertedText);
        });

        return;
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
