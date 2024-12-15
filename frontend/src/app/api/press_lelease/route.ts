export const dynamic = "force-static";

export async function GET() {
  // const cookiesStore = await cookies();
  // const token = cookiesStore.get("Authorization")?.value || "";
  // const res = await fetch(process.env.API_URL + "/users/me", {
  //   credentials: "include",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: token,
  //   },
  // });
  // const data = await res.json();
  // // cookiesStore.set(
  // //   "Set-Cookie",
  // //   `Authorization=${data.token_type} ${data.access_token}`,
  // //   {
  // //     httpOnly: true,
  // //   }
  // // );
  // cookiesStore.set("account_info", JSON.stringify(data));
  // return new Response("OK", {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "application/json",
  //     // "Set-Cookie": `Authorization=${data.token_type} ${data.access_token}; Secure; HttpOnly`,
  //   },
  // });
  return new Response("OK", {});
}
