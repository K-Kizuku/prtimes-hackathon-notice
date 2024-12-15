"use server";

import { PostTopic, Topic } from "~/type/schema/Topic";
import getAuth from "~/utils/getAuth";

export const postTopic = async (prev: Topic, formData: FormData) => {
  const token = await getAuth();
  const title = formData.get("title") || "";
  //   const subTitle = formData.get("subTitle") || "";
  const imgURL = formData.get("imgURL") || "";
  const description = formData.get("description") || "";
  const data: PostTopic = {
    title: title.toString(),
    description: description.toString(),
    image: imgURL.toString(),
  };
  const res = await fetch(process.env.API_URL + "/topics", {
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

  const topic = (await res.json()) as Topic;
  return topic;
};
