import { FaPencilAlt } from 'react-icons/fa';

type Interface = {
  generator: any;
  year: string;
  startEditPanel: any;
}

function Generator({ generator, year, startEditPanel}: Interface) {

  const formatDateRange = (ranges: any) => {
    return ranges.map((range: any) => `${range[0]}.${range[1]}.${year} - ${range[2]}.${range[3]}.${year}`).join('  /  ');
  };

  return (
    <div className="m-2 flex">

      <div className="text-center">
        {generator.name}-{generator.MW}<br />
        MW/h
      </div>

      <div>
        <div className="m-3 bg-red-500 w-60 h-2 rounded-sm"></div>
        <div className="m-3 bg-amber-500 w-60 h-2"></div>
        <div className="m-3 bg-green-300 w-60 h-2 border-dashed border-4 border-emerald-400 rounded-sm"></div>
      </div>

      <div>
        <div className="ml-2 mr-2">Remonte</div>
        <div className="ml-2 mr-2">Revizione</div>
        <div className="ml-2 mr-2">Rezerve</div>
      </div>

      <div>
        <div>
          <div className="ml-2 mr-2">{formatDateRange(generator.remonte) || '\u00A0' }</div>
          <div className="ml-2 mr-2">{formatDateRange(generator.revizione) || '\u00A0' }</div>
          <div className="ml-2 mr-2">{formatDateRange(generator.rezerve) || '\u00A0' }</div>
        </div>
      </div>

      <div>
        <button onClick={() => startEditPanel(generator)} className=" print:hidden ml-2 bg-blue-500 p-2 rounded-lg text-white mt-5">
          <FaPencilAlt />
        </button>
      </div>

    </div>
  );
}

export default Generator;
