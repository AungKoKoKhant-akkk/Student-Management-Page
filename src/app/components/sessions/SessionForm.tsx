"use client"

import {AttendanceSessionRequest} from "@/types/session";
import {ChangeEvent, ComponentProps, useState} from "react";

interface SessionFormProps{
    onStartSession: (data : AttendanceSessionRequest) => Promise<void>;
}

export default function SessionForm({ onStartSession }: SessionFormProps) {
    const [formData, setFormData] = useState({
        classSection: "",
        subjectName: "",
        teacherId: "1",
        lateAfterMinutes: "10",
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

        const requestData: AttendanceSessionRequest = {
            classSection: formData.classSection,
            subjectName: formData.subjectName,
            teacherId: Number(formData.teacherId),
            lateAfterMinutes: Number(formData.lateAfterMinutes),
        };

        setLoading(true);

        try {
            await onStartSession(requestData);

            setFormData({
                classSection: "",
                subjectName: "",
                teacherId: "1",
                lateAfterMinutes: "10",
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
                Start New Session
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-900">
                        Subject Name
                    </label>
                    <input
                        type="text"
                        name="subjectName"
                        value={formData.subjectName}
                        onChange={handleChange}
                        placeholder="Math"
                        className="w-full rounded-lg border px-3 py-2 text-gray-900"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-900">
                        Teacher ID
                    </label>
                    <input
                        type="number"
                        name="teacherId"
                        min={1}
                        value={formData.teacherId}
                        onChange={handleChange}
                        placeholder="1"
                        className="w-full rounded-lg border px-3 py-2 text-gray-900"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-900">
                        Late After Minutes
                    </label>
                    <input
                        type="number"
                        name="lateAfterMinutes"
                        min={0}
                        value={formData.lateAfterMinutes}
                        onChange={handleChange}
                        placeholder="10"
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
                {loading ? "Starting..." : "Start Session"}
            </button>
        </form>
    );
}