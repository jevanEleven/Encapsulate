"use client";

import React from "react";
import getSupabaseClient from "@/db/supabase-client";
import { useMutation } from "react-query";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
    const params = useSearchParams();
    const email = params.get("email");
    const resend = params.get("resend");

    const mutation = useMutation(
        async (variables: { resend: boolean; email: string | null }) => {
            if (variables.resend && variables.email) {
                const client = getSupabaseClient();
                await client.auth.resend({
                    type: "signup",
                    email: variables.email,
                });
            }
        },
        { retry: false }
    );

    React.useEffect(() => {
        mutation.mutate({ resend: resend === "true", email });
    }, [resend, email, mutation]);

    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold">Check your Inbox</h1>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg">
                    We sent an email to&nbsp;
                    <span className="text-blue-500">{email}</span>, with a
                    verification link.
                </h2>
                <h2 className="text-lg">
                    Please open it to verify your account.
                </h2>
            </div>
        </div>
    );
}
