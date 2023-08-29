import { useState } from 'react';
import Generator from "./Generator";
import EditPanel from "./EditPanel";

type Interface = {
  jsonData: any;
  editGenerator: any;
}


function InputTable({ jsonData, editGenerator }: Interface) {
  const [activeEditGenerator, setActiveEditGenerator] = useState(null);

  const startEditPanel = (generator: any) => {
    setActiveEditGenerator(generator);
  };

  const stopEditPanel = (editedGenerator: any) => {
    editGenerator(editedGenerator);
    setActiveEditGenerator(null);
  };

  return (
    <div className="space-y-4">
      {jsonData.generators.map((generator: any, index: number) => (
        <div key={index}>
          <Generator generator={generator} year={jsonData.year} startEditPanel={startEditPanel}/>
          {activeEditGenerator === generator && (
            <EditPanel generator={generator} stopEditPanel={stopEditPanel} />
          )}
        </div>
      ))}
    </div>
  );
}

export default InputTable;