'use client';

import {useSession} from "next-auth/react";

export default function Profile() {
    const session = useSession();
    const phrase = !(session.data?.user)
        ? "NOT"
        : "";

    return (
        <div>From client: user is {phrase} signed in</div>
    );
}