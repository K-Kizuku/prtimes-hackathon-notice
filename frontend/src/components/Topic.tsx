"use client"
import { FC } from "react";

type Props = {
  title: string;
  companyName: string;
};

const Topic: FC<Props> = ({ title, companyName }) => {
  return (
    <div className="border-solid border-2 border-gray-500 p-4 flex gap-5 font-bold mt-5">
        <p className="text-neutral-100">{title}</p>
        <p className="text-neutral-100">提供元 : {companyName}</p>
      </div>
  );
};

export default Topic;
