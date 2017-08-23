//  tslint:disable:no-reference
/// <reference path="./steps.d.ts" />

Feature("Main Page");

Scenario("Main Page opening", async (I) => {

    I.amOnPage("/");
    I.see("Hello, World!");
});
