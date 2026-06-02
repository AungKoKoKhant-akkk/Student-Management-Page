import {Student} from "@/types/student";
import {ChangeEvent} from "react";

interface StudentTableProps {
    students: Student[];
    loading: boolean;
    onDeleteStudent: (id: number) => Promise<void>;
    onUploadFace: (
        studentCode : string,
        event : ChangeEvent<HTMLInputElement>
    ) => Promise<void>;
}

export default function StudentTable(
    {
        students,
        loading,
        onDeleteStudent,
        onUploadFace,
    }: StudentTableProps
){
    return(
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="border-b p-5">
                <h2 className="text-lg font-semibold text-gray-900">Student List</h2>
            </div>

            {loading ? (
                <p className="p-5 text-gray-900">Loading students...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3 text-gray-900">Code</th>
                            <th className="p-3 text-gray-900">Name</th>
                            <th className="p-3 text-gray-900">Class</th>
                            <th className="p-3 text-gray-900">Face</th>
                            <th className="p-3 text-gray-900">Upload Face</th>
                            <th className="p-3 text-gray-900">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {students.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-5 text-center text-gray-900">
                                    No students found.
                                </td>
                            </tr>
                        )}

                        {students.map((student) => (
                            <tr key={student.id ?? student.studentCode} className="border-t">
                                <td className="p-3 font-medium text-gray-900">
                                    {student.studentCode}
                                </td>

                                <td className="p-3 text-gray-900">{student.name}</td>

                                <td className="p-3 text-gray-900">
                                    {student.classSection}
                                </td>

                                <td className="p-3">
                                    {student.faceRegistered ? (
                                        <span className="font-medium text-green-600">
                        Registered
                      </span>
                                    ) : (
                                        <span className="font-medium text-red-600">
                        Not Registered
                      </span>
                                    )}
                                </td>

                                <td className="p-3 text-gray-900">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) =>
                                            onUploadFace(student.studentCode, event)
                                        }
                                    />
                                </td>

                                <td className="p-3">
                                    <button
                                        onClick={() => onDeleteStudent(student.id)}
                                        className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}



