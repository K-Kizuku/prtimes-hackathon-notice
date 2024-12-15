"use client";
import { useFormState, useFormStatus } from "react-dom";
import { postTopic } from "~/actions/topic";
import { Topic } from "~/type/schema/Topic";
export const TopicForm = () => {
  const { pending } = useFormStatus();
  const [topic, dispatch] = useFormState(postTopic, {} as Topic);
  return (
    <form action={dispatch} className="flex flex-col">
      {pending && <p>送信中</p>}
      <input placeholder="リリースタイトル" type="text" name="title" />
      <input placeholder="サブタイトル" type="text" name="subTitle" />
      <input placeholder="画像URL" type="text" name="imgURL" />
      <input placeholder="本文" type="textarea" name="description" />
      <button type="submit">送信</button>
    </form>
  );
};
