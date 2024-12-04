import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: DatabaseService) {}

  async createTask(data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  async updateTask(id: string, data: UpdateTaskDto): Promise<Task> {
    await this.getTaskById(id);
    return this.prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id: string): Promise<void> {
    await this.getTaskById(id);
    await this.prisma.task.delete({ where: { id } });
  }
}
