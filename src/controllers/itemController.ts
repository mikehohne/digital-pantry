import { Request, Response, Router } from 'express';
import db from '../models';
import { IItem } from '../models/ItemModel';

export class ItemController {
    public basePath = '/item';
    public router: Router = Router();
    constructor() {
        this.initializeRouters();
    }

    public initializeRouters() {
        this.router.get(`${this.basePath}s/all`, this.getAllItems);
        this.router.get(`${this.basePath}/:id`, this.getItemById);
        this.router.post(this.basePath, this.postItem);
        this.router.put(`${this.basePath}/update`, this.updateItem);
    }

    public getAllItems = async (req: Request, res: Response) => {
        await db.ItemModel.find({}, (err: any, docs: IItem[]) => {
            if (err) {
                throw new Error('Could not grab items');
            }
            res.status(200).json({
                data: docs,
            });
        });
    }

    public getItemById = async (req: Request, res: Response) => {
        const { id } = req.params;
        await db.ItemModel.findById(id, (error: any, doc: IItem) => {
            if (error) {
                return res.status(500).json({
                    error,
                });
            }
            res.status(200).json({
                data: doc,
            });
        });
    }

    public postItem = async (req: Request, res: Response): Promise<any> => {
        const item: IItem = req.body;
        try {
            const newItem = await db.ItemModel.create(item);
            res.status(200).json({
                data: newItem.id,
            });
        } catch (error) {
            res.status(500).json({
                error,
            });
        }
    }

    public updateItem = (req: Request, res: Response): void => {
        const updatedItem = req.body;
        db.ItemModel.findOneAndUpdate(updatedItem.id, updatedItem, (error: any) => {
            if (error) {
                return res.status(500).json({
                    error,
                });
            }
            res.status(200).json({
                success: true,
            });
        });
    }
}

export default ItemController;
