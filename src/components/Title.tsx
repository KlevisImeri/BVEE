type Interface ={
  title: string;
  setTitle: any;
}


function Title({title, setTitle}: Interface){
  return (
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border-none px-2 py-1 text-xl w-full text-center"
    />
  );
}

export default Title