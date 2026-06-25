import type { AttendanceStatus } from "@/types/attendance";

export function getAttendanceStatusClassName(
    status: AttendanceStatus
): string {
    switch (status) {
        case "PRESENT":
            return "text-green-600";

        case "LATE":
            return "text-yellow-600";

        case "ABSENT":
            return "text-red-600";

        case "EXCUSED":
            return "text-blue-600";

        default:
            return "text-gray-600";
    }
}