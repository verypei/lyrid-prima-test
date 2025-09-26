import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WORKER_REPOSITORY } from 'src/constants';
import { WorkerDto } from 'src/dto/worker.dto';
import { Worker } from 'src/entity/workers.entity';


@Injectable()
export class WorkersService {
    constructor(
        @Inject(WORKER_REPOSITORY) private readonly workerModel: typeof Worker,
    ) { }

    // Get all workers
    async findAll() {
        try {
            return await this.workerModel.findAll();
        } catch (error) {
            throw error
        }
    }

    // Get one worker by ID
    async findOne(id: number) {
        const worker = await this.workerModel.findByPk(id);
        if (!worker) throw new NotFoundException(`Worker with ID ${id} not found`);
        return worker;
    }

    // Create a new worker
    async create(createWorkerDto: WorkerDto) {
        try {
            const worker = await this.workerModel.create(createWorkerDto);
            return worker && "data created successfully";

        } catch (error) {
            throw new HttpException("create data failed", error.message)
        }
    }

    // Update a worker
    async update(id: number, updateWorkerDto: WorkerDto) {
        try {
            const worker = await this.workerModel.findByPk(id);
            if (!worker) throw new NotFoundException(`Worker with ID ${id} not found`);
            await worker.update(updateWorkerDto);
            return "data edited successfully"
        } catch (error) {
            throw error
        }
    }

    // Delete a worker
    async remove(id: number) {
        try {

            const worker = await this.workerModel.findByPk(id);
            if (!worker) throw new NotFoundException(`Worker with ID ${id} not found`);

            await worker.destroy();
            return "data deleted successfully"
        } catch (error) {
            throw error
        }
    }
}
