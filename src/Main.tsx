import React from "react";
import {Converter, Measurement} from "./converter";

interface MainProps {}

interface MainState {
    selectedFile: string,
    measurements: Measurement[]
}
export class Main extends React.Component<any, any> {

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
                {this.state.measurements}
            </div>
        )
    }

    changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        console.log("File")
        this.setState({...this.state, selectedFile: event.target.value});
        console.log(this.state.selectedFile);
        const file = event?.target?.files?.item(0);
        file?.arrayBuffer().then((buf) =>
            this.converter.openDB(new Uint8Array(buf))
                .then(res => {
                    console.log(res);
                    return res;
                })
                .then(res => this.setState({...this.state, measurements: res}))

        );
    }
}