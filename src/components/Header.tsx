"use client";
import Image from "next/image";
import {
  PiTextTBold,
  PiTextItalic,
  PiTextUnderlineLight,
  PiTextStrikethroughBold,
  PiTextHFill,
} from "react-icons/pi";
import { LuFileJson, LuUndo2, LuRedo2 } from "react-icons/lu";
import { FC } from "react";
import Modal from "./Modal";
import { IoIosClose } from "react-icons/io";
import { ChangeEvent } from "react";

interface HeaderProps {
  editor: any;
  onToggleModal: () => void;
  onDownload: (fileName: string) => void;
  isModal: boolean;
  onNewData: (data: ChangeEvent<HTMLInputElement>) => void;
}

const Header: FC<HeaderProps> = ({
  editor,
  onToggleModal,
  onDownload,
  isModal,
  onNewData,
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="drawer flex items-center justify-between w-[1200px] h-14 fixed top-6 left-1/2 -translate-x-1/2 z-20">
      <ul className="flex items-center gap-4">
        <li className="flex items-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="btn btn-neutral"
          >
            <LuUndo2 className="text-xl" />
          </button>
        </li>
        <li className="flex items-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="btn btn-neutral"
          >
            <LuRedo2 className="text-xl" />
          </button>
        </li>
        <li className="flex items-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold") ? "btn btn-primary " : "btn btn-neutral "
            }
          >
            <PiTextTBold className="text-xl" />
          </button>
        </li>
        <li className="flex items-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? "btn btn-primary" : "btn btn-neutral"
            }
          >
            <PiTextItalic className="text-xl" />
          </button>
        </li>
        <li className="flex items-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline")
                ? "btn btn-primary"
                : "btn btn-neutral"
            }
          >
            <PiTextUnderlineLight className="text-xl" />
          </button>
        </li>
        <li className="flex items-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={
              editor.isActive("strike") ? "btn btn-primary" : "btn btn-neutral"
            }
          >
            <PiTextStrikethroughBold className="text-xl" />
          </button>
        </li>
        <li className="flex items-center">
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 })
                ? "btn btn-primary"
                : "btn btn-neutral"
            }
          >
            <PiTextHFill className="text-xl" />
          </button>
        </li>
      </ul>
      <div className="flex items-end gap-4 absolute left-1/2 -translate-x-1/2">
        <Image
          src="/logo.png"
          alt="Editor Logo"
          width={26}
          height={0}
          priority
        />
        <p className="text-xl font-bold">Doclite</p>
      </div>
      <div className="flex gap-4">
        <input
          type="file"
          className="file-input file-input-bordered"
          onChange={(e) => onNewData(e)}
        />
        <div className="relative">
          {!isModal ? (
            <button
              type="button"
              onClick={onToggleModal}
              className="btn btn-neutral"
            >
              Save as
              <LuFileJson className="text-xl" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleModal}
              className="btn btn-neutral"
            >
              <IoIosClose className="text-2xl" />
            </button>
          )}
          <Modal onDownload={onDownload} isModal={isModal} />
        </div>
      </div>
    </div>
  );
};

export default Header;
