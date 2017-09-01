import * as React from "react";
import {
    Label, Hint, Form, FormGroup, Input, TextArea, SlowSubmitButton, AutoFocus
}
    from "react-context-form";
import {instantiateTaskModel, TaskPersonalNameMaxLength} from "../../models/TaskModel";

const loadingImage = require("../../../images/three-dots.svg") as string;

export class TaskForm extends React.Component<any, any> {

    public render() {
        return (
            <Form instantiate={instantiateTaskModel} className="card card-body" method="post">
                <h4 className="card-title">Add task</h4>
                <div className="card-text">
                    <FormGroup name="name">
                        <Label>Who will done this</Label>
                        <AutoFocus groupName="name" to="text" onLength={TaskPersonalNameMaxLength}>
                            <Input maxLength={TaskPersonalNameMaxLength} placeholder="Worker" required/>
                        </AutoFocus>
                        <Hint/>
                    </FormGroup>
                    <FormGroup name="text">
                        <Label>What you want to be done</Label>
                        <TextArea placeholder="Description" required/>
                        <Hint/>
                    </FormGroup>
                </div>
                <SlowSubmitButton
                    loadingComponent={<img src={loadingImage} style={{height: "1rem"}}/>}
                    className="btn btn-primary"
                >
                    Send
                </SlowSubmitButton>
            </Form>
        );
    }
}
