import { APIAuthError, APIError } from "@/lib/errors/auth";
import { NextRequest, NextResponse } from "next/server";

import DB from "@/db/actions";
import { ZodError } from "zod";
import { getAPIUser } from "@/api/server-utils";

export async function GET(req: NextRequest) {
    try {
        const finishedChallenges = await DB.getFinishedChallenges();

        for (const challenge of finishedChallenges) {
            // Perform your processing logic here
            console.log(`Processing challenge: ${challenge.title}`);
            // Update the challenge as finished
        }

        return NextResponse.json(
            { message: "Challenges processed successfully" },
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

        return NextResponse.json(
            { message: "Unknown Server Error." },
            { status: 500 }
        );
    }
}
