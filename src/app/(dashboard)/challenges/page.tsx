"use client";

import API from "@/api/actions";
import { useSession } from "@/hooks/use-session";
import { useQuery } from "react-query";
import React from "react";

function Challenges() {
    const { session, isLoading: isSessionLoading } = useSession();

    const {
        data: challenges,
        error: challengesError,
        isLoading: challengesLoading,
    } = useQuery(
        ["challenges", session?.user.id],
        async () => {
            const api = new API(session);
            return await api.fetchChallenges();
        },
        {
            enabled: !!session && !isSessionLoading,
        }
    );

    return (
        <div className="flex flex-col min-h-screen">
            <header className="pt-16 pl-64 font-bold text-left text-black text-6xl">
                Challenges
            </header>
            <title>Challenges</title>
            <div className="flex flex-col items-center justify-center gap-4 mt-8">
                {challenges &&
                    challenges.map((challenge) => (
                        <a
                            key={challenge.id}
                            href={`/challenges/${challenge.id}`}
                            className="px-6 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-bold mb-2">
                                    {challenge.title}
                                </h2>
                                <p className="text-gray-600">
                                    {challenge.description}
                                </p>
                            </div>
                        </a>
                    ))}
            </div>
        </div>
    );
}

export default Challenges;
