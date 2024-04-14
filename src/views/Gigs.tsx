import { useEffect } from "react"
import { getAllPosts } from "../api/datoCmsCalls"

export default function Gigs() {

  const callPosts = async () => {
    console.log(await (await getAllPosts()).json())
  }

  useEffect(() => {
    callPosts()
  })

  return (
    <div>Gigs</div>
  )
}
