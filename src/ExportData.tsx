import {Measurement} from "./Models";
import "./tailwind.css"
export interface ExportProps {
    data: Measurement[]
}
type MeasurementWithoutTime = Omit<Measurement, 'measurement_time'>;
interface DateTimedMeasurement extends MeasurementWithoutTime {
    date: string
    time: string,
}

function convertToReadableTimestamps(data: Measurement[]): DateTimedMeasurement[] {
    return data.map((m: Measurement) => {
        const date = new Date();
        date.setTime(m.measurement_time);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            diastolic: m.diastolic,
            systolic: m.systolic,
            pulse: m.pulse,
            comment: m.comment,
            health: m.health,
            arm: m.arm,
            arrhythmia: m.arrhythmia
        } as DateTimedMeasurement
    });
}

function exportData(data: Measurement[]) {
    const convertedMeasurements = convertToReadableTimestamps(data);
    const header = Object.keys(convertedMeasurements[0]) as (keyof DateTimedMeasurement)[];
    const converter = (key: string, value: any) =>{
           return value === null ? '' : value;
    }

    const csv = convertedMeasurements.map((row: DateTimedMeasurement) =>
        header.map(column => JSON.stringify(row[column], (_, value) => converter(column, value))).join(',')
    )
    csv.unshift(header.join(','));
    const blob = new Blob([csv.join('\n')], {type: 'text/csv'})
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'measurements.csv');
    link.click();
    link.remove();
}
export function ExportData(props: ExportProps) {
    return (
        <div className="rounded shadow border bg-gray-50 inline-flex justify-center">
            <button className="rounded p-2 my-2 text-center hover:bg-blue-500 bg-blue-200"
                disabled={props.data.length === 0}
                onClick={() => exportData(props.data)}
            >Export as CSV</button>
        </div>

    )
}