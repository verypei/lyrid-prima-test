import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
export declare class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
