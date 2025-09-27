import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    NotFoundException,
    UseInterceptors,
    UseGuards,
    UploadedFile,
    HttpException,
    HttpStatus,
    Patch
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkerDto } from 'src/dto/worker.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/guard/authGuard';

@UseGuards(JwtAuthGuard)
@Controller()
export class WorkersController {
    constructor(private readonly workersService: WorkersService) { }

    // Get all workers
    @Get('workers')
    async findAll() {
        try {
            return await this.workersService.findAll();
        } catch (error) {
            throw error
        }
    }

    // Get one worker by ID
    @Get('worker/:id')
    async findOne(@Param('id') id: number) {
        const worker = await this.workersService.findOne(id);
        if (!worker) {
            throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        return worker;
    }

    // Create a new worker
    @Post('worker')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './src/assets', // folder to save uploaded files
                filename: (req, file, callback) => {
                    // Customize file name: originalname + timestamp + extension
                    const name = file.originalname.split('.')[0];
                    const fileExt = extname(file.originalname);
                    const timestamp = Date.now();
                    callback(null, `${name}-${timestamp}${fileExt}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg)$/)) {
                    return callback(new Error('Only image files with ext jpg or jpeg are allowed!'), false);
                }
                callback(null, true);
            },
            limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
        }),
    )
    async create(@Body() createWorkerDto: WorkerDto, @UploadedFile() file: Express.Multer.File) {
        try {
            if (!file) {
                throw new HttpException("image must be filled", HttpStatus.BAD_REQUEST)
            }
            createWorkerDto.profile = file.filename
            return this.workersService.create(createWorkerDto)
        } catch (error) {
            throw error;
        }
    }

    // Update a worker by ID
    @Patch('worker/:id')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './src/assets', // folder to save uploaded files
                filename: (req, file, callback) => {
                    // Customize file name: originalname + timestamp + extension
                    const name = file.originalname.split('.')[0];
                    const fileExt = extname(file.originalname);
                    const timestamp = Date.now();
                    callback(null, `${name}-${timestamp}${fileExt}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg)$/)) {
                    return callback(new Error('Only image files with ext jpg or jpeg are allowed!'), false);
                }
                callback(null, true);
            },
            limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
        }),
    )
    async update(@Param('id') id: number, @Body() updateWorkerDto: WorkerDto, @UploadedFile() file: Express.Multer.File) {
        const exist = await this.findOne(id)
        if (!exist) {
            throw new HttpException("data not found", HttpStatus.NOT_FOUND)
        }
        if (file) {
            updateWorkerDto.profile = file.filename
        }
        const updated = await this.workersService.update(id, updateWorkerDto);
        if (!updated) {
            throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        return updated;
    }

    // Delete a worker by ID
    @Delete('worker/:id')
    async remove(@Param('id') id: number) {
        const deleted = await this.workersService.remove(id);
        if (!deleted) {
            throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        return { message: `Worker ${id} deleted successfully` };
    }
}
