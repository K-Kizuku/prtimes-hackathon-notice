"use server";

import { PostPressLelease, PressLelease } from "~/type/schema/PressLelease";
import { PostTokenRequest } from "~/type/schema/User";
import getAuth from "~/utils/getAuth";

export const postPressLelease = async (
  prev: PressLelease,
  formData: FormData
) => {
  const token = await getAuth();
  const name = formData.get("name") || "";
  //   const subTitle = formData.get("subTitle") || "";
  const password = formData.get("password") || "";
  const data: PostTokenRequest = {
    username: name.toString(),
    password: password.toString(),
  };
  const res = await fetch(process.env.API_URL + "/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to post");
  }

  const press = (await res.json()) as PressLelease;
  return press;
};
