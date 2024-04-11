interface SnippetEditProps {
    params: {
        id: string,
    }
}

export default function SnippetEditPage(props: SnippetEditProps) {
    return (
        <div> Edit Snippet with ID: {props.params.id}</div>
    )
}