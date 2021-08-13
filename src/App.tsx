import React, {useState} from 'react';
import './App.css';
import {FileLoader} from "./FileLoader";
import {Measurement} from "./converter";


interface DetailsProps {
  input: Measurement[]
}

function extractDates(measurements: Measurement[]): {
    firstMeasurementTime: Date | undefined,
    lastMeasurementTime: Date | undefined
} {
    const firstMeasurementTime = measurements[0] !== undefined ? new Date() : undefined;
    const lastMeasurementTime = measurements[measurements.length-1] !== undefined ? new Date() : undefined;
    firstMeasurementTime?.setTime(measurements[0]?.measurement_time);
    lastMeasurementTime?.setTime(measurements[measurements.length-1]?.measurement_time);
    return {firstMeasurementTime, lastMeasurementTime};
}

function calculateAverage(measurements: Measurement[]):{
        avgDia: number,
        avgSys: number
} {
    const count = measurements.length;
    const diaTot = measurements.map(m => m.diastolic).reduce((acc, current) => acc + current, -1);
    const sysTot = measurements.map(m => m.systolic).reduce((acc, current) => acc + current, -1);
    return {
        avgDia: diaTot / count,
        avgSys: sysTot / count
    }
}

function Details(props: DetailsProps) {
  const measurements = [...props.input].filter(d => !isNaN(d?.measurement_time))
      .sort((a, b) => a.measurement_time - b.measurement_time);
    const {firstMeasurementTime, lastMeasurementTime} = extractDates(measurements);
    const {avgDia, avgSys } = calculateAverage(measurements);
    return (
      <div className="meta">
          <div className="meta-row">
              First measurement {firstMeasurementTime?.toLocaleString()}
          </div>
          <div className="meta-row">
              Last measurement {lastMeasurementTime?.toLocaleString()} <br/>
          </div>
          <div className="meta-row">
              Average Diastolic {avgDia.toFixed(2)} <br/>
          </div>
          <div className="meta-row">
              Average Systolic {avgSys.toFixed(2)}
          </div>
      </div>
  )
}

function App() {
  const [data, setMeasurements] = useState<Array<Measurement>>([])

  return (
    <>
        <FileLoader publish={(d: Measurement[]) => setMeasurements([...d])}/>
        <Details input={data}/>
    </>
  );
}

export default App;
