import {auth} from "@/auth";
import {Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import * as actions from "@/actions";

export default async function UserProfile() {

    const session = await auth();

    const authenticatedUser: React.ReactNode =
        <Popover placement="bottom">
            <PopoverTrigger>
                <Avatar src={session?.user?.image || ''}/>
            </PopoverTrigger>
            <PopoverContent>
                <form action={actions.signOut} className="p-4">
                    <Button type="submit">Sign Out</Button>
                </form>
            </PopoverContent>
        </Popover>

    const anonymousUser: React.ReactNode =
        <form action={actions.signIn}>
            <NavbarItem>
                <Button type="submit" color="secondary" variant="bordered">Sign in</Button>
            </NavbarItem>
        </form>;

    return (
        session?.user
            ? authenticatedUser
            : anonymousUser
    );
}
