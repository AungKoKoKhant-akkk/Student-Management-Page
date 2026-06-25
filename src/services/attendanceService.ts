import {
    AiAttendanceResponse,
    AttendanceRecordResponse,
    AttendanceSummaryResponse,
    AttendanceCorrectionRequest
} from "@/types/attendance";
import axiosInstance from "@/lib/axiosInstance";

export const attendanceService = {
    markAiAttendance: async (
        sessionId: number,
        file: File
    ): Promise<AiAttendanceResponse> => {
        const formData = new FormData();
        formData.append("sessionId", String(sessionId));
        formData.append("file", file);

        const response = await axiosInstance.post<AiAttendanceResponse>(
            "/api/attendance/ai-mark",
            formData
        );

        return response.data;
    },

    getAttendanceRecordsBySession: async (
        sessionId: number
    ): Promise<AttendanceRecordResponse[]> => {
        const response = await axiosInstance.get<AttendanceRecordResponse[]>(
            `/api/attendance/session/${sessionId}`
        );

        return response.data;
    },

    getAttendanceSummaryBySession: async (
        sessionId: number
    ): Promise<AttendanceSummaryResponse> => {
        const response = await axiosInstance.get<AttendanceSummaryResponse>(
            `/api/attendance/session/${sessionId}/summary`
        );

        return response.data;
    },

    correctAttendanceRecord: async (
        recordId: number,
        data: AttendanceCorrectionRequest
    ): Promise<AttendanceRecordResponse> => {
        const response = await axiosInstance.put<AttendanceRecordResponse>(
            `/api/attendance/${recordId}/correction`,
            data
        );

        return response.data;
    },
};