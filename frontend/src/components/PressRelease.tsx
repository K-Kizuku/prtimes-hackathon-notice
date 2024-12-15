"use client";
import { FC } from "react";

type Props = {
  title: string;
  subTitle: string;
  companyName: string;
  imgURL: string;
};

const PressRelease: FC<Props> = ({ title, subTitle, companyName, imgURL }) => {
  return (
    <div className=" border-solid border-2 border-gray-500 p-4 flex flex-row gap-5 font-bold">
      <div>
        <img src={imgURL} />
      </div>
      <div>
        <p className="text-lg text-neutral-100">{title}</p>
        <p className="mt-3 text-neutral-100">{subTitle}</p>
        <p className="text-neutral-100">{companyName}</p>
      </div>
    </div>
  );
};

export default PressRelease;
