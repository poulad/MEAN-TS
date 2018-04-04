import {HttpErrorResponse} from '@angular/common/http';

export function getErrorMessage(e: any): string {
    if (!e) {
        return 'ERROR';
    }
    if (e instanceof HttpErrorResponse) {
        return e.error.error || e.statusText;
    } else {
        return e.toString();
    }
}
