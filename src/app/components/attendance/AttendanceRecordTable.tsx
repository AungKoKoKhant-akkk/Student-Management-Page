"use client";

import { useState } from "react";



import type {
    AttendanceRecordResponse,
    AttendanceStatus,
} from "@/types/attendance";

import { formatTime } from "@/lib/formatters";
import AttendanceCorrectionForm from "@/app/components/attendance/AttendanceCorrectionForm";
import AttendanceRecordRow from "@/app/components/attendance/AttendanceRecordRow";

interface AttendanceRecordTableProps {
    records: AttendanceRecordResponse[];
    onCorrectRecord: (
        recordId: number,
        status: AttendanceStatus,
        reason: string
    ) => Promise<void>;
}

function getStatusClassName(status: string): string {
    if (status === "PRESENT") {
        return "text-green-600";
    }

    if (status === "LATE") {
        return "text-yellow-600";
    }

    if (status === "ABSENT") {
        return "text-red-600";
    }

    return "text-gray-600";
}

export default function AttendanceRecordTable({
                                                  records,
                                                  onCorrectRecord,
                                              }: AttendanceRecordTableProps) {
    const [editingRecordId, setEditingRecordId] = useState<number | null>(null);
    const [savingRecordId, setSavingRecordId] = useState<number | null>(null);

    const handleSaveCorrection = async (
        recordId: number,
        status: AttendanceStatus,
        reason: string
    ) => {
        setSavingRecordId(recordId);

        try {
            await onCorrectRecord(recordId, status, reason);
            setEditingRecordId(null);
        } finally {
            setSavingRecordId(null);
        }
    };

    if (records.length === 0) {
        return <p className="text-gray-500">No attendance records found.</p>;
    }

    return (
        <div className="overflow-x-auto rounded border">
            <table className="w-full border-collapse text-left">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border-b px-4 py-2">Student Code</th>
                    <th className="border-b px-4 py-2">Name</th>
                    <th className="border-b px-4 py-2">Class</th>
                    <th className="border-b px-4 py-2">Status</th>
                    <th className="border-b px-4 py-2">Check-in Time</th>
                    <th className="border-b px-4 py-2">Marked By</th>
                    <th className="border-b px-4 py-2">Confidence</th>
                    <th className="border-b px-4 py-2">Correction</th>
                </tr>
                </thead>

                <tbody>
                {records.map((record) => (
                    <AttendanceRecordRow
                        key={record.id}
                        record={record}
                        onCorrectRecord={onCorrectRecord}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}