export class RecipientViewModel {

    protected type: string;

    protected valid: boolean;

    constructor() {
        this.valid = false;
    }

    public getType(): string {
        return this.type;
    }

    public isValid(): boolean {
        return this.valid;
    }

    public preValidationFormat(): void {
    }

    public validate(): void {
    }

    public postValidationFormat(): void {
    }
}
