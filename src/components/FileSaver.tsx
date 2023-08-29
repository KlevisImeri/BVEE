import { useEffect } from 'react';

type Interface = {
  jsonData: any;
  filePath: any;
  setFilePath: any;
}


const FileSaver = ({ jsonData, filePath, setFilePath }: Interface) => {

  useEffect(() => {
    window.electronAPI.saveAsFileListener((newFilePath) => { 
      setFilePath(newFilePath);
      window.electronAPI.saveAsFile(jsonData, newFilePath);
      console.log("saveAs:", newFilePath); 
    });  
    
    if (filePath !== null) {
      window.electronAPI.saveFile(jsonData, filePath);
      console.log("saveAutomatically:", filePath);
    } 

    return () => {
      window.electronAPI.removeSaveAsFileListener();
    }
  }, [jsonData]);

  return null
};

export default FileSaver;
