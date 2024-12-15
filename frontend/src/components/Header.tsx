import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Header: FC<Props> = ({ children }) => {
  return (
    <header className="fixed bg-primary text-white p-4 shadow-md flex w-full justify-between">
      <p className="text-4xl font-bold text-center leading-[3rem]">PR SEED</p>
      <div className="">{children}</div>
    </header>
  );
};

export default Header;
