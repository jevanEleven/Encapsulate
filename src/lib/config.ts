type Config = {
    aws: {
        region: string;
        s3: {
            bucketURL: string;
            bucketName: string;
            presignedURLExpireTime: number;
        };
    };
};

const GlobalConfig: Config = {
    aws: {
        region: "us-east-2",
        s3: {
            bucketURL:
                "https://encapsulate-capsules.s3.us-east-2.amazonaws.com",
            bucketName: "encapsulate-capsules",
            presignedURLExpireTime: 60 * 60,
        },
    },
};

export default GlobalConfig;
