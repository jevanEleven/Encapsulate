import { desc } from "drizzle-orm";
import { start } from "repl";
import z from "zod";

const capsulesPOST = z.object({
    userId: z.string().uuid(),

    title: z.string().min(1),
    description: z.string().min(1),
    unlockDate: z.string().refine(
        (value) => {
            const date = new Date(value);
            return !isNaN(date.getTime());
        },
        {
            message:
                "Invalid date format, expected yyyy-mm-dd or a valid date string",
        }
    ),
    isPublic: z.boolean(),
});

const mediaPOST = z.object({
    fileName: z.string().min(1),
    capsuleId: z.string().uuid(),
});

const commentsPOST = z.object({
    content: z.string().min(1),
    capsuleId: z.string().uuid(),
});

const challengesPOST = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    startDate: z.string().refine(
        (value) => {
            const date = new Date(value);
            return !isNaN(date.getTime());
        },
        {
            message:
                "Invalid date format, expected yyyy-mm-dd or a valid date string",
        }
    ),
    endDate: z.string().refine(
        (value) => {
            const date = new Date(value);
            return !isNaN(date.getTime());
        },
        {
            message:
                "Invalid date format, expected yyyy-mm-dd or a valid date string",
        }
    ),
});

const capsuleIdParamsSchema = z.object({ id: z.string().uuid() });

const usersIdParamsSchema = z.object({ id: z.string().uuid() });

const challengeIdParamsSchema = z.object({ id: z.string().uuid() });

export {
    capsulesPOST,
    mediaPOST,
    commentsPOST,
    challengesPOST,
    capsuleIdParamsSchema,
    usersIdParamsSchema,
    challengeIdParamsSchema,
};
