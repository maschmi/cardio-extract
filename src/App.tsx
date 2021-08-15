import React, {useState} from 'react';
import './App.css';
import {FileLoader} from "./FileLoader";
import {ImportDetails} from "./ImportDetails";
import {Measurement} from "./Models";
import {ExportData} from "./ExportData";




function App() {
  const [data, setMeasurements] = useState<Array<Measurement>>([])

  return (
    <>
        <FileLoader publish={(d: Measurement[]) => setMeasurements([...d])}/>
        <ImportDetails input={data}/>
        <ExportData data={data}/>
    </>
  );
}

export default App;
