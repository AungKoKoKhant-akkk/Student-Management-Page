import type { AttendanceSummaryResponse } from "@/types/attendance";

interface AttendanceSummaryCardsProps {
    summary: AttendanceSummaryResponse | null;
}

export default function AttendanceSummaryCards({
                                                   summary,
                                               }: AttendanceSummaryCardsProps) {
    if (!summary) {
        return null;
    }

    return (
        <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded border p-4">
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold">{summary.totalStudents}</p>
            </div>

            <div className="rounded border p-4">
                <p className="text-sm text-gray-500">Present</p>
                <p className="text-2xl font-bold text-green-600">
                    {summary.presentCount}
                </p>
            </div>

            <div className="rounded border p-4">
                <p className="text-sm text-gray-500">Late</p>
                <p className="text-2xl font-bold text-yellow-600">
                    {summary.lateCount}
                </p>
            </div>

            <div className="rounded border p-4">
                <p className="text-sm text-gray-500">Absent</p>
                <p className="text-2xl font-bold text-red-600">
                    {summary.absentCount}
                </p>
            </div>
        </div>
    );
}