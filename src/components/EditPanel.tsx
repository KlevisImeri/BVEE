import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

type Interface = {
  generator: any;
  stopEditPanel: (args: any) => void;
};


function EditPanel({ generator, stopEditPanel }: Interface) {
  const [editedRemonte, setEditedRemonte] = useState(generator.remonte);
  const [editedRevizione, setEditedRevizione] = useState(generator.revizione);
  const [editedRezerve, setEditedRezerve] = useState(generator.rezerve);

  const addPeriod = (periodType: any) => {
    switch (periodType) {
      case 'remonte':
        setEditedRemonte([...editedRemonte, ['','']]);
        break;
      case 'revizione':
        setEditedRevizione([...editedRevizione, ['','']]);
        break;
      case 'rezerve':
        setEditedRezerve([...editedRezerve, ['','']]);
        break;
      default:
        break;
    }
  };

  const removePeriod = (periodType: any, index: number) => {
    switch (periodType) {
      case 'remonte':
        setEditedRemonte(editedRemonte.filter((_: any, i:number) => i !== index));
        break;
      case 'revizione':
        setEditedRevizione(editedRevizione.filter((_: any, i:number) => i !== index));
        break;
      case 'rezerve':
        setEditedRezerve(editedRezerve.filter((_: any, i:number) => i !== index));
        break;
      default:
        break;
    }
  };

  const handleDoneClick = () => {
    const editedGenerator = {
      ...generator,
      remonte: editedRemonte,
      revizione: editedRevizione,
      rezerve: editedRezerve,
    };
    stopEditPanel(editedGenerator);
  };


  const renderPeriods = (periodType: any, periods: any) => (
    <div>
      {periods.map((period: any, index: number) => (
        <div key={index} className="flex items space-x-2">
          <input
            type="text"
            placeholder="SD"
            value={period[0]}
            onChange={(e) => handlePeriodChange(periodType, index, 0, e.target.value)}
            className="w-6 text-center"
          />
          <div className="text-xl">/</div>
          <input
            type="text"
            placeholder="SM"
            value={period[1]}
            onChange={(e) => handlePeriodChange(periodType, index, 1, e.target.value)}
            className="w-6 text-center"
          />
          <div className="text-xl">-</div>
          <input
            type="text"
            placeholder="ED"
            value={period[2]}
            onChange={(e) => handlePeriodChange(periodType, index, 2, e.target.value)}
            className="w-6 text-center"
          />
          <div className="text-xl">/</div>
          <input
            type="text"
            placeholder="EM"
            value={period[3]}
            onChange={(e) => handlePeriodChange(periodType, index, 3, e.target.value)}
            className="w-6 text-center"
          />
          <button onClick={() => removePeriod(periodType, index)}>
            <FaMinus className="text-red-500" />
          </button>
        </div>
      ))}
      <button onClick={() => addPeriod(periodType)}>
        <FaPlus className="text-green-500 ml-6" />
      </button>
    </div>
  );

  const handlePeriodChange = (periodType: any, index: number, subIndex: number, value: string) => {
    switch (periodType) {
      case 'remonte':
        const updatedRemonte = [...editedRemonte];
        updatedRemonte[index][subIndex] = value;
        setEditedRemonte(updatedRemonte);
        break;
      case 'revizione':
        const updatedRevizione = [...editedRevizione];
        updatedRevizione[index][subIndex] = value;
        setEditedRevizione(updatedRevizione);
        break;
      case 'rezerve':
        const updatedRezerve = [...editedRezerve];
        updatedRezerve[index][subIndex] = value;
        setEditedRezerve(updatedRezerve);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-4 m-2 ml-20 border border-gray-300 rounded-lg w-60">
      <div>
        <div>Remonte:</div>
        {renderPeriods('remonte', editedRemonte)}
      </div>
      <div>
        <div>Revizione:</div>
        {renderPeriods('revizione', editedRevizione)}
      </div>
      <div>
        <div>Rezerve:</div>
        {renderPeriods('rezerve', editedRezerve)}
      </div>
      <div className="text-center"> {/* Add this wrapper for centering */}
        <button onClick={handleDoneClick} className="bg-green-500 p-2 rounded-lg text-white">
          Done
        </button>
      </div>
    </div>
  );
}

export default EditPanel;
