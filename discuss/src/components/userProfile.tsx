﻿'use client';

import {Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import * as actions from "@/actions";
import React from "react";
import {useSession} from "next-auth/react";

export default function UserProfile() {

    const session = useSession();

    const authenticatedUserFragment: React.ReactNode =
        <Popover placement="bottom">
            <PopoverTrigger>
                <Avatar src={session.data?.user?.image || ''}/>
            </PopoverTrigger>
            <PopoverContent>
                <form action={actions.signOut} className="p-4">
                    <Button type="submit">Sign Out</Button>
                </form>
            </PopoverContent>
        </Popover>

    const anonymousUserFragment: React.ReactNode =
        <form action={actions.signIn}>
            <NavbarItem>
                <Button type="submit" color="secondary" variant="bordered">Sign in</Button>
            </NavbarItem>
        </form>;

    switch (session.status) {
        case "loading":
            return null;
        case "unauthenticated":
            return anonymousUserFragment;
        case "authenticated":
            return anonymousUserFragment;
    }
}
