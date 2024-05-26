import Link from "next/link";
import { SignUpForm } from "@/components/forms/auth/signup-form";

export default function SignUpPage() {
    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold">Sign Up</h1>
            <SignUpForm />

            <div className="w-full h-fit flex flex-row text-gray-500 items-center justify-center">
                <span>
                    Already have an account?&nbsp;
                    <Link className="text-blue-500 underline" href="/signin">
                        Sign in
                    </Link>
                    .
                </span>
            </div>
        </div>
    );
}
