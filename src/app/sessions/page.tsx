
"use client"

import type{
    AttendanceSession,
    AttendanceSessionRequest
} from "@/types/session";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {sessionService} from "@/services/sessionService";
import SessionForm from "@/app/components/sessions/SessionForm";
import SessionTable from "@/app/components/sessions/SessionTable";

function getErrorMessage(error: unknown , fallbackMessage: string){
    if(axios.isAxiosError(error)){
        return error.response?.data?.message || fallbackMessage;
    }
    return "Unexpected error occurred.";
}



function sortSessions(sessions: AttendanceSession[]) {
    return [...sessions].sort((a, b) => {
        if (a.status === "ACTIVE" && b.status !== "ACTIVE") return -1;
        if (a.status !== "ACTIVE" && b.status === "ACTIVE") return 1;

        return b.id - a.id;
    });
}

export default function SessionsPage() {
    const [sessions, setSessions] = useState<AttendanceSession[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchSessions = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await sessionService.getAllSessions();
            setSessions(sortSessions(data));
        } catch (error: unknown) {
            setError(getErrorMessage(error, "Failed to fetch sessions."));
        } finally {
            setLoading(false);
        }
    }, []);

    const handleStartSession = async (data: AttendanceSessionRequest) => {
        setMessage("");
        setError("");

        try {
            const createdSession = await sessionService.startSession(data);

            setSessions((prevSessions) =>
                sortSessions([createdSession, ...prevSessions])
            );

            setMessage("Attendance session started successfully.");
        } catch (error: unknown) {
            setError(getErrorMessage(error, "Failed to start session."));
        }
    };

    const handleFinishSession = async (sessionId: number) => {
        const confirmed = confirm("Are you sure you want to finish this session?");

        if (!confirmed) return;

        setMessage("");
        setError("");

        try {
            const updatedSession = await sessionService.finishSession(sessionId);

            setSessions((prevSessions) => {
                const updatedSessions = prevSessions.map((session) =>
                    session.id === updatedSession.id ? updatedSession : session
                );

                return sortSessions(updatedSessions);
            });

            setMessage("Attendance session finished successfully.");
        } catch (error: unknown) {
            setError(getErrorMessage(error, "Failed to finish session."));
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            void fetchSessions();
        }, 0);
        return () => clearTimeout(timer);
    }, [fetchSessions]);

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    Attendance Sessions
                </h1>

                <p className="mb-6 text-gray-600">
                    Start and finish attendance sessions for each class.
                </p>

                {message && (
                    <div className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
                        {error}
                    </div>
                )}

                <SessionForm onStartSession={handleStartSession} />

                <SessionTable
                    sessions={sessions}
                    loading={loading}
                    onFinishSession={handleFinishSession}
                />
            </div>
        </main>
    );
}
