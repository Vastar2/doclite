export const focusCommentWithActiveId = (
  id: string,
  commentsSectionRef: React.RefObject<HTMLDivElement> | null
) => {
  if (!commentsSectionRef?.current) return;

  const commentInput =
    commentsSectionRef.current.querySelector<HTMLInputElement>(`input#${id}`);

  if (!commentInput) return;

  commentInput.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};
