import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
    return (
        <Link href="/" className="flex items-center gap-4 z-10">
            <Image
                src={logo}
                height={70}
                quality={100}
                width={70}
                alt="The Wild Life logo"
                style={{ width: 'auto', height: 'auto' }}
            />
            <span className="text-xl font-semibold text-primary-100">
        The Wild Life
      </span>
        </Link>
    );
}

export default Logo;
