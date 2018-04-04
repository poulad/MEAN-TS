import { NextFunction, Request, Response } from 'express';
import { IFooModel, getFooModel } from '../models/foo.model';
import { ApiResponse } from '../models/api-response';

export class FooController {

    public static async getAll(req: Request, res: Response, next: NextFunction) {
        const Foo = getFooModel();
        let foos: IFooModel[];

        try {
            foos = await Foo.find(null, {__v: 0});
        } catch (e) {
            return next(e);
        }

        const fooDTOs = foos.map(c => c.toDTO());
        const responsePayload = new ApiResponse(null, fooDTOs);

        res.json(responsePayload);
    }

    public static async create(req: Request, res: Response, next: NextFunction) {
        const Foo = getFooModel();
        const foo = new Foo(req.body);

        try {
            await foo.save();
        } catch (e) {
            return next(e);
        }

        const fooDTO = foo.toDTO();
        const responsePayload = new ApiResponse(null, fooDTO);

        res.statusCode = 201;
        res.json(responsePayload);
    }
}
