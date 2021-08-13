import {QueryExecResult, SqlValue} from "sql.js";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

const initSqlJs = require('sql.js');

export interface Measurement {
    diastolic: number,
    systolic: number,
    pulse: number,
    arrhythmia: boolean,
    health: number,
    comment: string,
    arm: number,
    measurement_time: number
}
export class Converter {

    public async readFromDB(db: ArrayLike<any>): Promise<Measurement[]> {

        const SQL = await initSqlJs({ locateFile: () => sqlWasm });
        const sqlDb = new SQL.Database(db);
        const sql = "SELECT value FROM serverCache";
        const result = sqlDb.exec(sql);
        const data = result.flatMap((e : QueryExecResult)=>
            e.values.flatMap((v: SqlValue[]) => Converter.uint8arrayToStringMethod(v.map(x => x as number))))

        return data.filter((m: Measurement) => !isNaN(m?.measurement_time));
    }


    private static uint8arrayToStringMethod(myUint8Arr: number[]): Measurement {
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

