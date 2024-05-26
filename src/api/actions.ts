import axios, { AxiosInstance } from "axios";
import {
    capsuleIdParamsSchema,
    capsulesPOST,
    challengeIdParamsSchema,
    challengesPOST,
    commentsPOST,
    mediaPOST,
    usersIdParamsSchema,
} from "@/lib/validations/server-shared";

import { Session } from "@supabase/supabase-js";
import { z } from "zod";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
if (!NEXT_PUBLIC_URL)
    throw new Error("`NEXT_PUBLIC_URL` environment variable undefined.");

class API {
    private session: Session | null;
    private axios: AxiosInstance;

    constructor(session: Session | null) {
        this.session = session;
        this.axios = axios.create({
            baseURL: NEXT_PUBLIC_URL,
            headers: {
                Authorization: `Bearer ${this.session?.access_token}`,
            },
        });
    }

    async createCapsule(
        data: z.infer<typeof capsulesPOST>,
        challengeId?: string
    ): Promise<string> {
        const res = await this.axios.post("/api/capsules", data);
        const resData = res.data as { capsuleId: string };

        if (challengeId) {
            await this.axios.post(`/api/challenges/${challengeId}/capsules`, {
                id: resData.capsuleId,
            });
        }

        return resData.capsuleId;
    }

    async attachMedia(
        data: z.infer<typeof mediaPOST>
    ): Promise<{ mediaId: string; presignedUploadURL: string }> {
        const res = await this.axios.post("/api/media", data);
        const resData = res.data as {
            mediaId: string;
            presignedUploadURL: string;
        };

        return resData;
    }

    async fetchCapsule(data: z.infer<typeof capsuleIdParamsSchema>) {
        const res = await this.axios.get(`/api/capsules/${data.id}`);
        const capsule = res.data as {
            images: string[];
            userId: string;
            title: string;
            description: string;
            unlockDate: string;
            isPublic: boolean;
            id: string;
            createdAt: Date;
        };

        return capsule;
    }

    async fetchCapsuleLikes(data: z.infer<typeof capsuleIdParamsSchema>) {
        const res = await this.axios.get(`/api/capsules/${data.id}/likes`);
        const capsuleLikes = res.data as {
            likes: Number;
            isLiked: boolean;
        };

        return capsuleLikes;
    }

    async fetchFeed() {
        const res = await this.axios.get("/api/capsules");
        const capsules = res.data as {
            userId: string;
            title: string;
            description: string;
            unlockDate: string;
            isPublic: boolean;
            id: string;
            createdAt: Date;
        }[];

        console.log(capsules);

        return capsules;
    }

    async fetchUserProfile(data: z.infer<typeof usersIdParamsSchema>) {
        const res = await this.axios.get(`/api/users/${data.id}`);
        const user = res.data as {
            profile: {
                id: string;
                name: string;
                trophies: number;
                isAdmin: boolean;
            };
            capsules: {
                userId: string;
                title: string;
                description: string;
                unlockDate: string;
                isPublic: boolean;
                id: string;
                createdAt: Date;
            }[];
        };

        return user;
    }

    async like(data: z.infer<typeof capsuleIdParamsSchema>) {
        const res = await this.axios.post(`/api/capsules/${data.id}/likes`);
        const isLiked = res.data as boolean;

        return isLiked;
    }

    async comment(data: z.infer<typeof commentsPOST>) {
        const res = await this.axios.post(
            `/api/capsules/${data.capsuleId}/comments`,
            data
        );
        const commentId = res.data as string;

        return commentId;
    }

    async fetchComments(data: z.infer<typeof capsuleIdParamsSchema>) {
        const res = await this.axios.get(`/api/capsules/${data.id}/comments`);
        const comments = res.data as {
            comments: {
                id: string;
                userId: string;
                content: string | null;
                createdAt: Date | null;
            }[];
        };

        return comments;
    }

    async fetchChallenges() {
        const res = await this.axios.get("/api/challenges");
        const challenges = res.data as {
            id: string;
            title: string;
            description: string;
            startDate: Date;
            endDate: Date;
        }[];

        return challenges;
    }

    async createChallenge(
        data: z.infer<typeof challengesPOST>
    ): Promise<string> {
        const res = await this.axios.post("/api/challenges", data);
        const resData = res.data as { challengeId: string };

        return resData.challengeId;
    }

    async fetchChallenge(data: z.infer<typeof challengeIdParamsSchema>) {
        const res = await this.axios.get(`/api/challenges/${data.id}`);
        const challenge = res.data as {
            id: string;
            title: string;
            description: string;
            startDate: Date;
            endDate: Date;
            capsules: {
                userId: string;
                title: string;
                description: string;
                unlockDate: string;
                isPublic: boolean;
                id: string;
                createdAt: Date;
                likeCount: number;
            }[];
        };

        return challenge;
    }

    async chooseWinner(data: z.infer<typeof challengeIdParamsSchema>) {
        const challenge = await this.fetchChallenge(data);

        // Create an object to store the total likes for each userId
        const likesCountMap: { [userId: string]: number } = {};

        // Iterate over each capsule in the challenge
        for (const capsule of challenge.capsules) {
            // Fetch the likes for the current capsule
            const capsuleLikes = await this.fetchCapsuleLikes({
                id: capsule.id,
            });

            // Update the total likes count for the userId
            likesCountMap[capsule.userId] =
                (likesCountMap[capsule.userId] || 0) +
                Number(capsuleLikes.likes);
        }

        // Find the userId with the maximum likes count
        let winnerUserId = "";
        let maxLikes = 0;
        for (const userId in likesCountMap) {
            if (likesCountMap[userId] > maxLikes) {
                winnerUserId = userId;
                maxLikes = likesCountMap[userId];
            }
        }

        return winnerUserId;
    }
}

export default API;
