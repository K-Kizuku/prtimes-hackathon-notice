"use client"
import { FC } from "react";

type Props = {
  title: string;
  description: string;
  imgURL: string;
};

const PressReleaseDetail: FC<Props> = ({ title, description, imgURL }) => {
  return (
    <div className="border-solid border-2 border-gray-500 p-4 flex flex-row gap-5 font-bold">
      <div>
        <img src={imgURL}></img>
      </div>
      <div>
        <p className="text-lg text-neutral-100">{title}</p>
        <p className="mt-3 text-neutral-100">{description}</p>
        <div className="mt-5 flex flex-row gap-6">
          <button className="w-32 mt-4 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" type="submit">編集</button>
          <button className="w-32 mt-4 px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" type="submit">削除</button>
        </div>
      </div>
    </div>
  );
};

export default PressReleaseDetail;
