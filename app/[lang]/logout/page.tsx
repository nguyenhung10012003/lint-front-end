"use client";

import { signOut } from "@/lib/server-action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    signOut();
    router.push("/sign-in");
  }, []);
}
