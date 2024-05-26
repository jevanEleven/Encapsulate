"use client";

import { AuthError, EmailOtpType } from "@supabase/supabase-js";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../../ui/button";
import { Icons } from "../../icons";
import { PasswordInput } from "@/components/password-input";
import React from "react";
import getSupabaseClient from "@/db/supabase-client";
import { passwordSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type Inputs = z.infer<typeof formSchema>;

const dbClient = getSupabaseClient();

export function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const mutation = useMutation(
        async (data: Inputs) => {
            const token_hash = searchParams.get("token_hash");
            const type = searchParams.get("type") as EmailOtpType | null;

            if (token_hash && type) {
                const { error: authError } = await dbClient.auth.verifyOtp({
                    type,
                    token_hash,
                });

                if (authError) {
                    throw new AuthError(authError.message);
                }

                const { data: resetData, error: resetError } =
                    await dbClient.auth.updateUser({
                        password: data.password,
                    });

                if (resetError) {
                    throw new AuthError(resetError.message);
                }
            }
        },
        { retry: false }
    );

    async function onSubmit(data: Inputs) {
        mutation.mutate(data, {
            onSuccess: () => {
                router.push("/");
            },
            onError: (e: any) => {
                if (e instanceof AuthError) {
                    setErrorMessage(e.message);
                } else {
                    setErrorMessage("Unknown Error.");
                }
            },
        });
    }

    return (
        <Form {...form}>
            <form
                className="grid gap-4"
                onSubmit={(...args) =>
                    void form.handleSubmit(onSubmit)(...args)
                }
            >
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="**********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="**********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={mutation.isLoading}>
                    {mutation.isLoading && (
                        <Icons.spinner
                            className="mr-2 size-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Reset Password
                    <span className="sr-only">Reset password</span>
                </Button>
                {mutation.isError && <span>{errorMessage}</span>}
            </form>
        </Form>
    );
}
