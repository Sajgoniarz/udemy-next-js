import Link from "next/link";

export default function Header() {
    return (
        <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/performance">Performance</Link></li>
            <li><Link href="/reliability">Reliability</Link></li>
            <li><Link href="/scale">Scale</Link></li>
        </ul>
    )
}