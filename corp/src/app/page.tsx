import Image from "next/image";
import Hero from "@/components/hero";
import homeImg from "public/home.jpg";

export default function Home() {
    return (
        <Hero imgData={homeImg} imgAlt="car factory" title="Professional cloud hosting"/>
    );
}