import {AbstractComponentOptions} from "../../../shared/components/AbstractComponentOptions";
import {EmailRecipientsComponentController} from "./EmailRecipientsComponentController";

export class EmailRecipientsComponent extends AbstractComponentOptions {

    constructor() {
        super("./components/email-recipients/email-recipients.tpl.html", EmailRecipientsComponentController);
        this.bindings = {
            recipients: "<",
            onRecipientAddedCallback: "&",
            onRecipientRemovedCallback: "&"
        }
    }
}
