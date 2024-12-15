import { FC } from "react";

type Props = {
  name: string;
  email: string;
  imgURL: string;
  company: string;
};

const AccountInfo: FC<Props> = ({ name, email, imgURL, company }) => {
  return (
    <a href="#">
      <div className="flex flex-row gap-1 ">
        <img className="w-12" src={imgURL} />
        <div className="flex flex-col">
          <div className="flex flex-row items-baseline gap-1">
            <p className="text-sm">{company}</p>
            <p className="text-xs">{name}</p>
          </div>
          <p>{email}</p>
        </div>
      </div>
    </a>
  );
};

export default AccountInfo;
