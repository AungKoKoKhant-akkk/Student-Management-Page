interface LoadingTextProps {
    text?: string;
}

export default function LoadingText({ text = "Loading..." }: LoadingTextProps) {
    return <p className="text-gray-500">{text}</p>;
}