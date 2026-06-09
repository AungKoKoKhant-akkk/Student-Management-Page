"use client";

import type { ChangeEvent, ComponentProps } from "react";
import type { AttendanceSession } from "@/types/session";

interface AiAttendanceFormProps {
    activeSessions: AttendanceSession[];
    selectedSessionId: string;
    selectedFile: File | null;
    previewUrl: string;
    loading: boolean;
    onSessionChange: (sessionId: string) => void;
    onFileChange: (file: File | null) => void;
    onSubmit: ComponentProps<"form">["onSubmit"];
}

export default function AiAttendanceForm({
                                             activeSessions,
                                             selectedSessionId,
                                             selectedFile,
                                             previewUrl,
                                             loading,
                                             onSessionChange,
                                             onFileChange,
                                             onSubmit,
                                         }: AiAttendanceFormProps) {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        onFileChange(file);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 rounded border p-4">
            <div>
                <label className="mb-1 block font-medium">Active Session</label>
                <select
                    value={selectedSessionId}
                    onChange={(event) => onSessionChange(event.target.value)}
                    className="w-full rounded border px-3 py-2"
                >
                    <option value="">Select active session</option>

                    {activeSessions.map((session) => (
                        <option key={session.id} value={session.id}>
                            #{session.id} - {session.classSection} - {session.subjectName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-1 block font-medium">Face Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full rounded border px-3 py-2"
                />
            </div>

            {selectedFile && (
                <p className="text-sm text-gray-600">Selected: {selectedFile.name}</p>
            )}

            {previewUrl && (
                <div>
                    <p className="mb-2 font-medium">Preview</p>
                    <img
                        src={previewUrl}
                        alt="Selected face preview"
                        className="h-48 rounded border object-cover"
                    />
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
            >
                {loading ? "Checking..." : "Mark AI Attendance"}
            </button>
        </form>
    );
}