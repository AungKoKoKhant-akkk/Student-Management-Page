interface MessageAlertProps {
    type: "success" | "error";
    message: string;
}

export default function MessageAlert({ type, message }: MessageAlertProps) {
    if (!message) {
        return null;
    }

    const className =
        type === "success"
            ? "rounded border border-green-300 bg-green-50 p-3 text-green-700"
            : "rounded border border-red-300 bg-red-50 p-3 text-red-700";

    return <div className={className}>{message}</div>;
}