import { useRef, useState, useEffect } from 'react';
import Title from './Title';

type Interface = {
  jsonData: any;
  setTitle: any;
}

function YearlyTable({ jsonData, setTitle}: Interface) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const titleHeightRef = useRef<HTMLTableHeaderCellElement>(null);
  const generatorRef = useRef<HTMLTableDataCellElement | null>(null); 
  const refMonthsHeight = useRef<HTMLTableRowElement | null>(null); 
  const [titleHeight, setTitleHeight] =useState(32);
  const [monthsHeight, setMonthsHeight] =useState(34);
  const [generatorHeight, setGeneratorHeight] = useState(63);

  useEffect(() => {
    if (titleHeightRef.current) {
      setTitleHeight(titleHeightRef.current.clientHeight);
    }
    if (refMonthsHeight.current) {
      setMonthsHeight(refMonthsHeight.current.clientHeight);
    }
    if (generatorRef.current) {
      setGeneratorHeight(generatorRef.current.clientHeight);
    } 
  }, []);


  function getDaysInYear(year: number) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 366;
    } else {
      return 365;
    }
  }

  function calculateWidthPercentage(days: number) {
    return (days / (getDaysInYear(jsonData.year))) * 100;
  }

  function calculateWidthPercentageMonth(monthIndex: number) {
    let daysInMonth = new Date(jsonData.year, monthIndex + 1, 0).getDate()
    return calculateWidthPercentage(daysInMonth);
  }

  function daysBetween(startDate: Date, endDate: Date) {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return numDays;
  }

  function calculateMarkerWidth(startDate: Date, endDate: Date) {
    const days = daysBetween(startDate,endDate)
    return calculateWidthPercentage(days);
  }

  function renderMarker(generator: any, index: number, period: any) {
    const [startDay, startMonth, endDay, endMonth] = period
    const startDate = `${startDay}.${startMonth}`
    const endDate  = `${endDay}.${endMonth}`

    const markerStartDate = new Date(jsonData.year, startMonth - 1, startDay);
    const markerEndDate = new Date(jsonData.year, endMonth - 1, endDay);
    const startOfYear = new Date(jsonData.year, 0, 1);

    const startDateInDays = daysBetween(startOfYear,markerStartDate)

    const markerWidth = calculateMarkerWidth(markerStartDate, markerEndDate);
    const markerLeft = calculateWidthPercentage(startDateInDays-1); 

    const left = `calc(${markerLeft+0.5}%)`;
    const top = titleHeight + monthsHeight + (index*generatorHeight)+10;
    const markerStyle = {
      left: left,
      width: `${markerWidth}%`, 
      top: `${top}px` 
    };


    let markerColor = '';
    if (generator.remonte.includes(period)) {
      markerColor = 'bg-red-500';
    } else if (generator.revizione.includes(period)) {
      markerColor = 'bg-amber-500';
    } else if (generator.rezerve.includes(period)) {
      markerColor = 'bg-green-300 border-dashed border-6 border-emerald-400';
    }

    return (
      <div key={`${generator.name}-${startDate}-${endDate}`} className="absolute" style={markerStyle}>
        <div className='text-xs'>{startDate}</div> 
        <div className={`h-3 w-full text-xs  flex items-center justify-center ${markerColor}`}>
          {daysBetween(markerStartDate,markerEndDate)}
        </div>
        <div className='text-xs text-right'>{endDate}</div>
      </div>
    );
  }

  function renderMarkers(generator: any, index: number) {
    const allPeriods = [...generator.remonte, ...generator.revizione, ...generator.rezerve];
    return allPeriods.map((period) => renderMarker(generator, index, period));
  }

  return (
    <div className="overflow-x-auto m-2 mt-6 mb-20 flex">

      <table className="table-auto border-l-2 border-y-2 border-r-0 border-slate-950" style={{borderRightWidth: '0'}}>
        <thead>
          <tr>
            <td className="p-1 border-2 border-l-2 border-y-2 border-r-0 border-slate-950" style={{ height: `${titleHeight+monthsHeight+1.7}px` }}>Njësit</td>
          </tr>
        </thead>
        <tbody>
          {jsonData.generators.map((generator: any) => (
            <tr key={generator.name}>
              <td ref={generatorRef} className="p-4 border border-r-0 border-slate-950 text-center">{generator.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="w-full relative">
        <table className="table-auto border-2 border-slate-950 w-full">
          <thead>
            <tr className="border-2 border-slate-950">
              <th ref={titleHeightRef} className="p-1 border-2 border-slate-950 text-center" colSpan={13}>
                <Title title={jsonData.title} setTitle={setTitle}></Title>
              </th>
            </tr>
            <tr ref={refMonthsHeight}>
              {months.map((month, monthIndex) => (
                <td key={monthIndex} className="p-1 border border-b-2 border-slate-950 text-center" style={{ width: `${calculateWidthPercentageMonth(monthIndex)}%`}}>{month}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {jsonData.generators.map((generator: any) => (
              <tr key={generator.name}>
                {months.map(() => (
                  <td key={Math.random()} className="p-2 border border-slate-950 h-16"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {jsonData.generators.map((generator: any, index: number) => renderMarkers(generator, index))}

      </div>

    </div>
  );
}

export default YearlyTable;