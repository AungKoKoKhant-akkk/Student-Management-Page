"use client";

import type { ChangeEvent } from "react";
import type { AttendanceSession } from "@/types/session";

interface AttendanceSessionSelectProps {
    sessions: AttendanceSession[];
    selectedSessionId: string;
    onChange: (sessionId: string) => void;
}

export default function AttendanceSessionSelect({
                                                    sessions,
                                                    selectedSessionId,
                                                    onChange,
                                                }: AttendanceSessionSelectProps) {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="rounded border p-4">
            <label className="mb-1 block font-medium">Session</label>

            <select
                value={selectedSessionId}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
            >
                <option value="">Select session</option>

                {sessions.map((session) => (
                    <option key={session.id} value={session.id}>
                        #{session.id} - {session.classSection} - {session.subjectName} -{" "}
                        {session.status}
                    </option>
                ))}
            </select>
        </div>
    );
}