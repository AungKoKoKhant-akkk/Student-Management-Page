export type AttendanceStatus = "PRESENT" | "LATE" | "ABSENT" | "EXCUSED";

export interface AttendanceRecordResponse {
    id: number;
    sessionId: number;
    studentId: number;
    studentCode: string;
    studentName: string;
    classSection: string;
    status: AttendanceStatus;
    checkInTime: string | null;
    confidenceScore: number | null;
    markedBy: string;
    correctedBy: string | null;
    correctionReason: string | null;
    correctedAt: string | null;
    createdAt: string;
    updatedAt: string | null;
}

export interface AiAttendanceResponse {
    recognized: boolean;
    studentCode: string | null;
    confidence: number | null;
    distance: number | null;
    message: string;
    attendanceRecord: AttendanceRecordResponse | null;
}

export interface AttendanceSummaryResponse {
    sessionId: number;
    classSection: string;
    subjectName: string;
    totalStudents: number;
    presentCount: number;
    lateCount: number;
    absentCount: number;
    excusedCount?: number;
    records: AttendanceRecordResponse[];
}

export interface AttendanceCorrectionRequest {
    status: AttendanceStatus;
    correctedBy: string;
    correctionReason: string;
}