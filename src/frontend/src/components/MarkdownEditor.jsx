'use client'

import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/keybinding-vim';
import 'ace-builds/src-noconflict/ext-language_tools';

export default function MarkdownEditor({text, setText}) {
    return (
        <AceEditor
            mode="markdown"
            theme="github"
            onChange={setText}
            value={text}
            keyboardHandler="vim"
            name="markdown-editor"
            editorProps={{$blockScrolling: true}}
            className="w-full h-full"
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                showLineNumbers: true,
                tabSize: 2,
                wrap: true,
                fontSize: 16,
            }}
        />
    );
}