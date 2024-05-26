"use client";

import React from "react";
import { useQueries, useQuery } from "react-query";
import { useSession } from "@/hooks/use-session";
import { useState, useEffect } from "react";
import API from "@/api/actions";

//component imports
import { CapsuleRow, CapsuleCard } from "@/components/capsule-thumbnails";
import UserCard from "@/components/user-card";
import GenericDropDown from "@/components/ui/drop-down-generic";

//function imports
import {
    CapsuleData,
    convertDate,
    isEmpty,
    isUnlocked,
    sortObjectByField,
    filterCapsulesByLockStatus,
} from "@/utilities/utilities";

interface Refs {
    title: string;
    "creation date": string;
    "unlock date": string;
    none: string;
    locked: string;
    unlocked: string;
}


const references: {[key: string]: string} = {
    title: "title",
    "creation date": "createdAt",
    "unlock date": "unlockDate",
    "locked": "locked",
    "unlocked": "unlocked"
}


interface Context {
    params: {
        userId: string;
    };
}

//import {dummyCapsules} from "./developerCapsules"

export default function User(context: Context) {
    const { session, isLoading: isSessionLoading } = useSession();

    const { data, error, isLoading } = useQuery(
        ["userProfile", session?.user.id],
        async () => {
            const api = new API(session);
            return api.fetchUserProfile({ id: context.params.userId });
        },
        {
            enabled: !!session && !isSessionLoading,
            onError: (error) => {
                console.error(error);
            },
        }
    );

    // Explicitly specify the type of display
    const [displayCapsules, setDisplay] = useState<CapsuleData[]>([])

    useEffect(() => {
        if (data && data.capsules) {
            setDisplay(data.capsules);
        }
    }, [data]);


    const likesQueries = useQueries(
        data?.capsules.map((capsule) => ({
            queryKey: ["capsuleLikes", capsule.id],
            queryFn: async () => {
                const api = new API(session);
                if (capsule.id && capsule.isPublic) {
                    return await api.fetchCapsuleLikes({ id: capsule.id });
                }
                return { likes: 0, isLiked: false };
            },
            enabled: !!data && !!data?.capsules,
        })) || []
    );

    const commentsQueries = useQueries(
        data?.capsules?.map((capsule) => ({
            queryKey: ["capsuleComments", capsule.id],
            queryFn: async () => {
                const api = new API(session);
                if (capsule.id && capsule.isPublic) {
                    return await api.fetchComments({ id: capsule.id });
                }
                return { comments: [] };
            },
            enabled: !!data && !!data?.capsules,
        })) || []
    );

    return (
        <div className="bg-gray-100">
            <div className="flex flex-col min-h-screen">
                {session ? (
                    <>
                        <UserCard
                            username={data?.profile.name || ""}
                            joined={session.user.created_at}
                            lastSeen={session.user.last_sign_in_at}
                            trophies={data?.profile.trophies || 0}
                        />
                        <div className="pt-5 pl-3 pr-3">
                            {data?.capsules &&
                            <div className="flex flex-col items-center md:flex-row md:justify-between pl-4 mt-2 mb-8">
                                <h1 className="text-xl font-bold md:mb-0 mb-4 ml-0 md:ml-4 mr-4">
                                    {data?.profile?.name}&apos;
                                    {data?.profile?.name.endsWith("s")
                                        ? ""
                                        : "s"}{" "}
                                    Capsules:
                                </h1> <div className="flex justify-center">
                                    <div className="mr-6 flex flex-col md:flex-row">
                                        <span className="font-semibold  md:mr-3">Sort Capsules By:</span>
                                        <select
                                            className="border border-gray-300 focus:ring-blue-500"
                                            onChange={(event) => {
                                                if(event.target.value === ""){
                                                    setDisplay(data.capsules)
                                                }
                                                else if(data.capsules){
                                                    let hello = sortObjectByField(data.capsules, event.target.value as keyof CapsuleData)
                                                    setDisplay(hello)
                                                }
                                            }}>
                                            <option value=""></option>
                                            <option value="title">Title</option>
                                            <option value="createdAt">Creation Date</option>
                                            <option value="unlockDate">Unlock Date</option>
                                        </select>
                                    </div>
                                    <div className="mr-4 sm:mr-0 flex flex-col md:flex-row">
                                        <span className="font-semibold md:mr-3">Filter Capsules By:</span>
                                        <select
                                            className="border border-gray-300 focus:ring-blue-500"
                                            onChange={(event) => {
                                                if(event.target.value === ""){
                                                    setDisplay(data.capsules)
                                                }
                                                else{
                                                    if(event.target.value !== "locked" && event.target.value !== "unlocked" )
                                                        return
                                                    let hello = filterCapsulesByLockStatus(data.capsules, event.target.value)
                                                    setDisplay(hello)
                                                }
                                            }}
                                        >
                                            <option></option>
                                            <option value="locked">Locked Status</option>
                                            <option value="unlocked">Unlocked Status</option>
                                        </select>
                                    </div>
                                </div>
                            </div>}
                            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2 mb-8 ml-6 mr-6 place-items-center justify-center">
                                {displayCapsules.map((capsule, ind) => {
                                    if(Object.keys(capsule).length === 0){
                                        return;
                                    }
                                    const likes = likesQueries[ind].data;
                                    const comments = commentsQueries[ind].data;

                                    return (
                                        <a href={`/view/${capsule.id}`} key={ind}>
                                            <CapsuleCard
                                                title={capsule.title}
                                                createdAt={capsule.createdAt}
                                                unlockDate={capsule.unlockDate}
                                                likeNumber={
                                                    likes ? Number(likes.likes) : 0
                                                }
                                                commentNumber={
                                                    comments
                                                        ? comments.comments.length
                                                        : 0
                                                }
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-screen">
                        <p className="text-xl">
                            {session === undefined
                                ? "Loading..."
                                : "No user session"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
