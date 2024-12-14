import { FC } from "react";

type Props = {
  title: string;
  subTile: string;
  company: string;
  imgURL: string;
};

const PressRelease: FC<Props> = ({ title, subTile, company, imgURL }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Press Release content goes here</p>
    </div>
  );
};

export default PressRelease;
