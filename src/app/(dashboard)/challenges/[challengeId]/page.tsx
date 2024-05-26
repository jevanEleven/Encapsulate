"use client";

import API from "@/api/actions";
import { useSession } from "@/hooks/use-session";
import { useQueries, useQuery } from "react-query";
import React, { useState } from "react";
import CreateCapsuleForm from "@/components/forms/capsule/create-capsule-form";
import CreateChallengeCapsuleForm from "@/components/forms/capsule/create-challenge-capsule-form";
import { Icons } from "@/components/icons";
import CapsuleLikes from "@/components/capsule-likes";

interface Context {
    params: {
        challengeId: string;
    };
}

function Challenge(context: Context) {
    const { session, isLoading: isSessionLoading } = useSession();
    const challengeId = context.params.challengeId;

    const [isCreating, setIsCreating] = useState(false);

    const {
        data: challenge,
        error: challengeError,
        isLoading: challengeLoading,
        refetch: refetchChallenge,
    } = useQuery(
        ["challenge", challengeId],
        async () => {
            const api = new API(session);
            return await api.fetchChallenge({ id: challengeId });
        },
        {
            enabled: !!session && !isSessionLoading,
        }
    );

    return (
        <div className="flex flex-col min-h-screen mb-8">
            {challenge && (
                <div>
                    <h2 className="py-8 font-bold text-center text-black text-6xl">
                        {challenge.title}
                    </h2>

                    <p className="text-2xl text-center text-gray-600 mb-8">
                        The topic is: {challenge.description}
                    </p>

                    <div className="flex justify-center mt-4">
                        <div className="flex items-center border rounded">
                            <button
                                className={`px-4 py-2 ${
                                    !isCreating ? "font-bold" : "text-gray-500"
                                }`}
                                onClick={() => setIsCreating(false)}
                            >
                                View
                            </button>
                            <span className="mx-2">|</span>
                            <button
                                className={`px-4 py-2 ${
                                    isCreating ? "font-bold" : "text-gray-500"
                                }`}
                                onClick={() => setIsCreating(true)}
                            >
                                Create
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 mt-8">
                        {isCreating ? (
                            <CreateChallengeCapsuleForm
                                challengeId={challengeId}
                                onCreateCapsule={refetchChallenge}
                            />
                        ) : (
                            <div>
                                <p className="text-lg text-gray-600">
                                    User submissions:
                                </p>
                                <div className="space-y-6">
                                    {challenge.capsules &&
                                        challenge.capsules
                                            .sort(
                                                (a, b) =>
                                                    b.likeCount - a.likeCount
                                            )
                                            .map((capsule) => {
                                                return (
                                                    <div
                                                        key={capsule.id}
                                                        className="px-6 py-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out w-full max-w-3xl"
                                                    >
                                                        <div className="flex flex-col h-full">
                                                            <a
                                                                href={`/view/${capsule.id}`}
                                                            >
                                                                <h2 className="text-2xl font-bold mb-2">
                                                                    {
                                                                        capsule.title
                                                                    }
                                                                </h2>
                                                                <p className="text-gray-600 flex-grow">
                                                                    {
                                                                        capsule.description
                                                                    }
                                                                </p>
                                                            </a>
                                                        </div>
                                                        <div className="flex items-center mt-4">
                                                            <CapsuleLikes
                                                                capsuleId={
                                                                    capsule.id
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Challenge;
