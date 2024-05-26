import { ResetPasswordRequestForm } from "@/components/forms/auth/reset-password-request-form";

export default function ForgotPasswordPage() {
    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold">Reset your password</h1>
            <ResetPasswordRequestForm />
        </div>
    );
}
