"use client";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
} from "@nextui-org/react";
import API from "@/api/actions";
import React from "react";
import { useQueries, useQuery } from "react-query";
import logo from "../../../public/brand/logo-wide-no-bg.svg";
import { useSession } from "@/hooks/use-session";
import { Icons } from "@/components/icons";
import CapsuleLikes from "@/components/capsule-likes";
import { convertDate } from "@/utilities/utilities";

export default function FeedPage() {
    const { session, isLoading: isSessionLoading } = useSession();

    const {
        data: capsules,
        error: capsulesError,
        isLoading: capsulesLoading,
    } = useQuery(
        ["feed", session?.user.id],
        async () => {
            const api = new API(session);
            return await api.fetchFeed();
        },
        {
            enabled: !!session && !isSessionLoading,
        }
    );

    return (
        <div>
            <header className="pt-16 pl-64 font-bold content-center text-left text-black text-6xl">
                My Feed 💊
            </header>
            <title> My Feed </title>
            <div className="flex flex-col items-center justify-center gap-4">
                {capsules &&
                    capsules.length > 0 &&
                    capsules.map((capsule) => {
                        return (
                            <div
                                key={capsule.id}
                                className="flex items-center justify-center px-4 py-5 w-full max-w-3xl"
                            >
                                <Card className="w-full bg-slate-100 rounded-lg p-2">
                                    <a href={`/view/${capsule.id}`}>
                                        <CardHeader className="flex gap-3">
                                            <Image
                                                alt="nextui logo"
                                                height={40}
                                                radius="md"
                                                src="/brand/image.png"
                                                width={40}
                                                className="ml-2"
                                            />
                                            <div className="flex flex-col">
                                                <p className="ml-2 font-mono text-2xl">
                                                    {capsule.title}
                                                </p>
                                                <p className="ml-2 text-small text-default-500">
                                                    {convertDate(
                                                        capsule.unlockDate
                                                    )}
                                                </p>
                                            </div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody>
                                            <p className="ml-2">
                                                {capsule.description}
                                            </p>
                                        </CardBody>
                                    </a>
                                    <Divider />
                                    <CardFooter>
                                        <CapsuleLikes capsuleId={capsule.id} />
                                    </CardFooter>
                                </Card>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
