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

const createCapsuleFormSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    unlockDate: z.preprocess(
        (val) => {
            if (typeof val === "string" || typeof val === "number")
                return new Date(val);
            return new Date();
        },
        z
            .date()
            .refine(
                (val) => {
                    return val > new Date(Date.now());
                },
                { message: "Date must be in the future." }
            )
            .refine(
                (val) => {
                    const futureLimit = new Date(Date.now());
                    futureLimit.setMonth(futureLimit.getMonth() + 6);
                    return val < futureLimit;
                },
                {
                    message: "Date must not be more than 180 days from today.",
                }
            )
    ),
    isPublic: z.boolean(),

    images: z.array(z.instanceof(File)),
});

type Inputs = z.infer<typeof createCapsuleFormSchema>;

function CreateCapsuleForm() {
    const router = useRouter();
    const { session, isLoading } = useSession();
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const form = useForm<Inputs>({
        resolver: zodResolver(createCapsuleFormSchema),
        defaultValues: {
            title: "",
            description: "",
            images: [],
            unlockDate: new Date(),
            isPublic: false,
        },
    });

    const mutation = useMutation(
        async (data: Inputs) => {
            if (!session) throw new Error("`session` is null.");

            const api = new API(session);

            const { images, unlockDate, ...capsule } = data;
            const capsuleId = await api.createCapsule({
                userId: session.user.id,
                unlockDate: unlockDate.toISOString().substring(0, 10),
                ...capsule,
            });

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
            onSuccess: (capsuleId) => {
                router.push(`/view/${capsuleId}`);
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
        <div className="h-[94vh]">
            <Form {...form}>
                <form
                    className="grid gap-4"
                    onSubmit={(...args) =>
                        void form.handleSubmit(onSubmit)(...args)
                    }
                >
                    {session && <center className="mt-[100px] text-xl font-bold">
                        Create Your Capsule
                        <div className="mr-5 rounded-[15px] p-[15px] max-w-[600px]">
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
                            <br />
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
                            <br />
                            <br />
                            <FormField
                                control={form.control}
                                name="unlockDate"
                                render={({
                                    field: {
                                        onChange,
                                        onBlur,
                                        name,
                                        ref,
                                        value,
                                    },
                                }) => (
                                    <FormItem>
                                        <FormLabel>Unlock Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                name={name}
                                                ref={ref}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                value={
                                                    value instanceof Date
                                                        ? value
                                                              .toISOString()
                                                              .substring(0, 10)
                                                        : value
                                                }
                                                placeholder="YYYY-MM-DD"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <br />
                            <div className="flex justify-around">
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
                                <FormField
                                    control={form.control}
                                    name="isPublic"
                                    render={({
                                        field: {
                                            onChange,
                                            onBlur,
                                            name,
                                            ref,
                                            value,
                                        },
                                    }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Make the capsule public?
                                            </FormLabel>
                                            <FormControl>
                                                <label className="relative left-5">
                                                    <input
                                                        type="checkbox"
                                                        name={name}
                                                        ref={ref}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        checked={!!value}
                                                        style={{
                                                            transform:
                                                                "scale(1.5)",
                                                        }}
                                                    />
                                                </label>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </center>}

                    {mutation.isError && <span>{errorMessage}</span>}
                </form>
            </Form>
        </div>
    );
}

export default CreateCapsuleForm;
