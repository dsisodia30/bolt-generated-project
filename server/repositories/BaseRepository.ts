import { Entity, FindManyOptions, FindOneOptions, SaveOptions } from 'typeorm'

    export abstract class BaseRepository<T extends Entity> {
      protected repository;

      constructor() {
        this.repository = getRepository<T>(this.getEntity());
      }

      protected abstract getEntity(): new () => T;

      async find(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options);
      }

      async findOne(id: number | string, options?: FindOneOptions<T>): Promise<T | undefined> {
        return this.repository.findOne(id, options);
      }

      async create(entity: Partial<T>, options?: SaveOptions): Promise<T> {
        return this.repository.save(entity, options);
      }

      async update(id: number | string, entity: Partial<T>, options?: SaveOptions): Promise<T> {
        const existing = await this.repository.findOne(id);
        if (!existing) throw new Error('Entity not found');
        
        return this.repository.save({
          ...existing,
          ...entity
        }, options);
      }

      async delete(id: number | string): Promise<void> {
        const existing = await this.repository.findOne(id);
        if (!existing) throw new Error('Entity not found');
        
        await this.repository.delete(id);
      }
    }
