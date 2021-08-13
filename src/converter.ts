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

    public async openDB(db: ArrayLike<any>): Promise<Measurement[]> {

        const SQL = await initSqlJs({ locateFile: () => sqlWasm });
        const sqlDb = new SQL.Database(db);
        const sql = "SELECT value FROM serverCache";
        const result = sqlDb.exec(sql);
        return result.flatMap((e : QueryExecResult)=>
            e.values.flatMap((v: SqlValue[]) => this.uint8arrayToStringMethod(v.map(x => x as number))));
    }


    private uint8arrayToStringMethod(myUint8Arr: number[]): string {
        let inner = myUint8Arr[0];
        // @ts-ignore
        return String.fromCodePoint(...inner);
    }
}

