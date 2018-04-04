import * as mongoose from 'mongoose';

export const FooModelName = 'foo';

export interface IFooModel extends mongoose.Document {
    bar: string;

    toDTO(): any;
}

export function registerFooModel() {
    const FooSchema = new mongoose.Schema({
        bar: {
            type: String,
            required: 'Bar is required',
        },
    });

    FooSchema.methods.toDTO = function () {
        const course: IFooModel = this;

        const dto = course.toObject();

        dto.id = dto._id;
        delete dto._id;
        delete dto.__v;

        return dto;
    };

    mongoose.model(FooModelName, FooSchema);
}

export function getFooModel() {
    return mongoose.model<IFooModel>(FooModelName);
}
