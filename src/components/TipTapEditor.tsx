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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [commentTimer, setCommentTimer] = useState<NodeJS.Timeout | null>(null);
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

  const handleDownload = (fileName: string) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(editorContent)
    )}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${fileName}.json`;
    link.click();

    setIsOpenModal(false);
  };

  const handleNewData = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSetComment = () => {
    if (!activeCommentId) return;
    const newComment = {
      id: `a${v4()}a`,
      content: "",
      replies: [],
      createdAt: new Date(),
    };

    setEditorContent((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));

    editor?.commands.setComment(newComment.id);
    setActiveCommentId(newComment.id);
    const timerId = setTimeout(() => {
      focusCommentWithActiveId(activeCommentId, commentsSectionRef);
    });
    setCommentTimer(timerId);
  };

  useEffect(() => {
    return () => {
      if (commentTimer) {
        clearTimeout(commentTimer);
      }
    };
  }, [commentTimer]);

  return (
    <div className="pt-24 pb-4 w-[1200px] ml-auto mr-auto flex justify-between relative">
      <Header
        editor={editor}
        onToggleModal={() => setIsOpenModal(!isOpenModal)}
        onDownload={handleDownload}
        isModal={isOpenModal}
        onNewData={handleNewData}
      />
      <EditorContent editor={editor} />
      <CommentsArea
        comments={editorContent.comments}
        activeCommentId={activeCommentId}
        onSetComments={(newComments) => {
          setEditorContent((prev) => ({ ...prev, comments: newComments }));
        }}
        onSetActiveCommentId={(value) => setActiveCommentId(value)}
        editor={editor}
        onDeleteComment={(id) =>
          setEditorContent((prev) => ({
            ...prev,
            comments: prev.comments.filter((item) => item.id !== id),
          }))
        }
      />
      <BubbleModal editor={editor} onSetComment={handleSetComment} />
    </div>
  );
};

export default TipTapEditor;
