"use client"
import PressRelease from "~/components/PressRelease";
import { FC } from "react";

// サンプルデータ
const pressReleases = [
  // { title: "編集", subTitle: "Press Release 1", companyName: "This is the companyName of Press Release 1.", imgURL: "https://placehold.jp/100x100.png" },
  // { title: "編集", subTitle: "Press Release 2", companyName: "This is the companyName of Press Release 2.", imgURL: "https://placehold.jp/100x100.png" },
];

const PressReleaseRows: FC = () => {
  // return (
  //   <div className="container mx-auto my-5">
  //     {pressReleases.map((release) => (
  //       <PressRelease title={release.title} subTitle={release.subTitle} companyName={release.companyName} imgURL={release.imgURL} />
  //     ))}
  //   </div>
  // );
};

export default PressReleaseRows;
