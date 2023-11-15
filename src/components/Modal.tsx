import { FC, useState } from "react";

interface ModalProps {
  onDownload: (fileName: string) => void;
  onModal: () => void;
}

const Modal: FC<ModalProps> = ({ onDownload, onModal }) => {
  const [fileName, setFileName] = useState("");

  return (
    <div className=" modal modal-backdrop ">
      <div className="modal modal-box">
        <button onClick={onModal}>Close</button>
        <input type="text" onChange={(e) => setFileName(e.target.value)} />
        <button onClick={() => onDownload(fileName)}>Download</button>
      </div>
    </div>
  );
};

export default Modal;
