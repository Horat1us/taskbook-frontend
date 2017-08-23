import * as PropTypes from "prop-types";
import {PreLoaderInterface} from "../Preloader/PreLoaderInterface";

export interface LayoutProps {
    preLoader?: PreLoaderInterface,
}

export const LayoutPropTypes = {
    preLoader: PropTypes.shape({
        show: PropTypes.func.isRequired,
        hide: PropTypes.func.isRequired,
    })
};
