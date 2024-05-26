import { APIAuthError, APIError } from "@/lib/errors/auth";
import { NextRequest, NextResponse } from "next/server";

import DB from "@/db/actions";
import { ZodError } from "zod";
import { capsuleIdParamsSchema } from "@/lib/validations/server-shared";
import { getAPIUser } from "@/api/server-utils";

interface ctx {
    params: { id: string };
}

export async function POST(req: NextRequest, context: ctx) {
    try {
        const user = await getAPIUser();

        if (!user) throw new APIAuthError("Unauthorized.");

        const { id: capsuleId } = capsuleIdParamsSchema.parse(context.params);
        const capsule = await DB.getCapsule(capsuleId);

        if (!capsule.isPublic)
            throw new APIError("Can't like a private capsule.", 400);

        const likes = await DB.fetchLikes(capsuleId);
        const isLiked = likes.map((like) => like.userId).includes(user.id);

        if (isLiked) await DB.deleteLike(user.id);
        else await DB.createLike({ userId: user.id, capsuleId });

        return NextResponse.json(
            {
                isLiked,
            },
            { status: 200 }
        );
    } catch (e: any) {
        console.error(e);

        if (e instanceof ZodError) {
            return NextResponse.json(
                { message: "Bad Request Body." },
                { status: 400 }
            );
        }

        if (e instanceof APIError) {
            return NextResponse.json(
                { message: e.message },
                { status: e.statusCode }
            );
        }

        return NextResponse.json(
            { message: "Unknown Server Error." },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest, context: ctx) {
    try {
        const user = await getAPIUser();

        if (!user) throw new APIAuthError("Unauthorized.");

        const { id: capsuleId } = capsuleIdParamsSchema.parse(context.params);
        const capsule = await DB.getCapsule(capsuleId);

        if (!capsule.isPublic)
            throw new APIError("Can't like a private capsule.", 400);

        const likes = await DB.fetchLikes(capsuleId);
        const isLiked = likes.map((like) => like.userId).includes(user.id);

        return NextResponse.json(
            {
                likes: likes.length,
                isLiked,
            },
            { status: 200 }
        );
    } catch (e: any) {
        console.error(e);

        if (e instanceof ZodError) {
            return NextResponse.json(
                { message: "Bad Request Body." },
                { status: 400 }
            );
        }

        if (e instanceof APIError) {
            return NextResponse.json(
                { message: e.message },
                { status: e.statusCode }
            );
        }

        return NextResponse.json(
            { message: "Unknown Server Error." },
            { status: 500 }
        );
    }
}
