'use client';

import {Snippet} from "@prisma/client";
import {startTransition, useState} from "react";
import {Editor} from "@monaco-editor/react";
import {updateSnippet} from "@/actions/snippets";

interface SnippetEditFormProps {
    snippet: Snippet,
}

export default function SnippetEditForm({snippet}: SnippetEditFormProps) {
    const [code, setCode] = useState(snippet.code);

    const onChange = (value: string = "") => {
        setCode(value);
    };

    const onUpdateSnippet = () => {
        startTransition(async () => {
            await updateSnippet(snippet.id, code);
        });
    }

    return (
        <>
            <Editor
                height="40vh"
                theme="vs-dark"
                language="javascript"
                defaultValue={snippet.code}
                onChange={onChange}
                options={{
                    minimap: {
                        enabled: false
                    }
                }}
            />
            <button type="button" className="p-2 border rounded" onClick={onUpdateSnippet}>Update</button>
        </>
    );
}