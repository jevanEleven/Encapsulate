import { APIAuthError, APIError } from "@/lib/errors/auth";
import { NextRequest, NextResponse } from "next/server";

import DB from "@/db/actions";
import GlobalConfig from "@/lib/config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ZodError } from "zod";
import fetchS3Client from "@/aws/ses/client";
import { getAPIUser } from "@/api/server-utils";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { mediaPOST } from "@/lib/validations/server-shared";

function genRandomString(length: number): string {
    var str = "";
    const validChars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < length; i++) {
        str += validChars[Math.floor(Math.random() * validChars.length)];
    }

    return str;
}

export async function POST(req: NextRequest) {
    try {
        const user = await getAPIUser();

        const body = await req.json();
        const input = mediaPOST.parse(body);

        const { fileName, capsuleId } = input;
        const capsule = await DB.getCapsule(capsuleId);
        const extension = fileName.split(".")[1];

        if (!user) throw new APIAuthError("Unauthorized.");
        if (user?.id !== capsule.userId)
            throw new APIAuthError("Can't modify a capsule that is not yours.");

        const s3Key = `${genRandomString(64)}.${extension}`;

        const s3Client = fetchS3Client();
        const command = new PutObjectCommand({
            Bucket: GlobalConfig.aws.s3.bucketName,
            Key: s3Key,
        });
        const presignedUploadURL = await getSignedUrl(s3Client, command, {
            expiresIn: GlobalConfig.aws.s3.presignedURLExpireTime,
        });

        const mediaId = await DB.createMedia({
            capsuleId,
            extension,
            s3Key,
            presignedUploadURL,
        });

        return NextResponse.json(
            { mediaId, presignedUploadURL },
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
