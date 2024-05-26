import { APIAuthError, APIError } from "@/lib/errors/auth";
import { NextRequest, NextResponse } from "next/server";
import {
    capsuleIdParamsSchema,
    commentsPOST,
} from "@/lib/validations/server-shared";

import DB from "@/db/actions";
import { ZodError } from "zod";
import { getAPIUser } from "@/api/server-utils";

interface ctx {
    params: { id: string };
}

export async function POST(req: NextRequest, context: ctx) {
    try {
        const user = await getAPIUser();

        if (!user) throw new APIAuthError("Unauthorized.");
        const body = await req.json();
        const input = commentsPOST.parse(body);

        const { id: capsuleId } = capsuleIdParamsSchema.parse(context.params);
        const capsule = await DB.getCapsule(capsuleId);

        if (!capsule.isPublic)
            throw new APIError("Can't comment on a private capsule.", 400);

        const commentId = await DB.createComment({
            userId: user.id,
            capsuleId,
            content: input.content,
        });

        return NextResponse.json(
            {
                commentId,
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

        const { id: capsuleId } = capsuleIdParamsSchema.parse(context.params);
        const capsule = await DB.getCapsule(capsuleId);

        if (!user) throw new APIAuthError("Unauthorized.");
        if (!capsule.isPublic && user?.id !== capsule.userId)
            throw new APIAuthError(
                "Capsule is private. If this is your capsule please sign in to view it."
            );

        const comments = await DB.fetchComments(capsuleId);

        return NextResponse.json({ comments }, { status: 200 });
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
