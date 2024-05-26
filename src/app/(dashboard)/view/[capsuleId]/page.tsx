"use client";

import React, { useEffect } from "react";

import API from "@/api/actions";
import CapsuleComments from "@/components/capsule-comments";
import CapsuleLikes from "@/components/capsule-likes";
import { useQuery } from "react-query";
import { useSession } from "@/hooks/use-session";
import { convertDate } from "@/utilities/utilities";

interface Context {
    params: {
        capsuleId: string;
    };
}

// public: false | true -> false -> check userid matched

export default function User(context: Context) {
    const { session, isLoading: isSessionLoading } = useSession();

    const capsuleId = context.params.capsuleId;

    const { data, error, isLoading } = useQuery(
        ["viewContext", session?.user.id],
        async () => {
            const api = new API(session);
            return await api.fetchCapsule({ id: capsuleId });
        },
        {
            enabled: !!session && !isSessionLoading,
        }
    );

    return (
        <div className="flex justify-center mt-4">
            <div className="p-4 bg-white shadow rounded-lg max-w-4xl w-full">
                <h1 className="flex items-center justify-center text-3xl font-semibold">
                    {data?.title}
                </h1>

                {data?.unlockDate && new Date(data.unlockDate) < new Date() ? (
                    <div>
                        <p className="mt-2 text-gray-500">
                            Description: {data?.description}
                        </p>
                        {data && data.images.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">
                                    Your memory
                                </h3>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {data?.images.map((image, index) => (
                                        // Adjust these classes for responsive images
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Image ${index + 1}`}
                                            className="max-w-full h-auto rounded shadow"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <p className="mt-2 text-gray-500">
                            This memory was unlocked on{" "}
                            {convertDate(data?.unlockDate)}.
                        </p>
                        {data && data.isPublic && (
                            <div style={{ marginTop: 10 }}>
                                <CapsuleLikes capsuleId={capsuleId} />
                                <CapsuleComments capsuleId={capsuleId} />
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="mt-2 text-gray-500">
                        This memory is still locked. A reminder will be sent to
                        you on {convertDate(data?.unlockDate)}.
                    </p>
                )}
            </div>
        </div>
    );
}
