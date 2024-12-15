import { PressLeleaseForm } from "~/components/PressLeleaseForm";
import TopicDetail from "~/components/TopicDetail";

const Topic = {
    title: "新製品リリースのお知らせ",
    subTitle: "革新的な技術を駆使した新製品",
    companyName: "Tech Innovators Inc.",
    description: "我々の新しい製品は、効率を50%向上させる設計となっています。",
    imgURL: "https://via.placeholder.com/150",
    // ここでトピックのインスタンスを渡す方法が分からない
};

export default function Media() {
  return <div className="mx-5">
    <TopicDetail {...Topic}></TopicDetail>
  </div>;
}
