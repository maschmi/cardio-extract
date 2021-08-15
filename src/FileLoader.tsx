import React from "react";
import initSqlJs, {QueryExecResult, SqlValue} from "sql.js";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import {Measurement} from "./Models";

export interface MainProps {
    publish: (data: Measurement[]) => void;
}

interface MainState {
    selectedFile: string,
    measurements: Measurement[]
}


export class FileLoader extends React.Component<any, any> {

    state: MainState

    constructor(props: MainProps) {
        super(props);
        this.state = {selectedFile: "", measurements: []};
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
            this.readFromDB(new Uint8Array(buf))
                .then(res => this.setState({...this.state, measurements: res}))
                .then(() => this.props.publish(this.state.measurements))
        );
    }

    async readFromDB(db: ArrayLike<any>): Promise<Measurement[]> {

        const SQL = await initSqlJs({ locateFile: () => sqlWasm });
        const sqlDb = new SQL.Database(db);
        const sql = "SELECT value FROM serverCache";
        const result = sqlDb.exec(sql);
        const data = result.flatMap((e : QueryExecResult)=>
            e.values.flatMap((v: SqlValue[]) => this.mapToModel(v.map(x => x as number))))

        return data.filter((m: Measurement) => !isNaN(m?.measurement_time));
    }


    mapToModel(myUint8Arr: number[]): Measurement {
        let inner = myUint8Arr[0];
        // @ts-ignore
        const content = String.fromCodePoint(...inner);
        try {
            return JSON.parse(content) as Measurement
        } catch {
            return {} as Measurement
        }
    }

}
