export interface Student {
    id: number;
    studentCode: string;
    name: string;
    classSection: string;
    faceImagePath: string | null;
    faceRegistered: boolean;
    createdAt: string;
    updatedAt: string;

}

export interface StudentRequest {
    studentCode: string;
    name: string;
    classSection: string;
}

export interface FaceUploadResponse {
    studentCode: string;
    studentName: string;
    faceImagePath: string;
    faceRegistered: boolean;
    message: string;
}