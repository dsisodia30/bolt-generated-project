import { Request, Response, NextFunction } from 'express'
    import { BaseService } from './BaseService'

    export abstract class BaseController<T> {
      protected service;

      constructor(service: BaseService<T>) {
        this.service = service;
      }

      async getAll(req: Request, res: Response): Promise<void> {
        try {
          const result = await this.service.findAll();
          res.json(result);
        } catch (error) {
          this.handleError(res, error);
        }
      }

      async getOne(req: Request, res: Response): Promise<void> {
        try {
          const id = Number(req.params.id);
          const result = await this.service.findOne(id);
          if (!result) {
            res.status(404).json({ message: 'Entity not found' });
            return;
          }
          res.json(result);
        } catch (error) {
          this.handleError(res, error);
        }
      }

      async create(req: Request, res: Response): Promise<void> {
        try {
          const result = await this.service.create(req.body);
          res.status(201).json(result);
        } catch (error) {
          this.handleError(res, error);
        }
      }

      async update(req: Request, res: Response): Promise<void> {
        try {
          const id = Number(req.params.id);
          const result = await this.service.update(id, req.body);
          res.json(result);
        } catch (error) {
          this.handleError(res, error);
        }
      }

      async delete(req: Request, res: Response): Promise<void> {
        try {
          const id = Number(req.params.id);
          await this.service.delete(id);
          res.status(204).json();
        } catch (error) {
          this.handleError(res, error);
        }
      }

      protected handleError(res: Response, error: Error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }

      get router() {
        const router = require('express').Router();
        router.get('/', this.getAll.bind(this));
        router.get('/:id', this.getOne.bind(this));
        router.post('/', this.create.bind(this));
        router.put('/:id', this.update.bind(this));
        router.delete('/:id', this.delete.bind(this));
        return router;
      }
    }
