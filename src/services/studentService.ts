import type{
    FaceUploadResponse,
    Student,
    StudentRequest
} from "@/types/student";

import axiosInstance from "@/lib/axiosInstance";

export const studentService = {
    getAllStudents : async () : Promise<Student[]> =>{
        const response = await axiosInstance.get("/api/students");
        return response.data;
    },

    createStudent: async (data: StudentRequest): Promise<Student> =>{
        const response = await axiosInstance.post<Student>("/api/students", data);
        return response.data;
    },

    deleteStudent: async(id: number): Promise<void> =>{
        await axiosInstance.delete(`/api/students/${id}`);
    },

    uploadFace: async(
        studentCode: string,
        file: File
    ): Promise<FaceUploadResponse> => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosInstance.post(`/api/students/${studentCode}/face`, formData);
        return response.data;
    }
}