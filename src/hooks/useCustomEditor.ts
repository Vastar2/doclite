import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Comment } from "@sereneinserenade/tiptap-comment-extension";
import { Dispatch, SetStateAction, MutableRefObject } from "react";
import { TComment } from "../types";
import { focusCommentWithActiveId } from "../utils";

export const useCustomEditor = (
  setActiveCommentId: Dispatch<SetStateAction<string | null>>,
  textContent: string,
  setEditorContent: Dispatch<
    SetStateAction<{
      textContent: string;
      comments: TComment[];
    }>
  >,
  commentsSectionRef: MutableRefObject<HTMLDivElement | null>
) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline,
      Comment.configure({
        HTMLAttributes: {
          class: "my-comment",
        },
        onCommentActivated: (commentId) => {
          setActiveCommentId(commentId);

          if (commentId)
            setTimeout(() =>
              focusCommentWithActiveId(commentId, commentsSectionRef)
            );
        },
      }),
    ],
    content: textContent,
    editorProps: {
      attributes: {
        class:
          "form-control textarea textarea-bordered w-[900px] min-h-[calc(100vh-112px)] p-6",
      },
    },
    onUpdate({ editor }) {
      setEditorContent((prev: any) => {
        return { ...prev, textContent: editor.getHTML() };
      });
    },
  });

  return editor;
};
