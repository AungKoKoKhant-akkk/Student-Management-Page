"use client";

import { useCallback, useEffect, useState } from "react";
import type { ComponentProps } from "react";



import { attendanceService } from "@/services/attendanceService";
import { sessionService } from "@/services/sessionService";

import type { AiAttendanceResponse } from "@/types/attendance";
import type { AttendanceSession } from "@/types/session";

import { getErrorMessage } from "@/lib/getErrorMessage";
import LoadingText from "@/app/components/common/LoadingText";
import MessageAlert from "@/app/components/common/MessageAlert";
import AiAttendanceForm from "@/app/components/attendance/AiAttendanceForm";
import AiResultCard from "@/app/components/attendance/AiResultCard";

export default function AttendancePage() {
    const [activeSessions, setActiveSessions] = useState<AttendanceSession[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [result, setResult] = useState<AiAttendanceResponse | null>(null);

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchActiveSessions = useCallback(async () => {
        setPageLoading(true);
        setError("");

        try {
            const data = await sessionService.getActiveSession();
            setActiveSessions(data);

            if (data.length > 0) {
                setSelectedSessionId(String(data[0].id));
            }
        } catch (err) {
            setError(getErrorMessage(err, "Failed to fetch active sessions."));
        } finally {
            setPageLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            void fetchActiveSessions();
        }, 0);
        return () => clearTimeout(timer);
    }, [fetchActiveSessions]);

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
        setResult(null);
        setMessage("");
        setError("");

        if (!file) {
            setPreviewUrl("");
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
        event.preventDefault();

        if (!selectedSessionId) {
            setError("Please select an active session.");
            return;
        }

        if (!selectedFile) {
            setError("Please select a face image.");
            return;
        }

        setLoading(true);
        setMessage("");
        setError("");
        setResult(null);

        try {
            const response = await attendanceService.markAiAttendance(
                Number(selectedSessionId),
                selectedFile
            );

            setResult(response);

            if (response.attendanceRecord) {
                setMessage(response.message || "Attendance marked successfully.");
                setError("");
            } else {
                setError(response.message || "Attendance was not saved.");
                setMessage("");
            }
        } catch (err) {
            setError(getErrorMessage(err, "Failed to mark AI attendance."));
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <main className="p-6">
                <LoadingText text="Loading active sessions..." />
            </main>
        );
    }

    return (
        <main className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold">AI Attendance</h1>
                <p className="text-gray-600">
                    Select an active session and upload a student face image.
                </p>
            </div>

            <MessageAlert type="success" message={message} />
            <MessageAlert type="error" message={error} />

            <AiAttendanceForm
                activeSessions={activeSessions}
                selectedSessionId={selectedSessionId}
                selectedFile={selectedFile}
                previewUrl={previewUrl}
                loading={loading}
                onSessionChange={setSelectedSessionId}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
            />

            <AiResultCard result={result} />
        </main>
    );
}