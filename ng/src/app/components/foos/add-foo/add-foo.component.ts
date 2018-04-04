import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FooService} from '../../../services/foo.service';
import {Foo} from '../../../models/foo';
import {getErrorMessage} from '../../../helpers/helpers';

@Component({
    selector: 'app-add-foo',
    templateUrl: './add-foo.component.html'
})
export class AddFooComponent {
    @Output() fooAdded = new EventEmitter<Foo>();

    foo = new Foo();

    error?: string;

    isWaitingForResponse = false;

    constructor(
        private _fooService: FooService
    ) {
    }

    createFoo(form: NgForm) {
        this.isWaitingForResponse = true;
        this.error = null;

        this._fooService
            .create(this.foo)
            .subscribe(
                newFoo => {
                    this.isWaitingForResponse = false;
                    form.reset(new Foo());
                    this.fooAdded.emit(newFoo);
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isWaitingForResponse = false;
                }
            );
    }
}
