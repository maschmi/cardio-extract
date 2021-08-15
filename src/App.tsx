import React, {useState} from 'react';
import './App.css';
import {FileLoader} from "./FileLoader";
import {ImportDetails} from "./ImportDetails";
import {Measurement} from "./Models";
import {ExportData} from "./ExportData";
import './index.css'



function App() {
  const [data, setMeasurements] = useState<Array<Measurement>>([])

  return (
    <div className="flex space-y-3 mr-auto ml-auto flex-col w-4/5">
        <h1 className="text-center font-bold">Measurement extractor</h1>
        <FileLoader publish={(d: Measurement[]) => setMeasurements([...d])}/>
        <ImportDetails input={data}/>
        <ExportData data={data}/>
    </div>
  );
}

export default App;
