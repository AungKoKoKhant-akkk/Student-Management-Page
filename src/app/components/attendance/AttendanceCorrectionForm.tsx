"use client";

import { useState } from "react";
import type { ComponentProps } from "react";
import type { AttendanceStatus } from "@/types/attendance";

interface AttendanceCorrectionFormProps {
    initialStatus: AttendanceStatus;
    saving: boolean;
    onSave: (status: AttendanceStatus, reason: string) => Promise<void>;
    onCancel: () => void;
}

export default function AttendanceCorrectionForm({
                                                     initialStatus,
                                                     saving,
                                                     onSave,
                                                     onCancel,
                                                 }: AttendanceCorrectionFormProps) {
    const [selectedStatus, setSelectedStatus] =
        useState<AttendanceStatus>(initialStatus);
    const [reason, setReason] = useState("");

    const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
        event.preventDefault();

        if (!reason.trim()) {
            alert("Please enter correction reason.");
            return;
        }

        await onSave(selectedStatus, reason);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <select
                value={selectedStatus}
                onChange={(event) =>
                    setSelectedStatus(event.target.value as AttendanceStatus)
                }
                className="w-full rounded border px-2 py-1"
            >
                <option value="PRESENT">PRESENT</option>
                <option value="LATE">LATE</option>
                <option value="ABSENT">ABSENT</option>
                <option value="EXCUSED">EXCUSED</option>
            </select>

            <input
                type="text"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Correction reason"
                className="w-full rounded border px-2 py-1"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={saving}
                    className="rounded bg-blue-600 px-3 py-1 text-sm text-white disabled:bg-gray-400"
                >
                    {saving ? "Saving..." : "Save"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={saving}
                    className="rounded bg-gray-300 px-3 py-1 text-sm"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}