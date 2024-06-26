'use client';

import {createSnippet} from "@/actions/snippets";
import {useFormState} from "react-dom";

export default function SnippetCreatePage() {
    const [formState, action] = useFormState(createSnippet, {messages: []});

    const renderedMessages =
        formState.messages.length == 0
            ? null
            : <ul className="my-2 p-2 bg-red-200 border rounder border-red-400">
                {formState.messages.map((message, i) => {
                    return <li key={i}>{message}</li>
                })}
            </ul>

    return <form action={action}>
        <h3 className="font-bold m-3">Create a Snippet</h3>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <label className="w-12" htmlFor="title">Title</label>
                <input
                    name="title"
                    id="title"
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="flex gap-4">
                <label className="w-12" htmlFor="code">Code</label>
                <textarea
                    name="code"
                    id="code"
                    className="border rounded p-2 w-full"
                />
            </div>
            {renderedMessages}
            <button type="submit" className="rounded p-2 bg-blue-200">Create</button>
        </div>
    </form>
}