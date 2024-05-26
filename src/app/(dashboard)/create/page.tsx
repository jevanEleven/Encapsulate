"use client";

import dynamic from "next/dynamic";

import { useSession } from "@/hooks/use-session";
import { useState, useEffect } from "react";
import { LoadingDots } from "@/utilities/animations";


const CreateCapsuleForm = dynamic(
    () => import("@/components/forms/capsule/create-capsule-form"),
    {
        ssr: false,
    }
);

const RedirectTo = () => {
    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            window.location.href = "/signin?callback=/create"
        }, 10000);

        return () => {
            clearTimeout(redirectTimeout);
        }
    }, [])

    return (    
        <div className="">


        </div>
    )
}

export default function Create() {
    const { session, isLoading } = useSession();
    return (
        <div>
            {session && <CreateCapsuleForm />}
            {!session &&  
                            <div className="min-h-screen flex flex-col items-center bg-gray-100">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-10">Please Sign In To Make a Capsule!</h1>
                                <h2 className="text-2xl">Redirecting to Sign-in page in 10 seconds<LoadingDots/></h2>
                                <RedirectTo />
                            </div> 
            }
        </div>
    );
}
