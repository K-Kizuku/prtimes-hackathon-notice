"use server";

import { cookies } from "next/headers";
const getAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization")?.value || "";
  return token;
};

export default getAuth;
