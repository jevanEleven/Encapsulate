"use client";

import Link from "next/link";
import React from "react";

export default function VerifyEmailErrorPage() {
    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold">Uh oh!</h1>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg">
                    Looks like there was an error verifying your email.
                </h2>
                <h2 className="text-lg">
                    Please&nbsp;
                    <Link className="text-blue-500 text-lg" href="signin">
                        sign in
                    </Link>
                    &nbsp;so we can try to verify your email again.
                </h2>
            </div>
        </div>
    );
}
