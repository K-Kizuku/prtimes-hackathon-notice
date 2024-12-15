"use client"
import { FC } from "react";

type Props = {
  title: string;
};

const SubmitButton: FC<Props> = ({ title }) => {
  return (
    <div >
      <button className="w-32 mt-4 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">{ title }</button>
    </div>
  );
};

export default SubmitButton;
