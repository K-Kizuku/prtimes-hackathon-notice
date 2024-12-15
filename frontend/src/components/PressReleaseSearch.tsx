"use client"
import { FC } from "react";

const PressReleaseSearch: FC = () => {
  return <div className="container">
    <input type="search" id="site-search" name="q" />
    <button>Search</button>
  </div>;
};

export default PressReleaseSearch;
