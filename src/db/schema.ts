import {
    boolean,
    date,
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

// Unecessary due to auth.users but can't remove or SignUp will break
const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    trophies: integer("trophies").notNull().default(0),
    isAdmin: boolean("is_admin").notNull().default(false),
});

const capsules = pgTable("capsules", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    unlockDate: date("unlock_date").notNull(),
    isPublic: boolean("is_public").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

const mediaItems = pgTable("media_items", {
    id: uuid("id").primaryKey().defaultRandom(),
    capsuleId: uuid("capsule_id")
        .references(() => capsules.id)
        .notNull(),
    s3Key: text("s3_key").notNull(),
    presignedUploadURL: text("presigned_upload_url").notNull(),
    extension: text("extension").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

const likes = pgTable("likes", {
    id: uuid("id").primaryKey().defaultRandom(),
    capsuleId: uuid("capsule_id")
        .references(() => capsules.id)
        .notNull(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

const comments = pgTable("comments", {
    id: uuid("id").primaryKey().defaultRandom(),
    capsuleId: uuid("capsule_id")
        .references(() => capsules.id)
        .notNull(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    content: text("content"),
    createdAt: timestamp("created_at").defaultNow(),
});

const challenges = pgTable("challenges", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    startDate: date("start_date"),
    endDate: date("end_date"),
    hasFinished: boolean("has_finished").notNull().default(false),
});

const challengeCapsules = pgTable("challenge_capsules", {
    challengeId: uuid("challenge_id")
        .references(() => challenges.id, {
            onUpdate: "cascade",
            onDelete: "cascade",
        })
        .primaryKey(),
    capsuleId: uuid("capsule_id")
        .references(() => capsules.id, {
            onUpdate: "cascade",
            onDelete: "cascade",
        })
        .primaryKey(),
});

export {
    users,
    capsules,
    mediaItems,
    likes,
    comments,
    challenges,
    challengeCapsules,
};
