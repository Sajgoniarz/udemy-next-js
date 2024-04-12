'use client';

import {Snippet} from "@prisma/client";
import {useState} from "react";
import {Editor} from "@monaco-editor/react";

interface SnippetEditFormProps {
    snippet: Snippet
}

export default function SnippetEditForm({snippet}: SnippetEditFormProps) {
    const [code, setCode] = useState(snippet.code);

    const onChange = (value: string = "") => {
        setCode(value);
    };

    return (
        <Editor
            height="40vh"
            theme="vs-dark"
            language="JavaScript"
            defaultValue={snippet.code}
            onChange={onChange}
            options={{
                minimap: {
                    enabled: false
                }
            }}
        />
    );
}