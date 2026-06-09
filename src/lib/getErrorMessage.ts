import axios from "axios";

export function getErrorMessage(error: unknown, fallbackMessage: string): string {
    if (axios.isAxiosError(error)) {
        const responseMessage = error.response?.data?.message;

        if (typeof responseMessage === "string") {
            return responseMessage;
        }

        return fallbackMessage;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return fallbackMessage;
}