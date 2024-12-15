"use client";
import { useFormState, useFormStatus } from "react-dom";
import { postPressLelease } from "~/actions/pressLelease";
import { PressLelease } from "~/type/schema/PressLelease";
export const PressLeleaseForm = () => {
  const { pending } = useFormStatus();
  const [press, dispatch] = useFormState(postPressLelease, {} as PressLelease);
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
