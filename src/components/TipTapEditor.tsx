"use client";
import { EditorContent } from "@tiptap/react";
import Header from "./Header";
import CommentsArea from "./CommentsArea";
import BubbleModal from "./BubbleModal";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { focusCommentWithActiveId } from "../utils";
import { TComment } from "../types";
import { v4 } from "uuid";
import { useCustomEditor } from "../hooks";

const TipTapEditor = () => {
  const [editorContent, setEditorContent] = useState<{
    textContent: string;
    comments: TComment[];
  }>({
    textContent: "",
    comments: [],
  });
  const [isModal, setIsModal] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const commentsSectionRef = useRef<HTMLDivElement | null>(null);
  const editor = useCustomEditor(
    setActiveCommentId,
    editorContent.textContent,
    setEditorContent,
    commentsSectionRef
  );

  useEffect(() => {
    if (!activeCommentId) return;

    focusCommentWithActiveId(activeCommentId, commentsSectionRef);
  }, [activeCommentId]);

  const onDownload = (fileName: string) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(editorContent)
    )}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${fileName}.json`;
    link.click();

    setIsModal(false);
  };

  const onNewData = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const onReaderLoad = (e: ProgressEvent<FileReader>) => {
        if (!e.target || !e.target.result) return;

        const result =
          typeof e.target.result === "string" && JSON.parse(e.target.result);
        setEditorContent({
          textContent: result.textContent,
          comments: result.comments,
        });
        editor?.chain().setContent(result.textContent).run();
      };

      const reader = new FileReader();
      reader.onload = onReaderLoad;
      reader.readAsText(files[0]);
    }
  };

  const onSetComment = () => {
    const newComment = {
      id: `a${v4()}a`,
      content: "",
      replies: [],
      createdAt: new Date(),
    };

    setEditorContent((prev) => {
      return { ...prev, comments: [...prev.comments, newComment] };
    });

    editor?.commands.setComment(newComment.id);
    setActiveCommentId(newComment.id);
    setTimeout(focusCommentWithActiveId);
  };

  return (
    <div className="pt-24 pb-4 w-[1200px] ml-auto mr-auto flex justify-between relative">
      <Header
        editor={editor}
        onModal={() => setIsModal(!isModal)}
        onDownload={onDownload}
        isModal={isModal}
        onNewData={onNewData}
      />
      <EditorContent editor={editor} />
      <CommentsArea
        comments={editorContent.comments}
        activeCommentId={activeCommentId}
        onSetComments={(newComments) =>
          setEditorContent((prev) => {
            return { ...prev, comments: newComments };
          })
        }
        onSetActiveCommentId={(value) => setActiveCommentId(value)}
        editor={editor}
        onDeleteComment={(id) =>
          setEditorContent((prev) => {
            return {
              ...prev,
              comments: prev.comments.filter((item) => item.id !== id),
            };
          })
        }
      />
      <BubbleModal editor={editor} onSetComment={onSetComment} />
    </div>
  );
};

export default TipTapEditor;
