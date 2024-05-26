import { APIAuthError, APIError } from "@/lib/errors/auth";
import { NextRequest, NextResponse } from "next/server";

import DB from "@/db/actions";
import GlobalConfig from "@/lib/config";
import { ZodError } from "zod";
import { challengeIdParamsSchema } from "@/lib/validations/server-shared";
import { getAPIUser } from "@/api/server-utils";

interface ctx {
    params: { id: string };
}

export async function GET(req: NextRequest, context: ctx) {
    try {
        const user = await getAPIUser();

        if (!user) throw new APIAuthError("Unauthorized.");

        const input = challengeIdParamsSchema.parse(context.params);
        const { capsules, ...challenge } = await DB.getChallenge(input.id);

        return NextResponse.json({ capsules, ...challenge }, { status: 200 });
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
