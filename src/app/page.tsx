import { redirect } from "next/navigation"
import React from "react"

export default function page() {
  return redirect("/login")

  return <div>page</div>
}
