import { BubbleMenu } from "@tiptap/react";
import { FaCommentAlt } from "react-icons/fa";
import { FC } from "react";

interface BubbleModalProps {
  editor: any;
  onSetComment: () => void;
}

const BubbleModal: FC<BubbleModalProps> = ({ editor, onSetComment }) => {
  return (
    <BubbleMenu
      editor={editor}
      className="p-1 border rounded-lg border-slate-400"
    >
      <button className="btn btn-neutral" onClick={onSetComment}>
        <FaCommentAlt />
      </button>
    </BubbleMenu>
  );
};

export default BubbleModal;
