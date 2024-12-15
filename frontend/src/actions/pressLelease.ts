"use server";

import { PostPressLelease, PressLelease } from "~/type/schema/PressLelease";
import getAuth from "~/utils/getAuth";

export const postPressLelease = async (
  prev: PressLelease,
  formData: FormData
) => {
  const token = await getAuth();
  const title = formData.get("title") || "";
  //   const subTitle = formData.get("subTitle") || "";
  const imgURL = formData.get("imgURL") || "";
  const description = formData.get("description") || "";
  const data: PostPressLelease = {
    title: title.toString(),
    description: description.toString(),
    image: imgURL.toString(),
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
