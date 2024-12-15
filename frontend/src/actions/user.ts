"use server";

import { cookies } from "next/headers";
import { CreateUser } from "~/type/schema/User";

export const createUser = async (user: CreateUser) => {
  const cookieStore = await cookies();
  const res = await fetch(process.env.API_URL + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  cookieStore.set("account_info", JSON.stringify(data));
  return data;
};
