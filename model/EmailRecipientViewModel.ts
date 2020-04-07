import {RecipientViewModel} from "./RecipientViewModel";

export class EmailRecipientViewModel extends RecipientViewModel {

    private readonly email: string;

    constructor(email: string) {
        super();
        this.email = email;

        this.preValidationFormat();
        this.validate();
        this.postValidationFormat();
    }

    public getEmail(): string {
        return this.email;
    }

    public preValidationFormat(): void {

    }

    public validate(): void {
        super.validate();

        if (this.email === undefined || this.email === "") {
            this.valid = false;
        }

        let pattern = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:" +
            "[a-zA-Z0-9-]*[a-zA-Z0-9])?)+[\.][a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";

        this.valid = new RegExp(pattern).test(this.email);
    }

    public postValidationFormat(): void {
        if (!this.isValid()) {
            return;
        }
    }
}
