import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TenantDocument = Tenant & Document;

@Schema({ timestamps: true })
export class Tenant {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  contactEmail: string;

  @Prop({ unique: true })
  contactPhone: string;

  @Prop({ required: true })
  subscriptionPlan: string;

  @Prop({ type: Date })
  subscriptionStartDate: Date;

  @Prop({ type: Date })
  subscriptionEndDate: Date;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ required: true, unique: true })
  dbConnectionString: string;

  @Prop({ type: Object, default: {} })
  settings: Record<string, any>;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
