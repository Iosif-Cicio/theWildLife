import Link from "next/link";

export default function Page() {
    return (
        <main className="mt-24">
            <div className="absolute inset-0 overflow-hidden z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/bg.jpg"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                >
                    <source src="/bg-video.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="relative z-10 text-center">
                <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
                    Welcome to Paradise
                </h1>
                <Link
                    href="/cabins"
                    className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
                >
                    Explore luxury cabins
                </Link>
            </div>
        </main>
    );
}