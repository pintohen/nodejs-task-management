import { Document, model, Schema } from 'mongoose';
import ITaskPersistence from '@/persistence/dataschema/ITaskPersistence';

const taskSchema = new Schema(
  {
    domainId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String },
    state: { type: String },
    author: { type: String }
  },
  {
    timestamps: true
  }
);

export default model<ITaskPersistence & Document>('Task', taskSchema);
