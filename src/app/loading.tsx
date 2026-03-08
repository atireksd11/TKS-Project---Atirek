import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
            <div className="animate-pulse">
                <Image
                    src="/logos/2.png"
                    alt="VØYD"
                    width={48}
                    height={48}
                    priority
                />
            </div>
        </div>
    );
}
