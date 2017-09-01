// Here will be loaded some very important dependencies
import "babel-polyfill";
import * as chai from "chai";
import * as chaiEnzyme from "chai-enzyme";

const placeholder = () => undefined
require.extensions[".png"] = placeholder;
require.extensions[".jpg"] = placeholder;
require.extensions[".svg"] = placeholder;

chai.use(chaiEnzyme());