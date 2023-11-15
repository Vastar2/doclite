import { FC, useState } from "react";

interface ModalProps {
  onDownload: (fileName: string) => void;
  onModal: () => void;
  isModal: boolean;
}

const Modal: FC<ModalProps> = ({ onDownload, onModal, isModal }) => {
  const [fileName, setFileName] = useState("");

  if (!isModal) return null;

  return (
    <div className="absolute border border-gray-300 right-0 top-16 p-4 rounded-xl bg-white">
      <input
        className="input mb-4 border border-gray-300"
        placeholder="Name of file"
        type="text"
        onChange={(e) => setFileName(e.target.value)}
      />
      <button className="btn btn-neutral" onClick={() => onDownload(fileName)}>
        Download
      </button>
    </div>
  );
};

export default Modal;
