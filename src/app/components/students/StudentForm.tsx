"use client"

import {Student, StudentRequest} from "@/types/student";
import {ChangeEvent, ComponentProps, useState} from "react";

interface StudentFormProps{
    onCreateStudent: (data : StudentRequest) => Promise<void>;
}

export default function StudentForm({onCreateStudent}: StudentFormProps){
    const [formData, setFormData] = useState<StudentRequest>({
        studentCode: "",
        name: "",
        classSection: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
        event.preventDefault();

        setLoading(true);

        try {
            await onCreateStudent(formData);

            setFormData({
                studentCode: "",
                name: "",
                classSection: "",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 rounded-xl border bg-white p-5 shadow-sm"
        >
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Register Student
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-900">
                        Student Code
                    </label>
                    <input
                        type="text"
                        name="studentCode"
                        value={formData.studentCode}
                        onChange={handleChange}
                        placeholder="STU001"
                        className="w-full rounded-lg border px-3 py-2 text-gray-900"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-900">
                        Student Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Aung Ko Ko Khant"
                        className="w-full rounded-lg border px-3 py-2 text-gray-900"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-900">
                        Class Section
                    </label>
                    <input
                        type="text"
                        name="classSection"
                        value={formData.classSection}
                        onChange={handleChange}
                        placeholder="Class A"
                        className="w-full rounded-lg border px-3 py-2 text-gray-900"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-4 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
            >
                {loading ? "Saving..." : "Create Student"}
            </button>
        </form>
    );
}