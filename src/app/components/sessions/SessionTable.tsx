"use client"

import {AttendanceSession} from "@/types/session";
import axios from "axios";

interface SessionTableProps {
    sessions: AttendanceSession[];
    loading: boolean;
    onFinishSession: (sessionId: number) => Promise<void>;
}

function formatTime(time: string | null) {
    if (!time) {
        return "-";
    }

    return time.split(".")[0];
}




export default function SessionTable({
                                         sessions,
                                         loading,
                                         onFinishSession,
                                     }: SessionTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="border-b p-5">
                <h2 className="text-lg font-semibold text-gray-900">Session List</h2>
            </div>

            {loading ? (
                <p className="p-5 text-gray-900">Loading sessions...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3 text-gray-900">Session ID</th>
                            <th className="p-3 text-gray-900">Class</th>
                            <th className="p-3 text-gray-900">Subject</th>
                            <th className="p-3 text-gray-900">Date</th>
                            <th className="p-3 text-gray-900">Start</th>
                            <th className="p-3 text-gray-900">End</th>
                            <th className="p-3 text-gray-900">Late Rule</th>
                            <th className="p-3 text-gray-900">Status</th>
                            <th className="p-3 text-gray-900">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {sessions.length === 0 && (
                            <tr>
                                <td colSpan={9} className="p-5 text-center text-gray-900">
                                    No sessions found.
                                </td>
                            </tr>
                        )}

                        {sessions.map((session) => (
                            <tr
                                key={
                                    session.id ??
                                    `${session.classSection}-${session.subjectName}-${session.startTime}`
                                }
                                className="border-t"
                            >
                                <td className="p-3 text-gray-900">{session.id}</td>

                                <td className="p-3 text-gray-900">
                                    {session.classSection}
                                </td>

                                <td className="p-3 text-gray-900">
                                    {session.subjectName}
                                </td>

                                <td className="p-3 text-gray-900">
                                    {session.sessionDate}
                                </td>

                                <td className="p-3 text-gray-900">
                                    {formatTime(session.startTime)}
                                </td>

                                <td className="p-3 text-gray-900">
                                    {formatTime(session.endTime)}
                                </td>

                                <td className="p-3 text-gray-900">
                                    {session.lateAfterMinutes} min
                                </td>

                                <td className="p-3">
                                    {session.status === "ACTIVE" ? (
                                        <span className="font-medium text-green-600">
                        ACTIVE
                      </span>
                                    ) : (
                                        <span className="font-medium text-gray-600">
                        FINISHED
                      </span>
                                    )}
                                </td>

                                <td className="p-3">
                                    {session.status === "ACTIVE" ? (
                                        <button
                                            type="button"
                                            onClick={() => onFinishSession(session.id)}
                                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                        >
                                            Finish
                                        </button>
                                    ) : (
                                        <span className="text-gray-500">Done</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}