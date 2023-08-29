import { useState } from 'react';
import FileOpener from "./FileOpener";
import FileSaver from "./FileSaver";
import InputTable from './InputTable';
import YearlyTable from "./YearlyTable"
import YearTitle from "./YearTitle"

//electron-packager . BVEE --platform=win32 --arch=x64 --icon=public/logo.ico --oneClick=false

function App(){
  const [filePath, setFilePath] = useState(null);
  const [jsonData, setJsonData] = useState({
    "title": "Plani dinamik i ndalesave",
    "year":"2023",
    "generators": [
      {
        "name": "A3",
        "MW": "125",
        "remonte": [],
        "revizione": [],
        "rezerve": []
      },
      {
        "name": "A4",
        "MW": "125",
        "remonte": [],
        "revizione": [],
        "rezerve": []
      },
      {
        "name": "A5",
        "MW": "135",
        "remonte": [],
        "revizione": [],
        "rezerve": []
      },
      {
        "name": "B1",
        "MW": "250",
        "remonte": [],
        "revizione": [],
        "rezerve": []
      },
      {
        "name": "B2",
        "MW": "250",
        "remonte": [],
        "revizione": [],
        "rezerve": []
      }
    ]
  });

  function editGenerator(editedGenerator: any) {
    const updatedGenerators = jsonData.generators.map((generator) =>
      generator.name === editedGenerator.name ? editedGenerator : generator
    );

    setJsonData((prevData) => ({
      ...prevData,
      generators: updatedGenerators,
    }));
  }

  function setYear(newYear: string) {
    setJsonData((prevData) => ({
      ...prevData,
      year: newYear,
    }));
  }
  
  function setTitle(newTitle: string) {
    setJsonData((prevData) => ({
      ...prevData,
      title: newTitle,
    }));
  }
  

  return (
    <div className='relative'>
      <YearTitle year={jsonData.year} setYear={setYear}/>
      <YearlyTable jsonData={jsonData} setTitle={setTitle}/>
      <InputTable jsonData={jsonData} editGenerator={editGenerator} />
      <div className="absolute bottom-0 right-0 flex items-center justify-center p-2">
        {new Date().toLocaleDateString()} <br></br>
        L. Imeri
      </div>
      {/* {JSON.stringify(jsonData)} */}
      <FileOpener setJsonData={setJsonData} setFilePath={setFilePath}/>
      <FileSaver jsonData={jsonData} filePath={filePath} setFilePath={setFilePath}/>
    </div>
  );
}

export default App;
