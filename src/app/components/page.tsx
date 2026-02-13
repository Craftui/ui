import { redirect } from "next/navigation"
import { componentDocs } from "@/app/components/_lib/docs"

export default function ComponentsHomePage() {
  redirect(`/components/${componentDocs[0].slug}`)
}
