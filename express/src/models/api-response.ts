export class ApiResponse {
    ok: boolean;

    data?: any;

    error?: string;

    constructor(error: string, data?: any) {
        if (error === null || error === undefined) {
            this.ok = true;
            this.data = data;
        } else {
            this.ok = false;
            this.error = error;
        }
    }
}
