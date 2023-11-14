import Header from "../src/components/Header";
import TextEditorArea from "../src/components/TextEditorArea";
import CommentsArea from "../src/components/CommentsArea";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <div className="pt-24 pb-12 w-[1200px] ml-auto mr-auto flex justify-between relative bg-orange-300">
        <TextEditorArea />
        <CommentsArea />
      </div>
    </div>
  );
}
