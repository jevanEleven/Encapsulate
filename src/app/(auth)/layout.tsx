import { Icons } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-start">
            <header className="absolute w-full h-fit p-4">
                <Link href="/">
                    <div className="flex items-center">
                        <Image
                            src="/brand/logo-wide-no-bg.svg"
                            alt="Encapsulate Logo"
                            height={60}
                            width={150}
                            priority
                        />
                    </div>
                </Link>
            </header>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <Suspense
                    fallback={
                        <div>
                            <Icons.spinner className="mr-2 size-16 animate-spin" />
                        </div>
                    }
                >
                    {children}
                </Suspense>
            </div>
        </main>
    );
}
