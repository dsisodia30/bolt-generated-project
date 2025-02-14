import { Entity, FindManyOptions, FindOneOptions, getRepository, SaveOptions, DeepPartial, DataSource } from 'typeorm';
import { ExtendedBaseEntity } from '../entities/BaseEntity';
import { AppDataSource } from '../AppDataSource';


export abstract class BaseRepository<T extends ExtendedBaseEntity> {
  protected repository;

  constructor() {
    this.repository = AppDataSource.getRepository(this.getEntity());
  }

  protected abstract getEntity(): new () => T;

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(id: number | string, options?: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne({where: {id}, ...options} as FindOneOptions<T>);
  }

  async create(entity: DeepPartial<T>, options?: SaveOptions): Promise<T> {
    return this.repository.save(entity as DeepPartial<T>, options);
  }

  async update(id: number | string, entity: DeepPartial<T>, options?: SaveOptions): Promise<T> {
    const existing = await this.findOne(id);
    if (!existing) throw new Error('Entity not found');
    
    return this.repository.save({
      ...existing,
      ...entity
    } as DeepPartial<T>, options);
  }

  async delete(id: number | string): Promise<void> {
    const existing = await this.findOne(id);
    if (!existing) throw new Error('Entity not found');
    
    await this.repository.delete(id);
  }
}
