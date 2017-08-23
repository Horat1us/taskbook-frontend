import {PreLoader} from "../../src/components";
import {expect} from "chai";

describe("PreLoader animations", () => {
    const element = document.createElement("div");
    element.setAttribute("id", "pre-loader");

    const preLoader = new PreLoader(element);

    it("should add `loaded` class on hiding", async () => {
        await preLoader.hide();
        expect(element.outerHTML).to.be.equal("<div id=\"pre-loader\" class=\"loaded\"></div>");
    });

    it("should remove classes (`loaded`) on showing", async () => {
        expect(element.outerHTML).to.equal("<div id=\"pre-loader\" class=\"loaded\"></div>");
        await preLoader.show();
        expect(element.outerHTML).to.equal("<div id=\"pre-loader\"></div>");
    });
});
