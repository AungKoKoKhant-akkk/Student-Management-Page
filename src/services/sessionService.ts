import axiosInstance from "@/lib/axiosInstance";
import type {
    AttendanceSession,
    AttendanceSessionRequest
} from "@/types/session";

export const sessionService ={
    getAllSessions : async() : Promise<AttendanceSession[]> => {
        const response = await axiosInstance.get<AttendanceSession[]>("/api/sessions");
        return response.data;
    },

    getActiveSession : async () : Promise<AttendanceSession[]> => {
        const response = await axiosInstance.get<AttendanceSession[]>("/api/sessions/active");
        return response.data;
    },

    startSession : async (
        data: AttendanceSessionRequest,
    ):Promise<AttendanceSession> =>{
        const response  = await axiosInstance.post<AttendanceSession>("/api/sessions/start", data);
        return response.data;
    },

    finishSession : async (
        sessionId : number,
    ): Promise<AttendanceSession>=>{
        const response  = await axiosInstance.post<AttendanceSession>(`/api/sessions/${sessionId}/finish`);
        return response.data;
    }

};