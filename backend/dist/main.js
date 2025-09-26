"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const response_interceptor_1 = require("./common/response.interceptor");
const exception_filter_1 = require("./common/exception.filter");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    const port = 5000;
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.useGlobalFilters(new exception_filter_1.GlobalExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true
    }));
    await app.listen(port, () => {
        console.log(`--------------------------- SERVER RUNNING AT ${port}---------------------------`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map