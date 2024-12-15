"use server";

import { cookies } from "next/headers";
import { AccountInfo } from "~/type/AccountInfo";
// cookieからアカウントの情報を取得する
const getAccountInfo = async () => {
  const cookieStore = await cookies();
  const account = cookieStore.get("account_info")?.value || "";
  try {
    return JSON.parse(account) as AccountInfo;
  } catch {
    return {
      name: "pr times",
      email: "",
      imgURL: "https://via.placeholder.com/150",
      company: "PR test company",
    } as AccountInfo;
  }
};

export default getAccountInfo;
