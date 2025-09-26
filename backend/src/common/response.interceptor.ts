import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ApiResponse } from "./response.interface";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
        return next.handle().pipe(
            map((data): ApiResponse<T> => {
                if (data && typeof data === "object" && "status" in data && "message" in data) {
                    return {
                        ...data,
                        message: Array.isArray(data.message) ? data.message : [data.message],
                    } as ApiResponse<T>;
                }

                return {
                    status: true,
                    message: ["Success"], // ✅ Always an array
                    data: data ?? ({} as T),
                    error: null,
                };
            })
        );
    }
}
