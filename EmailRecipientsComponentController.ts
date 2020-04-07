import * as angular from "angular";
import {EmailRecipientViewModel} from "./model/EmailRecipientViewModel";

export class EmailRecipientsComponentController {

    public recipients: Array<string>;

    public isValid: boolean;
    public isDirty: boolean;

    public contacts: Array<any>;

    public recipientsViewModels: Array<EmailRecipientViewModel>;

    public onRecipientAddedCallback: (event) => void;
    public onRecipientRemovedCallback: (event) => void;

    /*@ngInject*/
    constructor() {

    }

    public $onChanges = (changes) => {
        if (changes.recipients) {
            this.recipients = angular.copy(this.recipients);
            this.contacts = [];
            this.recipientsViewModels = [];

            if (this.recipients) {
                this.recipients.forEach((recipient) => {
                    this.recipientsViewModels.push(new EmailRecipientViewModel(recipient));
                })
            }
        }
    };

    public transformEmail(email: string): EmailRecipientViewModel {
        return new EmailRecipientViewModel(email);
    }

    public onItemRemoved($item: EmailRecipientViewModel): void {
        this.onRecipientRemovedCallback({$event: {recipient: $item.getEmail()}});
        this.isValid = this.validate();
    }

    public onItemSelected($item: EmailRecipientViewModel): void {

        this.isDirty = true;
        if (!$item.isValid()) {
            this.isValid = this.validate();
            return;
        }

        if (this.recipients.indexOf($item.getEmail()) !== -1) {
            this.isValid = this.validate();
            return;
        }

        this.onRecipientAddedCallback({$event: {recipient: $item.getEmail()}});
        this.isValid = this.validate();
    }

    private validate(): boolean {
        return this.isDirty && !this.hasInvalidEntries();
    }

    private hasInvalidEntries(): boolean {
        return this.recipientsViewModels.filter((model: EmailRecipientViewModel) => !model.isValid()).length !== 0;
    }
}
