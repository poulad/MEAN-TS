import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ApiResponse } from '../models/api-response';
import { Foo } from '../models/foo';

@Injectable()
export class FooService {
    constructor(private _http: HttpClient) {
    }

    create(foo: Foo) {
        return this._http
            .post<ApiResponse>('/api/foos', foo)
            .map(apiResp => {
                return apiResp.data as Foo;
            });
    }

    getAll() {
        return this._http
            .get<ApiResponse>('/api/foos')
            .map(apiResp => {
                return apiResp.data as Foo[];
            });
    }
}
