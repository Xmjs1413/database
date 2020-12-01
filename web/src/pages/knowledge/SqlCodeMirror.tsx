import * as React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/sql/sql.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/theme/duotone-dark.css';

interface SqlCodeMirrorProps {
    id?: string,
    value?: any,
    onChange?: (code: string) => void
}

const SqlCodeMirror = (props: SqlCodeMirrorProps) => {
    const ref = React.useRef<any>(null);

    const option = {
        lineNumbers: true,              
        mode: { name: "text/x-mysql" },       
        extraKeys: { "Ctrl": "autocomplete" },
        theme: "duotone-dark"                
    };

    return (
        <CodeMirror
            editorDidMount={editor => { ref.current = editor }}
            value={props.value}
            options={option}
            onBeforeChange={(editor, data, value) => {
                //console.log(data,value)
            }}
            onChange={(editor, data, value) => {
                //console.log(data,value)
            }}
            onBlur={(editor:any,ev)=>{
               // console.log(editor,ev,'ev')
            }}
        />
    )
};

export default SqlCodeMirror;

