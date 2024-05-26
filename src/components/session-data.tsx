import React, { HTMLAttributes, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Icons } from "@/components/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession } from "@/hooks/use-session";
import API from "@/api/actions";
import { useQuery } from "react-query";

const SessionData = React.forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const pathname = usePathname();
    const { session, isLoading, signOut } = useSession();

    const {
        data,
        error,
        isLoading: isUserLoading,
    } = useQuery(
        ["userProfile", session?.user.id],
        async () => {
            const api = new API(session);
            return api.fetchUserProfile({ id: session?.user.id || "" });
        },
        {
            enabled: !!session && !isLoading,
        }
    );

    const hasSession = !!session;

    if (!hasSession) {
        return (
            <div className={cn(className)} ref={ref} {...props}>
                <div className="flex flex-row items-center justify-center gap-2">
                    <Link
                        className="flex flex-row items-center justify-center gap-2"
                        href={`/signin?callback=${pathname}`}
                    >
                        <div className="flex flex-col">
                            <p className="text-lg font-bold text-center rounded-md py-1 px-1 text-primary-500 bg-secondary-500 hover:bg-primary-500 hover:text-secondary-500 transition duration-500 ease-in-out">
                                Sign In
                            </p>
                        </div>
                    </Link>
                    <div className="border-r-2 bouseSessionrder-primary-500 min-h-4 h-full" />
                    <Link
                        className="flex flex-row items-center justify-center gap-2"
                        href="/signup"
                    >
                        <div className="flex flex-col">
                            <p className="text-lg font-bold text-center rounded-md py-1 px-1 text-primary-500 bg-secondary-500 hover:bg-primary-500 hover:text-secondary-500 transition duration-500 ease-in-out">
                                Sign Up
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(className)} ref={ref} {...props}>
            <div className="flex flex-row items-center justify-center gap-2">
                <Link href={`/user/${session.user.id}`}>
                    <div className="flex flex-col w-fit h-fit items-start justify-start">
                        {isLoading && (
                            <Icons.spinner
                                className="mr-2 size-8 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        <p className="text-lg font-bold -mb-2">
                            {data?.profile.name || ""}
                        </p>
                        <p className="text-sm font-normal">
                            {session.user.email}
                        </p>
                    </div>
                </Link>
                <div className="border-r-2 border-primary-500 min-h-4 h-full" />
                <button
                    className="text-lg font-bold text-center rounded-md py-1 px-1 text-primary-500 bg-secondary-500 hover:bg-primary-500 hover:text-secondary-500 transition duration-500 ease-in-out"
                    onClick={() => {
                        signOut();
                    }}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
});
SessionData.displayName = "SessionData";

export { SessionData };
