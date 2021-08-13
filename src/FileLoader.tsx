import React from "react";
import {Converter, Measurement} from "./converter";

export interface MainProps {
    publish: (data: Measurement[]) => void;
}

interface MainState {
    selectedFile: string,
    measurements: Measurement[]
}

export class FileLoader extends React.Component<any, any> {

    converter: Converter
    state: MainState


    constructor(props: MainProps) {
        super(props);
        this.state = {selectedFile: "", measurements: []};
        this.converter = new Converter();
    }

    render() {
        return (
            <div>
                <h1>Measurement extractor</h1>
                <p>
                    <input type="file" name="file" onChange= {event => this.changeHandler(event)}/>
                </p>
                Loaded {this.state.measurements.length} measurements
            </div>
        )
    }

    changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({...this.state, selectedFile: event.target.value});
        const file = event?.target?.files?.item(0);
        file?.arrayBuffer().then((buf) =>
            this.converter.readFromDB(new Uint8Array(buf))
                .then(res => this.setState({...this.state, measurements: res}))
                .then(() => this.props.publish(this.state.measurements))
        );
    }
}