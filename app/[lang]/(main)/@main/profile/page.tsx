import { getCookie } from "@/lib/server-action";
import { redirect } from "next/navigation";

export default async function Profile({}) {
  redirect(`/profile/${(await getCookie("userId"))?.value}`);
}
