export interface ApiResponse<T> {
    status: boolean;
    message: string[]; // ✅ Updated: Now always an array
    data?: T | null;
    error?: any;
}
