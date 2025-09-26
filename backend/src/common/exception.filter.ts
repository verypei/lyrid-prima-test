import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { ApiResponse } from "./response.interface";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string[] = ["Internal Server Error"];
        let errorCode: string = "INTERNAL_SERVER_ERROR"; // Default error code

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseBody: any = exception.getResponse();

            message = Array.isArray(responseBody.message)
                ? responseBody.message
                : [responseBody.message || exception.message];

            errorCode = HttpStatus[status] || "UNKNOWN_ERROR"; // Convert status to string name
        }

        const errorResponse: ApiResponse<null> = {
            status: false,
            message: message, // ✅ Always an array
            data: null,
            error: errorCode, // ✅ Error now contains HTTP status name
        };

        response.status(status).json(errorResponse);
    }
}
