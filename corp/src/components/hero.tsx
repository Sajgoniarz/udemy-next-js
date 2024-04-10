import Image, {StaticImageData} from "next/image";
import homeImg from "public/home.jpg";

interface HeroProps {
    imgData: StaticImageData,
    imgAlt: string,
    title: string,
}

export default function Hero(props: HeroProps) {
    return (
        <div className="relative h-screen">
            <div className="absolute -z-10 inset-0">
                <Image
                    src={props.imgData}
                    alt={props.imgAlt}
                    fill
                    style={{objectFit: 'cover'}}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-600"></div>
            </div>
            <div className="pt-48 flex justify-center items-center">
                <h1 className="text-white text-6xl">
                    {props.title}
                </h1>
            </div>
        </div>
    )
}