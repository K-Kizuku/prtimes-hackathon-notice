"use client";
import { useFormState, useFormStatus } from "react-dom";
import { postTopic } from "~/actions/topic";
import { Topic } from "~/type/schema/Topic";
export const TopicForm = () => {
  const { pending } = useFormStatus();
  const [topic, dispatch] = useFormState(postTopic, {} as Topic);
  return (
    <form action={dispatch} className="flex flex-col p-5">
      {pending && <p>送信中</p>}
      <input className="text-xl p-5 text-black" placeholder="リリースタイトル" type="text" name="title" />
      <input className="p-5 text-black" placeholder="サブタイトル" type="text" name="subTitle" />
      <input className="p-5 text-black" placeholder="画像URL" type="text" name="imgURL" />
      <input className="p-5 text-black" placeholder="本文" type="textarea" name="description" />
      <button className="w-32 mt-4 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" type="submit">送信</button>
    </form>
  );
};
