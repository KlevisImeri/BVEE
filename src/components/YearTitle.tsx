type Interface = {
  year: string;
  setYear: any;
}

function YearTitle({ year, setYear }: Interface) {
  return (
    <div className="m-4 text-center text-2xl">
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="mt-2 px-2 py-1 text-center border-none"
      />
    </div>
  );
}

export default YearTitle;
