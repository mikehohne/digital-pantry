import mongoose, { Document, Schema } from 'mongoose';
import Item from '../classes/Item';

export interface IItem extends Document {
    name: string;
    desc: string;
    expirationDate: Date;
    daysTillExpired: number;
    dateCreated: Date;
    dateModified: Date;
    weight: number;
    calories: number;
}

const ItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    desc: String,
    expirationDate: Date,
    daysTillExpired: Number,
    dateCreated: { type: Date, default: new Date() },
    dateModified: Date,
    weight: Number,
    calories: Number,
});

const model = mongoose.model<IItem>('Item', ItemSchema);

export default model;
