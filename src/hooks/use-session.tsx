import React from "react";

import { useEffect, useState } from "react";

import { Session } from "@supabase/supabase-js";
import getSupabaseClient from "@/db/supabase-client";

interface ClientSession {
    isLoading: boolean;
    session: Session | null;
    signOut: Function;
}

const SessionContext = React.createContext<ClientSession | null>(null);

function useSession(): ClientSession {
    const context = React.useContext(SessionContext);

    if (!context)
        throw new Error(
            "No context found. Define <SessionProvider /> as a parent."
        );

    return context;
}

type SessionContextProviderProps = {
    children: React.ReactNode;
};

const supabase = getSupabaseClient();

const SessionProvider: React.FC<SessionContextProviderProps> = ({
    children,
}) => {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Start as true to reflect initial loading state

    useEffect(() => {
        let mounted = true;

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setIsLoading(true);

                if (event === "SIGNED_IN") {
                    if (mounted) setSession(session);
                } else if (event === "SIGNED_OUT") {
                    if (mounted) setSession(null);
                }

                if (mounted) setIsLoading(false);
            }
        );

        async function fetchSession() {
            try {
                const { data: sessionData, error } =
                    await supabase.auth.getSession();
                if (error) {
                    throw new Error("Failed to fetch session");
                }
                if (mounted) {
                    setSession(sessionData.session);
                }
            } catch (error) {
                console.error(error);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        }

        fetchSession();

        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        setIsLoading(true);
        await supabase.auth.signOut();
        setSession(null);
        setIsLoading(false);
    };

    return (
        <SessionContext.Provider value={{ session, isLoading, signOut }}>
            {children}
        </SessionContext.Provider>
    );
};

export { useSession, SessionProvider, type Session, type ClientSession };
