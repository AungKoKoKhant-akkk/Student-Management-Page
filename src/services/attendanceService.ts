import {AiAttendanceResponse} from "@/types/attendance";
import axiosInstance from "@/lib/axiosInstance";

export const attendanceService = {
    markAiAttendance : async(
        sessionId : number,
        file : File
    ):Promise<AiAttendanceResponse> => {
        const formData = new FormData();

        formData.append("sessionId", String(sessionId));
        formData.append("file", file);

        const response = await axiosInstance.post<AiAttendanceResponse>(
            "/api/attendance/ai-mark",
            formData
        );

        return response.data;
    },

}