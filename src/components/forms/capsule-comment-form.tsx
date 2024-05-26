"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import API from "@/api/actions";
import { AuthError } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createCapsuleFormSchema = z.object({
    comment: z.string().min(1),
});

type Inputs = z.infer<typeof createCapsuleFormSchema>;

function CapsuleCommentForm(params: {
    onComment: Function;
    capsuleId: string;
}) {
    const { capsuleId, onComment } = params;

    const router = useRouter();
    const { session, isLoading } = useSession();
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const form = useForm<Inputs>({
        resolver: zodResolver(createCapsuleFormSchema),
        defaultValues: {
            comment: "",
        },
    });

    const mutation = useMutation(
        async (data: Inputs) => {
            if (!session) throw new Error("`session` is null.");

            const api = new API(session);

            const commentId = await api.comment({
                capsuleId,
                content: data.comment,
            });

            return commentId;
        },
        { retry: false }
    );

    async function onSubmit(data: Inputs) {
        mutation.mutate(data, {
            onSuccess: () => {
                form.reset();
                onComment();
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
                <center className="">
                    <div className="">
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Comment body."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className={""} disabled={mutation.isLoading}>
                            {mutation.isLoading && (
                                <Icons.spinner
                                    className="mr-2 size-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}
                            Comment
                            <span className="sr-only">
                                Continue to create time capsule
                            </span>
                        </Button>
                    </div>
                </center>

                {mutation.isError && <span>{errorMessage}</span>}
            </form>
        </Form>
    );
}

export default CapsuleCommentForm;
