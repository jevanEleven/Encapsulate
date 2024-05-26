import Navbar from "@/components/navbar";
import React from "react";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
