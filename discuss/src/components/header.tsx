import Link from "next/link";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem,} from "@nextui-org/react";
import UserProfile from "@/components/userProfile";
import SearchInput from "@/components/search-input";

export default function Header() {
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href="/" className="font-bold">Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <SearchInput/>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <UserProfile/>
            </NavbarContent>
        </Navbar>
    );
}
