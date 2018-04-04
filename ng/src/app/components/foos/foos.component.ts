import {Component, OnInit} from '@angular/core';
import {FooService} from '../../services/foo.service';
import {getErrorMessage} from '../../helpers/helpers';
import {Foo} from '../../models/foo';

@Component({
    selector: 'app-foos',
    templateUrl: './foos.component.html'
})
export class FoosComponent implements OnInit {
    foos: Foo[];

    isWaitingForResponse: boolean;

    error?: string;

    constructor(
        private _fooService: FooService
    ) {
    }

    ngOnInit() {
        this.getAllFoos();
    }

    getAllFoos() {
        this.isWaitingForResponse = true;
        this.error = null;
        this._fooService
            .getAll()
            .subscribe(
                foos => {
                    this.foos = foos;
                    this.isWaitingForResponse = false;
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isWaitingForResponse = false;
                }
            );
    }

    onFooAdded(foo: Foo) {
        this.foos.push(foo);
    }
}
