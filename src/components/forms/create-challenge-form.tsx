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

const createChallengeFormSchema = z
    .object({
        title: z.string().min(1),
        description: z.string().min(1),
        startDate: z.preprocess(
            (val) => {
                if (typeof val === "string" || typeof val === "number")
                    return new Date(val);
                return null;
            },
            z.date().refine(
                (val) => {
                    return val > new Date(Date.now());
                },
                { message: "Start date must be in the future." }
            )
        ),
        endDate: z.preprocess(
            (val) => {
                if (typeof val === "string" || typeof val === "number")
                    return new Date(val);
                return null;
            },
            z.date().refine(
                (val: Date) => {
                    return val > new Date(Date.now());
                },
                { message: "End date must be in the future." }
            )
        ),
    })
    .refine((data) => data.endDate > data.startDate, {
        message: "End date must be after start date.",
        path: ["endDate"],
    });

type Inputs = z.infer<typeof createChallengeFormSchema>;

function CreateChallengeForm() {
    const router = useRouter();
    const { session, isLoading } = useSession();
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const form = useForm<Inputs>({
        resolver: zodResolver(createChallengeFormSchema),
        defaultValues: {
            title: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
        },
    });

    const mutation = useMutation(
        async (data: Inputs) => {
            if (!session) throw new Error("`session` is null.");

            const api = new API(session);

            const challengeId = await api.createChallenge({
                title: data.title,
                description: data.description,
                startDate: data.startDate.toISOString(),
                endDate: data.endDate.toISOString(),
            });

            return challengeId;
        },
        { retry: false }
    );

    async function onSubmit(data: Inputs) {
        mutation.mutate(data, {
            onSuccess: (challengeId) => {
                router.push(`/challenges/${challengeId}`);
            },
            onError: (e: any) => {
                if (e instanceof AuthError) {
                    setErrorMessage(e.message);
                } else {
                    setErrorMessage(e.toString());
                }
            },
        });
    }
    return (
        <div className="">
            <Form {...form}>
                <form
                    className="grid gap-4"
                    onSubmit={(...args) =>
                        void form.handleSubmit(onSubmit)(...args)
                    }
                >
                    <center className="text-xl font-bold">
                        Create a new challenge
                        <div className="mr-5 rounded-[15px] p-[15px] max-w-[600px]">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="What is the title of this challenge?"
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
                                                placeholder="What is the description of this challenge?"
                                                {...field}
                                                rows={10}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <br />
                            <div className="flex space-x-4">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({
                                        field: {
                                            onChange,
                                            onBlur,
                                            name,
                                            ref,
                                            value,
                                        },
                                    }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Start Date</FormLabel>
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
                                                                  .substring(
                                                                      0,
                                                                      10
                                                                  )
                                                            : value
                                                    }
                                                    placeholder="YYYY-MM-DD"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({
                                        field: {
                                            onChange,
                                            onBlur,
                                            name,
                                            ref,
                                            value,
                                        },
                                    }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>End Date</FormLabel>
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
                                                                  .substring(
                                                                      0,
                                                                      10
                                                                  )
                                                            : value
                                                    }
                                                    placeholder="YYYY-MM-DD"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
                                        Continue to create challenge
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </center>

                    {mutation.isError && <span>{errorMessage}</span>}
                </form>
            </Form>
        </div>
    );
}

export default CreateChallengeForm;
