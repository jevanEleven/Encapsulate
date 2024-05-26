import { NextRequest, NextResponse } from "next/server";

import DB from "@/db/actions";
import { ZodError } from "zod";
import { getAPIUser } from "@/api/server-utils";
import { usersIdParamsSchema } from "@/lib/validations/server-shared";

interface ctx {
    params: { id: string };
}

export async function GET(req: NextRequest, context: ctx) {
    try {
        const input = usersIdParamsSchema.parse(context.params);

        const user = await getAPIUser();

        let capsules;
        if (user?.id == input.id) capsules = await DB.getUserCapsules(input.id);
        else capsules = await DB.getPublicUserCapsules(input.id);

        const profile = await DB.getUserProfile(input.id);

        return NextResponse.json({ profile, capsules }, { status: 200 });
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
