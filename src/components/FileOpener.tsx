import { useEffect } from 'react';

type Interface = {
  setJsonData: any;
  setFilePath: any;
}



const FileOpener = ({ setJsonData, setFilePath }: Interface) => {
  const openFileListener = (jsonData: any, filePath: string) => {
    setJsonData(jsonData); 
    setFilePath(filePath);  
  }; 

  useEffect(() => {
  window.electronAPI.openFileListener(openFileListener);

  return () =>{
    window.electronAPI.removeOpenFileListener();
  }

  });
  return null
}

export default FileOpener
