import API from "@/api/actions";
import CapsuleCommentForm from "./forms/capsule-comment-form";
import { HTMLAttributes } from "react";
import React from "react";
import { useQuery } from "react-query";
import { useSession } from "@/hooks/use-session";

interface CapsuleCommentsProps extends HTMLAttributes<HTMLAnchorElement> {
    capsuleId: string;
}

const CapsuleComments = React.forwardRef<
    HTMLAnchorElement,
    CapsuleCommentsProps
>(({ className, capsuleId, children, ...props }, ref) => {
    const { session, isLoading: isSessionLoading } = useSession();

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["capsuleComments", capsuleId],
        queryFn: async () => {
            const api = new API(session);
            return api.fetchComments({ id: capsuleId });
        },
        enabled: !!session && !isSessionLoading,
    });

    return (
        <div>
            <b>Capsule Comments</b>
            <div style={{ marginBottom: 10 }}>
                {data &&
                    data.comments.map((comment) => {
                        return (
                            <div
                                key={comment.id}
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    marginTop: "4px",
                                    borderRadius: "4px",
                                }}
                            >
                                {comment.content}
                            </div>
                        );
                    })}
            </div>
            <CapsuleCommentForm onComment={refetch} capsuleId={capsuleId} />
        </div>
    );
});

CapsuleComments.displayName = "CapsuleComments";

export default CapsuleComments;
