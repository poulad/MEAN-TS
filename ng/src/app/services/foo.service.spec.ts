import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FooService } from './foo.service';
import { ApiResponse } from '../models/api-response';
import { Foo } from '../models/foo';
import { HttpErrorResponse } from '@angular/common/http';

describe('foo service', () => {

    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FooService]
        });
        httpTestingController = TestBed.get(HttpTestingController);
    });
    afterEach(() => {
        httpTestingController.verify();
    });

    it('#create should return the new foo from API response', () => {
        const foo: Foo = {id: '0', bar: 'bar0'};
        const service = <FooService>TestBed.get(FooService);

        service.create({id: '0', bar: 'bar0'}).subscribe(
            newFoo => expect(newFoo).toEqual(foo),
            fail
        );

        const req = httpTestingController.expectOne('/api/foos');
        expect(req.request.method).toEqual('POST');

        req.flush(<ApiResponse> {ok: true, data: foo});
    });

    it('#create should return an error in case of a network failure', () => {
        const fooService: FooService = TestBed.get(FooService);

        fooService.create({id: '1', bar: 'bar1'}).subscribe(
            newFoo => fail('expected an error'),
            (e: HttpErrorResponse) => expect(e.error.message).toContain('test network error')
        );

        const req = httpTestingController.expectOne('/api/foos');
        expect(req.request.method).toBe('POST');

        req.error(new ErrorEvent('Network error', {message: 'test network error'}));
    });

    it('#getAll should return all foos from API response', () => {
        const testData: Foo[] = [
            {id: '0', bar: 'bar0'},
            {id: '1', bar: 'bar1'},
        ];
        const service = <FooService>TestBed.get(FooService);

        service.getAll().subscribe(
            foos => expect(foos).toEqual(testData),
            fail
        );

        const req = httpTestingController.expectOne('/api/foos');
        expect(req.request.method).toEqual('GET');

        req.flush(<ApiResponse> {ok: true, data: testData});
    });

    it('#getAll should return an error when web API responds with 404', () => {
        const service = <FooService>TestBed.get(FooService);
        service.getAll().subscribe(
            foos => fail('expected an error'),
            (e: HttpErrorResponse) => expect(e.error.message).toEqual('test network error')
        );

        const req = httpTestingController.expectOne('/api/foos');
        expect(req.request.method).toEqual('GET');

        req.error(new ErrorEvent('Network error', {message: 'test network error'}));
    });
});
