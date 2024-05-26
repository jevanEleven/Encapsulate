"use client";

import React, { HTMLAttributes, useState } from "react";
import { useMutation, useQuery } from "react-query";
import API from "@/api/actions";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useSession } from "@/hooks/use-session";

interface CapsuleLikesProps extends HTMLAttributes<HTMLAnchorElement> {
    capsuleId: string;
}

const CapsuleLikes = React.forwardRef<HTMLAnchorElement, CapsuleLikesProps>(
    ({ className, capsuleId, children, ...props }, ref) => {
        const { session, isLoading: isSessionLoading } = useSession();
        const [localLikes, setLocalLikes] = useState(0);
        const [localIsLiked, setLocalIsLiked] = useState(false);

        const {
            data,
            error,
            isLoading: isLikesLoading,
            refetch,
        } = useQuery({
            queryKey: ["capsuleLikes", capsuleId],
            queryFn: async () => {
                const api = new API(session);
                const response = await api.fetchCapsuleLikes({ id: capsuleId });
                setLocalLikes(Number(response.likes));
                setLocalIsLiked(response.isLiked);
                return response;
            },
            enabled: !!session && !isSessionLoading,
        });

        const mutation = useMutation(
            async () => {
                if (!session) throw new Error("`session` is null.");
                setLocalIsLiked(!localIsLiked);
                setLocalLikes(localIsLiked ? localLikes - 1 : localLikes + 1);
                const api = new API(session);
                const isLiked = await api.like({ id: capsuleId });
                return isLiked;
            },
            { retry: false }
        );

        return (
            <div>
                <Button
                    className="flex flex-row items-center"
                    onClick={() => mutation.mutate()}
                >
                    {isLikesLoading ? (
                        <div></div>
                    ) : (
                        <div className="flex items-center">
                            <span>{localLikes.toString()}</span>
                            {localIsLiked ? (
                                <Icons.heartFull className="ml-2 size-3" />
                            ) : (
                                <Icons.heart className="ml-2 size-3" />
                            )}
                        </div>
                    )}
                </Button>
            </div>
        );
    }
);

CapsuleLikes.displayName = "CapsuleLikes";

export default CapsuleLikes;
