import { ResetPasswordForm } from "@/components/forms/auth/reset-password-form";

export default function ForgotPasswordConfirmPage() {
    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold">Reset Password</h1>
            <ResetPasswordForm />
        </div>
    );
}
