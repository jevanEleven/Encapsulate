import { User } from "@supabase/supabase-js";
import getSupabaseClient from "@/db/supabase-client";
import { headers } from "next/headers";

async function getAPIUser(): Promise<User | null> {
    const header = headers();
    const jwt = header.get("authorization")?.split(" ")[1];

    if (jwt) {
        const {
            data: { user },
        } = await getSupabaseClient().auth.getUser(jwt);

        return user;
    }

    return null;
}

export { getAPIUser };
