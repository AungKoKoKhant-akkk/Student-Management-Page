"use client";


import { formatTime } from "@/lib/formatters";

import type {
    AttendanceRecordResponse,
    AttendanceStatus,
} from "@/types/attendance";
import {getAttendanceStatusClassName} from "@/lib/attendanceHelper";
import AttendanceCorrectionForm from "@/app/components/attendance/AttendanceCorrectionForm";
import {useState} from "react";

interface AttendanceRecordRowProps {
    record: AttendanceRecordResponse;
    onCorrectRecord: (
        recordId: number,
        status: AttendanceStatus,
        correctionReason: string
    ) => Promise<void>;
}

export default function AttendanceRecordRow({
                                                record,
                                                onCorrectRecord,
                                            }: AttendanceRecordRowProps) {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSave = async (
        status: AttendanceStatus,
        correctionReason: string
    ) => {
        setSaving(true);

        try {
            await onCorrectRecord(
                record.id,
                status,
                correctionReason
            );

            setEditing(false);
        } finally {
            setSaving(false);
        }
    };

    return (
        <tr className="border-t align-top">
        <td className="px-4 py-2">{record.studentCode}</td>

            <td className="px-4 py-2">{record.studentName}</td>

        <td className="px-4 py-2">{record.classSection}</td>

        <td
    className={`px-4 py-2 font-semibold ${getAttendanceStatusClassName(
        record.status
    )}`}
>
    {record.status}
    </td>

    <td className="px-4 py-2">
        {formatTime(record.checkInTime)}
    </td>

    <td className="px-4 py-2">{record.markedBy}</td>

        <td className="px-4 py-2">
        {record.confidenceScore ?? "-"}
        </td>

        <td className="px-4 py-2">
        {!editing ? (
            <button
                type="button"
        onClick={() => setEditing(true)}
    className="rounded bg-gray-700 px-3 py-1 text-sm text-white"
        >
        Correct
        </button>
) : (
        <AttendanceCorrectionForm
            initialStatus={record.status}
    saving={saving}
    onSave={handleSave}
    onCancel={() => setEditing(false)}
    />
)}
    </td>
    </tr>
);
}