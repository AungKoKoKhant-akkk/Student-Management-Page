"use client";

import { useCallback, useEffect, useState } from "react";



import { attendanceService } from "@/services/attendanceService";
import { sessionService } from "@/services/sessionService";

import type {
    AttendanceRecordResponse, AttendanceStatus,
    AttendanceSummaryResponse,
} from "@/types/attendance";
import type { AttendanceSession } from "@/types/session";

import { getErrorMessage } from "@/lib/getErrorMessage";
import LoadingText from "@/app/components/common/LoadingText";
import MessageAlert from "@/app/components/common/MessageAlert";
import AttendanceSessionSelect from "@/app/components/attendance/AttendanceSessionSelect";
import AttendanceSummaryCards from "@/app/components/attendance/AttendanceSummaryCards";
import AttendanceRecordTable from "@/app/components/attendance/AttendanceRecordTable";

export default function AttendanceRecordsPage() {
    const [sessions, setSessions] = useState<AttendanceSession[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState("");

    const [records, setRecords] = useState<AttendanceRecordResponse[]>([]);
    const [summary, setSummary] = useState<AttendanceSummaryResponse | null>(
        null
    );

    const [pageLoading, setPageLoading] = useState(true);
    const [recordsLoading, setRecordsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchSessions = useCallback(async () => {
        setPageLoading(true);
        setError("");

        try {
            const data = await sessionService.getAllSessions();
            setSessions(data);

            if (data.length > 0) {
                setSelectedSessionId(String(data[0].id));
            }
        } catch (err) {
            setError(getErrorMessage(err, "Failed to fetch sessions."));
        } finally {
            setPageLoading(false);
        }
    }, []);

    const fetchAttendanceData = useCallback(async (sessionId: string) => {
        if (!sessionId) {
            setRecords([]);
            setSummary(null);
            return;
        }

        setRecordsLoading(true);
        setError("");

        try {
            const numericSessionId = Number(sessionId);

            const [recordData, summaryData] = await Promise.all([
                attendanceService.getAttendanceRecordsBySession(numericSessionId),
                attendanceService.getAttendanceSummaryBySession(numericSessionId),
            ]);

            setRecords(recordData);
            setSummary(summaryData);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to fetch attendance records."));
            setRecords([]);
            setSummary(null);
        } finally {
            setRecordsLoading(false);
        }
    }, []);

    const handleCorrectRecord = async (
        recordId: number,
        status: AttendanceStatus,
        reason: string
    ) => {
        setError("");

        try {
            await attendanceService.correctAttendanceRecord(recordId, {
                status,
                correctedBy: "Teacher",
                correctionReason: reason,
            });

            if (selectedSessionId) {
                await fetchAttendanceData(selectedSessionId);
            }
        } catch (err) {
            setError(getErrorMessage(err, "Failed to correct attendance record."));
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            void fetchSessions();
        }, 0);
        return () => clearTimeout(timer);
    }, [fetchSessions]);

    useEffect(() => {
        const timer= setTimeout(()=>{
            if(selectedSessionId){
                void fetchAttendanceData(selectedSessionId);
            }
        })
            return () => clearTimeout(timer);
    }, [selectedSessionId, fetchAttendanceData]);

    if (pageLoading) {
        return (
            <main className="p-6">
                <LoadingText text="Loading sessions..." />
            </main>
        );
    }

    return (
        <main className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold">Attendance Records</h1>
                <p className="text-gray-600">
                    Select a session to view attendance records and summary.
                </p>
            </div>

            <MessageAlert type="error" message={error} />

            <AttendanceSessionSelect
                sessions={sessions}
                selectedSessionId={selectedSessionId}
                onChange={setSelectedSessionId}
            />

            {recordsLoading ? (
                <LoadingText text="Loading attendance records..." />
            ) : (
                <>
                    <AttendanceSummaryCards summary={summary} />

                    <section className="space-y-3">
                        <h2 className="text-xl font-semibold">Record List</h2>
                        <AttendanceRecordTable records={records} onCorrectRecord={handleCorrectRecord} />
                    </section>
                </>
            )}
        </main>
    );
}