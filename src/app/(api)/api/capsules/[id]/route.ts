import { APIAuthError, APIError } from "@/lib/errors/auth";
import { NextRequest, NextResponse } from "next/server";

import DB from "@/db/actions";
import GlobalConfig from "@/lib/config";
import { ZodError } from "zod";
import { capsuleIdParamsSchema } from "@/lib/validations/server-shared";
import { getAPIUser } from "@/api/server-utils";

interface ctx {
    params: { id: string };
}

export async function GET(req: NextRequest, context: ctx) {
    try {
        const user = await getAPIUser();

        const input = capsuleIdParamsSchema.parse(context.params);
        const { media, ...capsule } = await DB.getCapsule(input.id);

        if (!user) throw new APIAuthError("Unauthorized.");
        if (!capsule.isPublic && user?.id !== capsule.userId)
            throw new APIAuthError(
                "Capsule is private. If this is your capsule please sign in to view it."
            );

        const images = media.map(
            ({ s3Key }) => `${GlobalConfig.aws.s3.bucketURL}/${s3Key}`
        );

        return NextResponse.json({ images, ...capsule }, { status: 200 });
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
