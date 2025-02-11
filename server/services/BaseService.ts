import { BaseService } from './BaseService'

    export abstract class BaseService<T> {
      protected repository;

      constructor(repository) {
        this.repository = repository;
      }

      async findAll(): Promise<T[]> {
        return this.repository.find();
      }

      async findOne(id: number | string): Promise<T | undefined> {
        return this.repository.findOne(id);
      }

      async create(entity: Partial<T>): Promise<T> {
        return this.repository.create(entity);
      }

      async update(id: number | string, entity: Partial<T>): Promise<T> {
        return this.repository.update(id, entity);
      }

      async delete(id: number | string): Promise<void> {
        return this.repository.delete(id);
      }
    }
