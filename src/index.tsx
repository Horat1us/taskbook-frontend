import "../styles/main.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import {PreLoader, Layout} from "./components";

const container = document.getElementById("content-overlay");
const preLoaderElement = document.getElementById("pre-loader");

if (!container) {
    // tslint:disable-next-line
    console.error("Can not found element for mounting Layout!");
} else {
    ReactDOM.render(
        <Layout preLoader={new PreLoader(preLoaderElement)}/>,
        container
    );
}
