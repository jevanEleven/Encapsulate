"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import React from "react";
import { emailSchema } from "@/lib/validations/auth";
import getSupabaseClient from "@/db/supabase-client";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: emailSchema,
});

type Inputs = z.infer<typeof formSchema>;

const dbClient = getSupabaseClient();

export function ResetPasswordRequestForm() {
    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const mutation = useMutation(
        async (data: Inputs) => {
            await dbClient.auth.resetPasswordForEmail(data.email);
        },
        { retry: false }
    );

    async function onSubmit(data: Inputs) {
        mutation.mutate(data);
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="someone@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={mutation.isLoading || mutation.isSuccess}>
                    {mutation.isLoading && (
                        <Icons.spinner
                            className="mr-2 size-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Continue
                    <span className="sr-only">
                        Continue to email verification page
                    </span>
                </Button>
                {mutation.isSuccess && (
                    <span>
                        If an account with this email address exists
                        <br />
                        we sent you an email with instructions
                        <br />
                        on resetting your password.
                    </span>
                )}
            </form>
        </Form>
    );
}
