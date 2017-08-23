import {sleep} from "../../helpers/sleep";
import {PreLoaderInterface} from "./PreLoaderInterface";

const preLoaderAnimationDuration = 500;

/**
 * This class represents animations on plain DOM element because
 * pre-loader will be rendered before loading js bundle
 */
export class PreLoader implements PreLoaderInterface {
    private loader: HTMLElement;

    constructor(element: HTMLElement) {
        this.loader = element;
    }

    public async hide(): Promise<any> {
        await sleep(preLoaderAnimationDuration);

        this.loader.setAttribute("class", "loaded");
        return this;
    }

    public async show(): Promise<any> {
        this.loader.removeAttribute("class");

        return this;
    }
}
