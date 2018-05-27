import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FooService } from './foo.service';
import { ApiResponse } from '../models/api-response';
import { Foo } from '../models/foo';

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
        const errorMessage = 'test network error';
        const mockError = new ErrorEvent('Network error', {
            message: errorMessage,
        });

        const service = <FooService>TestBed.get(FooService);
        service.getAll().subscribe(
            foos => fail('expected an error'),
            e => {
                expect(e.message).toEqual('test network error');
            }
        );

        const req = httpTestingController.expectOne('/api/foos');
        expect(req.request.method).toEqual('GET');
    });
});
