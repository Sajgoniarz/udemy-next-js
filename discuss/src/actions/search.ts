import {redirect} from "next/navigation";
import paths from "@/path";

export async function search(formData: FormData){
    const searchTerm = formData.get('term');
    
    if(typeof searchTerm === "string" && searchTerm.length > 0){
        redirect(`/search?term=${searchTerm}`);
    }

    redirect(paths.home());
}
