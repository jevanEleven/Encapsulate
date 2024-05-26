"use client";

import API from "@/api/actions";
import { useSession } from "@/hooks/use-session";
import { useQuery } from "react-query";
import React from "react";
import CreateChallengeForm from "@/components/forms/create-challenge-form";
import { useRouter } from "next/navigation";

function AdminPanel() {
    const { session, isLoading: isSessionLoading } = useSession();
    const router = useRouter();

    const { data, error, isLoading } = useQuery(
        ["userProfile", session?.user.id],
        async () => {
            const api = new API(session);
            return api.fetchUserProfile({ id: session?.user.id || "" });
        },
        {
            enabled: !!session && !isSessionLoading,
        }
    );

    if (isLoading || isSessionLoading) {
        return <div>Loading...</div>;
    }

    if (!data || data.profile.isAdmin === false) {
        router.push("/");
        return null;
    }

    return (
        <div>
            <CreateChallengeForm />
        </div>
    );
}

export default AdminPanel;
