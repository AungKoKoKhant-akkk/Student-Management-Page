export type SessionStatus = "ACTIVE" | "FINISHED";

export interface AttendanceSession {
    id: number;
    classSection: string;
    subjectName: string;
    teacherId: number;
    sessionDate: string;
    startTime: string;
    endTime: string | null;
    lateAfterMinutes: number;
    status: SessionStatus;
    createdAt: string;
    updatedAt: string | null;
}

export interface AttendanceSessionRequest{
    classSection: string;
    subjectName: string;
    teacherId: number;
    lateAfterMinutes: number;
}