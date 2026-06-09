import type { AiAttendanceResponse } from "@/types/attendance";

interface AiResultCardProps {
    result: AiAttendanceResponse | null;
}

export default function AiResultCard({ result }: AiResultCardProps) {
    if (!result) {
        return null;
    }

    return (
        <div className="mt-6 rounded border p-4">
            <h2 className="mb-3 text-lg font-semibold">AI Result</h2>

            <div className="space-y-1">
                <p>
                    Recognized:{" "}
                    <span className={result.recognized ? "text-green-600" : "text-red-600"}>
            {result.recognized ? "Yes" : "No"}
          </span>
                </p>

                <p>Student Code: {result.studentCode || "-"}</p>
                <p>Confidence: {result.confidence ?? "-"}</p>
                <p>Distance: {result.distance ?? "-"}</p>

                <p>
                    Attendance Saved:{" "}
                    <span
                        className={
                            result.attendanceRecord ? "text-green-600" : "text-red-600"
                        }
                    >
            {result.attendanceRecord ? "Yes" : "No"}
          </span>
                </p>

                <p>Message: {result.message}</p>
            </div>

            {result.attendanceRecord && (
                <div className="mt-4 rounded bg-gray-50 p-3">
                    <p>Student Name: {result.attendanceRecord.studentName}</p>
                    <p>Class Section: {result.attendanceRecord.classSection}</p>
                    <p>Status: {result.attendanceRecord.status}</p>
                    <p>Marked By: {result.attendanceRecord.markedBy}</p>
                </div>
            )}
        </div>
    );
}