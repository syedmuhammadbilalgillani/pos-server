import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SuperAdminDocument = SuperAdmin & Document;

@Schema({ timestamps: true })
export class SuperAdmin {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;
  @Prop()
  passwordSalt: string;
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop()
  lastLogin: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Object, default: {} })
  permissions: Record<string, any>;
}

export const SuperAdminSchema = SchemaFactory.createForClass(SuperAdmin);
