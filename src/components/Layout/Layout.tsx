import * as React from "react";
import {LayoutProps, LayoutPropTypes} from "./LayoutProps"
import {TaskForm} from "../Form/TaskForm";

export class Layout extends React.Component<LayoutProps, undefined> {
    public static propTypes = LayoutPropTypes;

    constructor(props) {
        super(props);
    }

    public async componentDidMount() {
        this.props.preLoader && await this.props.preLoader.hide();
    }

    public async componentWillUnmount() {
        this.props.preLoader && await this.props.preLoader.show();
    }

    public render() {
        return (
            <div className="container">
                <TaskForm/>
            </div>
        );
    }
}
