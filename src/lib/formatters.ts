export function formatTime(time: string | null): string {
    if (!time) {
        return "-";
    }

    return time.split(".")[0];
}

export function formatDate(date: string | null): string {
    if (!date) {
        return "-";
    }

    return date;
}