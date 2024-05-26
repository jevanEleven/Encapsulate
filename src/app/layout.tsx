"use client";

import "./globals.css";

import { QueryClient, QueryClientProvider } from "react-query";

import { Inter } from "next/font/google";
import React from "react";
import { SessionProvider } from "@/hooks/use-session";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [client] = React.useState(new QueryClient());

    return (
        <html lang="en" className={inter.className}>
            <body>
                <QueryClientProvider client={client}>
                    <SessionProvider>{children}</SessionProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
