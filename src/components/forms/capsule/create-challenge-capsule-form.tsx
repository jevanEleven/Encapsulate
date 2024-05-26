"use client";

import { Controller, useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input, MultiFileInput, TextArea } from "@/components/ui/input";

import API from "@/api/actions";
import { AuthError } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import React from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createChallengeCapsuleFormSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    images: z.array(z.instanceof(File)),
});

type Inputs = z.infer<typeof createChallengeCapsuleFormSchema>;

function CreateChallengeCapsuleForm(params: {
    challengeId: string;
    onCreateCapsule: Function;
}) {
    const { challengeId, onCreateCapsule } = params;
    const router = useRouter();
    const { session, isLoading } = useSession();
    const [statusMessage, setStatusMessage] = React.useState<string>("");

    const form = useForm<Inputs>({
        resolver: zodResolver(createChallengeCapsuleFormSchema),
        defaultValues: {
            title: "",
            description: "",
            images: [],
        },
    });

    const mutation = useMutation(
        async (data: Inputs) => {
            if (!session) throw new Error("`session` is null.");

            const api = new API(session);

            const { images, ...capsule } = data;
            const capsuleId = await api.createCapsule(
                {
                    userId: session.user.id,
                    unlockDate: new Date().toISOString().substring(0, 10),
                    isPublic: true,
                    ...capsule,
                },
                challengeId
            );

            data.images.forEach(async (image) => {
                const { presignedUploadURL } = await api.attachMedia({
                    capsuleId,
                    fileName: image.name,
                });

                await axios.put(presignedUploadURL, image, {
                    headers: { "Content-Type": image.type },
                });
            });

            return capsuleId;
        },
        { retry: false }
    );

    async function onSubmit(data: Inputs) {
        mutation.mutate(data, {
            onSuccess: () => {
                form.reset();
                setStatusMessage("Capsule created successfully.");
                onCreateCapsule();
            },
            onError: (e: any) => {
                if (e instanceof AuthError) {
                    setStatusMessage(e.message);
                } else {
                    setStatusMessage("Unkown error.");
                }
            },
        });
    }
    return (
        <div className="max-w-3xl mx-auto">
            <Form {...form}>
                <form
                    onSubmit={(...args) =>
                        void form.handleSubmit(onSubmit)(...args)
                    }
                >
                    <center className="text-xl font-bold">
                        Join the challenge!
                        <div className="mr-5 rounded p-8 w-full">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="What is the title of this capsule?"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <hr className="h-[2px] border-0 text-black bg-black mt-2.5 mb-[15px]"></hr>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <TextArea
                                                placeholder="Write something memorable!"
                                                {...field}
                                                rows={10}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name="images"
                                render={({
                                    field: { onChange, onBlur, name, ref },
                                }) => (
                                    <FormItem>
                                        <FormControl>
                                            <MultiFileInput
                                                name={name}
                                                accept="image/*"
                                                ref={ref}
                                                onBlur={onBlur}
                                                onChange={(e) => {
                                                    const files = e.target.files
                                                        ? Array.from(
                                                              e.target.files
                                                          )
                                                        : [];
                                                    onChange(files);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-around mt-4">
                                <Button
                                    className="bg-black hover:bg-gray-800 text-white font-semibold py-6 px-8 rounded-lg"
                                    disabled={mutation.isLoading}
                                >
                                    {mutation.isLoading && (
                                        <Icons.spinner
                                            className="mr-2 size-4 animate-spin"
                                            aria-hidden="true"
                                        />
                                    )}
                                    Create
                                    <span className="sr-only">
                                        Continue to create time capsule
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </center>

                    {mutation.isError && <span>{statusMessage}</span>}
                </form>
            </Form>
        </div>
    );
}

export default CreateChallengeCapsuleForm;
