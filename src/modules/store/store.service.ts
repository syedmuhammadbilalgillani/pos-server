// store.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CreateStoreDto,
  UpdateHoursDto,
  UpdateLayoutDto,
  UpdateSettingsDto,
  UpdateStoreDto,
} from './dto/store.dto';
import { Store } from './schema/store.schema';

@Injectable()
export class StoreService {
  constructor(@Inject('STORE_MODEL') private storeModel: Model<Store>) {}

  async findAll(): Promise<Store[]> {
    return this.storeModel.find().exec();
  }

  async findOne(id: string): Promise<Store | null> {
    return this.storeModel.findById(id).exec();
  }

  // ... existing code ...
  async create(
    tenantId: string,
    createStoreDto: CreateStoreDto,
  ): Promise<Store> {
    const newStore = new this.storeModel({
      ...createStoreDto,
      tenantId: tenantId,
    });
    return newStore.save();
  }
  // ... existing code ...

  async update(
    id: string,
    updateStoreDto: UpdateStoreDto,
  ): Promise<Store | null> {
    return this.storeModel
      .findByIdAndUpdate(id, updateStoreDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Store | null> {
    return this.storeModel.findByIdAndDelete(id).exec();
  }

  async getSettings(id: string): Promise<Record<string, any> | null> {
    const store = await this.storeModel.findById(id).exec();
    return store ? store.settings : null;
  }

  async updateSettings(
    id: string,
    updateSettingsDto: UpdateSettingsDto,
  ): Promise<Store | null> {
    return this.storeModel
      .findByIdAndUpdate(id, { settings: updateSettingsDto }, { new: true })
      .exec();
  }

  // async getStats(id: string): Promise<Record<string, any>> {
  //   // return { message: `Statistics for store ${id}` }; // Placeholder logic

  // }

  // async getHours(id: string): Promise<Record<string, any> | null> {
  //   const store = await this.storeModel.findById(id).exec();
  //   return store ? store['hours'] : null;
  // }

  async updateHours(
    id: string,
    updateHoursDto: UpdateHoursDto,
  ): Promise<Store | null> {
    return this.storeModel
      .findByIdAndUpdate(id, { hours: updateHoursDto }, { new: true })
      .exec();
  }

  // async getLayout(id: string): Promise<Record<string, any> | null> {
  //   const store = await this.storeModel.findById(id).exec();
  //   return store ? (store.layout as Record<string, any>) : null;
  // }

  async updateLayout(
    id: string,
    updateLayoutDto: UpdateLayoutDto,
  ): Promise<Store | null> {
    return this.storeModel
      .findByIdAndUpdate(id, { layout: updateLayoutDto }, { new: true })
      .exec();
  }
}
