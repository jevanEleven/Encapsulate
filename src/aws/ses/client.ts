import GlobalConfig from "@/lib/config";
import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.AWS_ACCESS_KEY_ID)
    throw new Error("`AWS_ACCESS_KEY_ID` environment variable undefined.");

if (!process.env.AWS_SECRET_ACCESS_KEY)
    throw new Error("`AWS_SECRET_ACCESS_KEY` environment variable undefined.");

function fetchS3Client() {
    return new S3Client({ region: GlobalConfig.aws.region });
}

export default fetchS3Client;
