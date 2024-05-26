import { APIAuthError, APIError } from "@/lib/errors/auth";
import { NextRequest, NextResponse } from "next/server";

import DB from "@/db/actions";
import { ZodError } from "zod";
import { challengesPOST } from "@/lib/validations/server-shared";
import { getAPIUser } from "@/api/server-utils";

export async function POST(req: NextRequest) {
    try {
        const user = await getAPIUser();

        if (!user) throw new APIAuthError("Unauthorized.");

        const body = await req.json();
        const input = challengesPOST.parse(body);

        const challengeId = await DB.createChallenge(input);

        return NextResponse.json({ challengeId }, { status: 200 });
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

export async function GET(req: NextRequest) {
    try {
        const challenges = await DB.getChallenges();

        return NextResponse.json(challenges, { status: 200 });
    } catch (e: any) {
        console.error(e);

        if (e instanceof ZodError) {
            return NextResponse.json(
                { message: "Bad Request Body." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Unknown Server Error." },
            { status: 500 }
        );
    }
}
