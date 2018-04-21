import * as mongoose from 'mongoose';
import { loadAppConfigurations } from './app-config';
import { registerFooModel } from '../models/foo.model';

export async function configureMongoose() {
    const appConfig = loadAppConfigurations();
    const db = await mongoose.connect(appConfig.db);

    registerFooModel();

    return db;
}
