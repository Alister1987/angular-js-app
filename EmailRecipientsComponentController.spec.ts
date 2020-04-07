import * as angular from "angular";
import {module_common_financial} from "../../_financial";
import {EmailRecipientsComponentController} from "./EmailRecipientsComponentController";
import {EmailRecipientViewModel} from "./model/EmailRecipientViewModel";

describe("EmailRecipientsComponentController tests", () => {

    let controller: EmailRecipientsComponentController;
    let rootScope: angular.IRootScopeService;

    beforeEach(() => {
        angular.module("spec", [module_common_financial]);
        angular.mock.module("spec");

        inject((
            $controller: angular.IControllerService,
            $rootScope: angular.IRootScopeService
        ) => {
            rootScope = $rootScope;
            controller = $controller<EmailRecipientsComponentController>(
                "EmailRecipientsComponentController"
            );
        });
    });

    it("$onChanges - updates recipientsViewModels", () => {

        let changes = {
            recipients: ["test123@asd.com", "recipient3@test.com"]
        };

        controller.recipients = ["test123@asd.com", "recipient3@test.com"];
        controller.$onChanges(changes);

        let expectedRecipientsViewModels: Array<EmailRecipientViewModel> = [
            new EmailRecipientViewModel("test123@asd.com"),
            new EmailRecipientViewModel("recipient3@test.com")
        ];

        expect(controller.contacts).toEqual([]);
        expect(controller.recipientsViewModels).toEqual(expectedRecipientsViewModels);

    });

    it("transformEmail - returns expected EmailRecipientViewModel", () => {

        let email: string = "recipient4@test.com";

        let transformedEmail: EmailRecipientViewModel = controller.transformEmail(email);

        expect(transformedEmail).toEqual(new EmailRecipientViewModel(email));

    });

    it("onItemRemoved - calls onRecipientRemovedCallback correctly", () => {

        let mock: boolean = false;
        controller.onRecipientRemovedCallback = (item) => {
            if (item.$event.recipient === "betatest123@email.com") {
                mock = true;
            }
        };

        controller.onItemRemoved(new EmailRecipientViewModel("betatest123@email.com"));

        expect(mock).toBeTruthy();
    });

    it("onItemSelected - calls onRecipientAddedCallback correctly if everything is OK", () => {

        controller.recipients = ["betatest123@email.com"];
        controller.recipientsViewModels = [new EmailRecipientViewModel("betatest123@email.com")];

        let mock: boolean = false;
        controller.onRecipientAddedCallback = (item) => {
            if (item.$event.recipient === "test123@test.com") {
                mock = true;
            }
        };

        controller.onItemSelected(new EmailRecipientViewModel("test123@test.com"));

        expect(mock).toBeTruthy();
    });

    it("onItemSelected - doesnt call onRecipientAddedCallback when item invalid", () => {

        controller.recipients = [];
        controller.recipientsViewModels = [];

        let mock: boolean = false;
        controller.onRecipientAddedCallback = (item) => {
            if (item.$event.recipient === "recipient1@test.com") {
                mock = true;
            }
        };

        controller.onItemSelected(new EmailRecipientViewModel("recipient1@test.com"));

        expect(mock).toBeFalsy();
    });

    it("onItemSelected - doesnt call onRecipientAddedCallback when item already exists", () => {

        controller.recipients = ["betatest123@email.com"];
        controller.recipientsViewModels = [new EmailRecipientViewModel("betatest123@email.com")];

        let mock: boolean = false;
        controller.onRecipientAddedCallback = (item) => {
            if (item.$event.recipient === "betatest123@email.com") {
                mock = true;
            }
        };

        controller.onItemSelected(new EmailRecipientViewModel("betatest123@email.com"));

        expect(mock).toBeFalsy();
    });

});
