import { Router } from 'express';
import { FooController } from '../controllers/foo.controller';

export function registerFooRoutes(router: Router) {
    router
        .get('/api/foos', FooController.getAll)
        .post('/api/foos', FooController.create)
    ;
}
