import { FC } from "react";
import { TComment } from "../types";
import { MdEdit, MdDelete } from "react-icons/md";

interface CommentsAreaProps {
  comments: TComment[];
  activeCommentId: string | null;
  onSetComments: (newComments: TComment[]) => void;
  onSetActiveCommentId: (value: string | null) => void;
  editor: any;
  onDeleteComment: (id: string | null) => void;
}

const CommentsArea: FC<CommentsAreaProps> = ({
  comments,
  activeCommentId,
  onSetComments,
  onSetActiveCommentId,
  editor,
  onDeleteComment,
}) => {
  return (
    <ul className="rounded-xl bg-gray-100 sticky top-24 w-[284px]  p-6 h-[calc(100vh-112px)] overflow-y-auto">
      {comments.length ? (
        comments.map((comment) => (
          <li
            key={comment.id}
            className="card card-normal bg-white px-2 py-4 mb-3"
          >
            <div className="flex items-center mb-4">
              <p className="text-slate-400">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              {!activeCommentId && (
                <button
                  className="w-6 h-6 ml-auto"
                  type="button"
                  onClick={() => onSetActiveCommentId(comment.id)}
                >
                  <MdEdit />
                </button>
              )}
              <button
                className="w-6 h-6 ml-2"
                type="button"
                onClick={() => onDeleteComment(comment.id)}
              >
                <MdDelete />
              </button>
            </div>

            {activeCommentId ? (
              <textarea
                value={comment.content || ""}
                disabled={comment.id !== activeCommentId}
                className="form-control textarea textarea-bordered px-2 py-4 mb-4 resize-none"
                id={comment.id}
                onInput={(event) => {
                  const value = (event.target as HTMLInputElement).value;

                  onSetComments(
                    comments.map((comment) => {
                      if (comment.id === activeCommentId) {
                        return {
                          ...comment,
                          content: value,
                        };
                      }

                      return comment;
                    })
                  );
                }}
              />
            ) : (
              <p>{comment.content}</p>
            )}

            {comment.id === activeCommentId && (
              <button
                className="btn btn-neutral"
                onClick={() => {
                  onSetActiveCommentId(null);
                  editor.commands.focus();
                }}
              >
                Save
              </button>
            )}
          </li>
        ))
      ) : (
        <li className="pt-8 text-center text-slate-400">No comments yet</li>
      )}
    </ul>
  );
};

export default CommentsArea;
