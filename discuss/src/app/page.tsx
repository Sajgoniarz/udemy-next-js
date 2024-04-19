import {Button} from "@nextui-org/react";
import * as actions from "@/actions";
import {auth} from "@/auth"
import Profile from "@/components/profile";

export default async function Home() {
    const session = await auth();

    return (
        <>
            <form action={actions.signIn}>
                <Button type="submit">Sign in</Button>
            </form>
            <form action={actions.signOut}>
                <Button type="submit">Sign out</Button>
            </form>
            <div>
                {session?.user
                    ? JSON.stringify(session.user)
                    : "signed off"
                }
            </div>

            <Profile />
        </>
    );
}
