"use client";

import React, { HTMLAttributes, useState } from "react";

import { Squash as Hamburger } from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { SessionData } from "@/components/session-data";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import { useSession } from "@/hooks/use-session";
import API from "@/api/actions";

interface NavigationLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string;
    pathname: string;
    activeOnSubpath?: boolean;
}

const NavigationLink = React.forwardRef<HTMLAnchorElement, NavigationLinkProps>(
    (
        {
            className,
            pathname,
            href,
            activeOnSubpath = false,
            children,
            ...props
        },
        ref
    ) => {
        const isActive = (): boolean => {
            if (activeOnSubpath) {
                return pathname.startsWith(href);
            }
            return pathname === href;
        };

        return (
            <Link
                className={cn(
                    "text-center text-lg font-bold rounded-md p-1",
                    "transition duration-500 ease-in-out",
                    isActive()
                        ? "text-secondary-500 bg-primary-500"
                        : "text-primary-500 bg-secondary-500 hover:bg-primary-500 hover:text-secondary-500",
                    className
                )}
                href={href}
                ref={ref}
                {...props}
            >
                {children}
            </Link>
        );
    }
);

NavigationLink.displayName = "NavigationLink";

const Navbar = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const pathname = usePathname();
        const [isOpen, setOpen] = useState(false); // State to manage Hamburger menu toggle

        const { session, isLoading: isSessionLoading } = useSession();

        const { data, error, isLoading } = useQuery(
            ["userProfile", session?.user.id],
            async () => {
                const api = new API(session);
                return api.fetchUserProfile({ id: session?.user.id || "" });
            },
            {
                enabled: !!session && !isSessionLoading,
            }
        );

        return (
            <div className="sticky top-0 z-40 w-full">
                <nav
                    className="z-50 w-full flex items-center justify-between bg-secondary-500 shadow-md px-4 md:px-6 py-2 transform duration-300 ease-in-out"
                    {...props}
                    ref={ref}
                >
                    <Link href="/feed">
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

                    <div className="hidden md:flex flex-1 justify-center items-center space-x-4">
                        <NavigationLink
                            href="/feed"
                            pathname={pathname}
                            activeOnSubpath
                        >
                            Feed
                        </NavigationLink>
                        <NavigationLink
                            href="/create"
                            pathname={pathname}
                            activeOnSubpath
                        >
                            Create
                        </NavigationLink>
                        <NavigationLink
                            href="/challenges"
                            pathname={pathname}
                            activeOnSubpath
                        >
                            Challenges
                        </NavigationLink>
                        {data?.profile.isAdmin && (
                            <NavigationLink
                                href="/admin"
                                pathname={pathname}
                                activeOnSubpath
                            >
                                Admin
                            </NavigationLink>
                        )}
                    </div>

                    <div className="hidden md:flex items-center">
                        <SessionData />
                    </div>

                    <div className="md:hidden">
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                </nav>

                <div
                    className="md:hidden z-45 shadow-xl overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                        height: isOpen
                            ? `${
                                  document.getElementById("menu-content")
                                      ?.scrollHeight
                              }px`
                            : "0",
                    }}
                >
                    <div
                        className="p-4 bg-white items-center"
                        id="menu-content"
                    >
                        <div className="flex flex-col space-y-4">
                            <NavigationLink
                                href="/feed"
                                pathname={pathname}
                                activeOnSubpath
                            >
                                Feed
                            </NavigationLink>
                            <NavigationLink
                                href="/create"
                                pathname={pathname}
                                activeOnSubpath
                            >
                                Create
                            </NavigationLink>
                            <NavigationLink
                                href="/challenges"
                                pathname={pathname}
                                activeOnSubpath
                            >
                                Challenges
                            </NavigationLink>

                            <div className="border-t-2 border-gray w-full"></div>

                            <div className="p-2">
                                <SessionData />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

Navbar.displayName = "Navbar";

export default Navbar;
