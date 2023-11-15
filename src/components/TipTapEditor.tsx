"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Header from "./Header";
import CommentsArea from "./CommentsArea";
import Underline from "@tiptap/extension-underline";
import { useState, ChangeEvent } from "react";

const TipTapEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const [isModal, setIsModal] = useState(false);
  const editor = useEditor({
    extensions: [StarterKit.configure(), Underline],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class:
          "form-control textarea textarea-bordered w-[900px] min-h-[calc(100vh-112px)] p-6",
      },
    },
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
    },
  });

  console.log(1, editorContent);

  const onDownload = (fileName: string) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(editorContent)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${fileName}.json`;

    link.click();
  };

  const onNewData = (e: ChangeEvent<HTMLInputElement>) => {
    const onReaderLoad = (e: ChangeEvent<HTMLInputElement>) => {
      var result = JSON.parse(e.target.result);
      setEditorContent(result);
    };

    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(e.target.files[0]);
  };

  console.log(1234, editorContent);

  return (
    <>
      <div className="pt-24 pb-4 w-[1200px] ml-auto mr-auto flex justify-between relative">
        <Header
          editor={editor}
          onModal={() => setIsModal(!isModal)}
          onDownload={onDownload}
          isModal={isModal}
          onNewData={onNewData}
        />
        <EditorContent editor={editor} />
        <CommentsArea />
      </div>
    </>
  );
};

export default TipTapEditor;
