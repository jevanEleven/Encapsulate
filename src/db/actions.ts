import * as schema from "@/db/schema";

import { and, count, eq, lt, sql, exists, desc } from "drizzle-orm";

import { dbClient as db } from "./client";

async function createCapsule(capsule: typeof schema.capsules.$inferInsert) {
    const res = await db
        .insert(schema.capsules)
        .values(capsule)
        .returning({ capsuleId: schema.capsules.id })
        .execute();

    return res[0].capsuleId;
}

async function createMedia(media: typeof schema.mediaItems.$inferInsert) {
    const res = await db
        .insert(schema.mediaItems)
        .values(media)
        .returning({ mediaId: schema.mediaItems.id })
        .execute();

    return res[0].mediaId;
}

async function getCapsule(capsuleId: string) {
    const capsules = await db
        .select()
        .from(schema.capsules)
        .where(eq(schema.capsules.id, capsuleId));

    if (capsules[0] && new Date(capsules[0].unlockDate) > new Date()) {
        // Return an empty capsule if no capsule is found or the unlock date is in the future
        return {
            id: capsules[0].id,
            userId: capsules[0].userId,
            title: capsules[0].title,
            description: "",
            unlockDate: capsules[0].unlockDate,
            isPublic: capsules[0].isPublic,
            createdAt: capsules[0].createdAt,
            media: [],
        };
    }

    const media = await db
        .select({ s3Key: schema.mediaItems.s3Key })
        .from(schema.mediaItems)
        .where(eq(schema.mediaItems.capsuleId, capsuleId));

    return { ...capsules[0], media };
}

async function getUserCapsules(userId: string) {
    const currentDate = new Date();

    const capsules = await db
        .select()
        .from(schema.capsules)
        .where(eq(schema.capsules.userId, userId));

    return capsules.map((capsule) => ({
        ...capsule,
        description:
            new Date(capsule.unlockDate) > currentDate
                ? ""
                : capsule.description,
    }));
}

async function getPublicUserCapsules(_userId_: string) {
    const currentDate = new Date();

    const capsules = await db
        .select()
        .from(schema.capsules)
        .where(
            and(
                eq(schema.capsules.userId, _userId_),
                eq(schema.capsules.isPublic, true)
            )
        );

    return capsules.map((capsule) =>
        new Date(capsule.unlockDate) > currentDate
            ? { ...capsule, description: "" }
            : capsule
    );
}

async function getPublicCapsules() {
    const currentDate = new Date();

    const capsules = await db
        .select()
        .from(schema.capsules)
        .where(eq(schema.capsules.isPublic, true))
        .orderBy(desc(schema.capsules.createdAt));

    return capsules.map((capsule) =>
        new Date(capsule.unlockDate) > currentDate
            ? { ...capsule, description: "" }
            : capsule
    );
}

async function getUserProfile(userId: string) {
    const profile = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, userId));

    return profile[0];
}

async function createComment(comment: typeof schema.comments.$inferInsert) {
    const res = await db
        .insert(schema.comments)
        .values(comment)
        .returning({ commentId: schema.comments.id })
        .execute();

    return res[0].commentId;
}

async function fetchComments(capsuleId: string) {
    const res = await db
        .select({
            id: schema.comments.id,
            userId: schema.comments.userId,
            content: schema.comments.content,
            createdAt: schema.comments.createdAt,
        })
        .from(schema.comments)
        .where(eq(schema.comments.capsuleId, capsuleId))
        .execute();

    return res;
}

async function createLike(like: typeof schema.likes.$inferInsert) {
    const res = await db
        .insert(schema.likes)
        .values(like)
        .returning({ likeId: schema.likes.id })
        .execute();

    return res[0].likeId;
}

async function deleteLike(userId: string) {
    await db
        .delete(schema.likes)
        .where(eq(schema.likes.userId, userId))
        .execute();
}

async function fetchLikes(capsuleId: string) {
    const res = await db
        .select({
            id: schema.likes.id,
            userId: schema.likes.userId,
            createdAt: schema.likes.createdAt,
        })
        .from(schema.likes)
        .where(eq(schema.likes.capsuleId, capsuleId));

    return res;
}

async function createChallenge(
    challenge: typeof schema.challenges.$inferInsert
) {
    const res = await db
        .insert(schema.challenges)
        .values(challenge)
        .returning({ challengeId: schema.challenges.id })
        .execute();

    return res[0].challengeId;
}

async function addChallengeCapsule(challengeId: string, capsuleId: string) {
    await db
        .insert(schema.challengeCapsules)
        .values({ challengeId, capsuleId })
        .execute();
}

async function getChallenges() {
    const challenges = await db
        .select()
        .from(schema.challenges)
        .orderBy(schema.challenges.endDate)
        .where(eq(schema.challenges.hasFinished, false));

    return challenges;
}

async function getFinishedChallenges() {
    const challenges = await db
        .select()
        .from(schema.challenges)
        .where(
            and(
                lt(schema.challenges.endDate, sql`CURRENT_DATE`),
                eq(schema.challenges.hasFinished, false)
            )
        )
        .orderBy(schema.challenges.endDate);

    challenges.forEach(async (challenge) => {
        await db.transaction(async (tx) => {
            await tx
                .update(schema.challenges)
                .set({ hasFinished: true })
                .where(eq(schema.challenges.id, challenge.id))
                .execute();

            const capsules = await tx
                .select({
                    id: schema.capsules.id,
                    userId: schema.capsules.userId,
                    title: schema.capsules.title,
                    description: schema.capsules.description,
                    unlockDate: schema.capsules.unlockDate,
                    isPublic: schema.capsules.isPublic,
                    createdAt: schema.capsules.createdAt,
                })
                .from(schema.challengeCapsules)
                .innerJoin(
                    schema.capsules,
                    eq(schema.challengeCapsules.capsuleId, schema.capsules.id)
                )
                .where(eq(schema.challengeCapsules.challengeId, challenge.id));

            let userWithMostLikes: string = "";
            let mostLikes: number = -1;

            for (const capsule of capsules) {
                const likes = await tx
                    .select({ value: count(schema.likes.id) })
                    .from(schema.likes)
                    .where(eq(schema.likes.capsuleId, capsule.id))
                    .execute();

                if (likes[0].value > mostLikes) {
                    mostLikes = likes[0].value;
                    userWithMostLikes = capsule.userId;
                }
            }

            console.log(`User with most likes: ${userWithMostLikes}`);

            await tx
                .update(schema.users)
                .set({ trophies: sql`users.trophies + 1` })
                .where(eq(schema.users.id, userWithMostLikes));
        });
    });

    return challenges;
}

async function getChallenge(_challengeId_: string) {
    const challenges = await db
        .select()
        .from(schema.challenges)
        .where(eq(schema.challenges.id, _challengeId_));

    const capsules = await db
        .select({
            id: schema.capsules.id,
            userId: schema.capsules.userId,
            title: schema.capsules.title,
            description: schema.capsules.description,
            unlockDate: schema.capsules.unlockDate,
            isPublic: schema.capsules.isPublic,
            createdAt: schema.capsules.createdAt,
            likeCount: sql<number>`(
        SELECT COUNT(*)
        FROM ${schema.likes}
        WHERE ${schema.likes.capsuleId} = ${schema.capsules.id}
      )`.as("like_count"),
        })
        .from(schema.challengeCapsules)
        .innerJoin(
            schema.capsules,
            eq(schema.challengeCapsules.capsuleId, schema.capsules.id)
        )
        .where(eq(schema.challengeCapsules.challengeId, _challengeId_));

    return { ...challenges[0], capsules };
}

const DB = {
    createCapsule,
    createMedia,
    getCapsule,
    getUserCapsules,
    getPublicCapsules,
    getUserProfile,
    getPublicUserCapsules,
    createComment,
    fetchComments,
    createLike,
    fetchLikes,
    deleteLike,
    createChallenge,
    getChallenges,
    getFinishedChallenges,
    getChallenge,
    addChallengeCapsule,
};

export default DB;
