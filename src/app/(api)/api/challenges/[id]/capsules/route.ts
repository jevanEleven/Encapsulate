import { APIAuthError, APIError } from "@/lib/errors/auth";
import { NextRequest, NextResponse } from "next/server";

import DB from "@/db/actions";
import { ZodError } from "zod";
import {
    capsuleIdParamsSchema,
    challengeIdParamsSchema,
} from "@/lib/validations/server-shared";
import { getAPIUser } from "@/api/server-utils";

interface ctx {
    params: { id: string };
}

export async function POST(req: NextRequest, context: ctx) {
    try {
        const user = await getAPIUser();
        if (!user) throw new APIAuthError("Unauthorized.");

        const { id: challengeId } = challengeIdParamsSchema.parse(
            context.params
        );

        const body = await req.json();
        const { id: capsuleId } = capsuleIdParamsSchema.parse(body);

        await DB.addChallengeCapsule(challengeId, capsuleId);

        return NextResponse.json({ status: 200 });
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
