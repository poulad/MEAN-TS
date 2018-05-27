import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { FooService } from './foo.service';
import { ApiResponse } from '../models/api-response';
import { Foo } from '../models/foo';

describe('foo service', () => {

    const mockData: Foo[] = [
        {id: '0', bar: 'bar0'},
        {id: '1', bar: 'bar1'},
    ];

    let mockHttpClient: { get: any };

    beforeEach(() => {
        mockHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
        mockHttpClient.get.and.returnValue(of(
            <ApiResponse>{
                ok: true,
                data: mockData
            }
        ));

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {provide: HttpClient, useValue: mockHttpClient},
                FooService
            ]
        });
    });

    it('should return all foos from API response', () => {
        const service = <FooService>TestBed.get(FooService);
        service.getAll().subscribe(
            foos => expect(foos).toEqual(mockData),
            fail
        );
        expect(mockHttpClient.get.calls.count()).toBe(1);
    });

    it('should return an error when web API responds with 404', () => {
        const errorResponse = new HttpErrorResponse({
            status: 404,
            statusText: 'Not Found'
        });
        mockHttpClient.get.and.returnValue(defer(() => Promise.reject(errorResponse)));

        const service = <FooService>TestBed.get(FooService);
        service.getAll().subscribe(
            foos => fail('expected an error'),
            e => {
                console.log(e);
                expect(e.message).toContain('Not Found');
            }
        );
        expect(mockHttpClient.get.calls.count()).toBe(1);
    });
});
