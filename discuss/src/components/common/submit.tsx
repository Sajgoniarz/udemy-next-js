import {useFormStatus} from "react-dom";
import {Button} from "@nextui-org/react";

export default function Submit() {
    const status = useFormStatus();

    return (
        <Button type="submit" isLoading={status.pending}>Submit</Button>
    )
}