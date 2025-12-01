"use client";

import ReshuffledTitle from "@/components/ReshuffledTitle";
import InputPanel from "@/components/InputPanel";

export default function Home() {

  return (
    <section className="w-dvw h-dvh flex flex-col items-center justify-center gap-3 px-4">
      <ReshuffledTitle />
      <InputPanel />
    </section>
  )

}
