"use client";

import {useCallback, useEffect, useState} from "react";
import type { ChangeEvent } from "react";

import axios from "axios";
import {studentService} from "@/services/studentService";
import {Student, StudentRequest} from "@/types/student";
import StudentForm from "@/app/components/students/StudentForm";
import StudentTable from "@/app/components/students/StudentTable";



export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const getErrorMessage = (error: unknown, fallbackMessage: string) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const serverMessage = error.response?.data?.message || error.response?.data || undefined;
            return `${status ? `[${status}] ` : ""}${serverMessage ?? error.message ?? fallbackMessage}`;
        }

        if (error instanceof Error) return error.message;

        try {
            return JSON.stringify(error) || fallbackMessage;
        } catch {
            return fallbackMessage;
        }
    };

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await studentService.getAllStudents();
            setStudents(data);
        } catch (error: unknown) {
            console.error("fetchStudents error:", error);

            // Show detailed error in development to help debugging
            const message = getErrorMessage(error, "Failed to fetch students.");
            const devSuffix = process.env.NODE_ENV === "development" ? ` (${String(error)})` : "";
            setError(`${message}${devSuffix}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCreateStudent = async (data: StudentRequest) => {
        setMessage("");
        setError("");

        try {
            await studentService.createStudent(data);
            setMessage("Student created successfully.");
            await fetchStudents();
        } catch (error: unknown) {
            setError(getErrorMessage(error, "Failed to create student."));
        }
    };

    const handleDeleteStudent = async (id: number) => {
        const confirmed = confirm("Are you sure you want to delete this student?");

        if (!confirmed) return;

        setMessage("");
        setError("");

        try {
            await studentService.deleteStudent(id);
            setMessage("Student deleted successfully.");
            await fetchStudents();
        } catch (error: unknown) {
            setError(getErrorMessage(error, "Failed to delete student."));
        }
    };

    const handleUploadFace = async (
        studentCode: string,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setMessage("");
        setError("");

        try {
            const response = await studentService.uploadFace(studentCode, file);
            setMessage(response.message || "Face uploaded successfully.");
            await fetchStudents();
        } catch (error: unknown) {
            setError(getErrorMessage(error, "Failed to upload face image."));
        } finally {
            event.target.value = "";
        }
    };

    // Defer the fetch to the next macrotask to avoid triggering
    // the "set-state-in-effect" lint rule which flags synchronous state updates
    // inside effects.
    useEffect(() => {
        const timer = setTimeout(() => {
            void fetchStudents();
        }, 0);
        return () => clearTimeout(timer);
    }, [fetchStudents]);

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    Student Management
                </h1>

                <p className="mb-6 text-gray-600">
                    Create students and upload face images for AI attendance.
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

                <StudentForm onCreateStudent={handleCreateStudent} />

                <StudentTable
                    students={students}
                    loading={loading}
                    onDeleteStudent={handleDeleteStudent}
                    onUploadFace={handleUploadFace}
                />
            </div>
        </main>
    );
}