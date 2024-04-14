import { useEffect, useState } from "react"
import { getAllPosts } from "../api/datoCmsCalls"
import { AllGigsEntity, ComponentLoadingStatus } from "../types/index"
import NavHeader from "../components/NavHeader";

export default function Gigs() {
  const [componentState, setComponentState] = useState<ComponentLoadingStatus>("transitioning static")
  const [gigData, setGigData] = useState<AllGigsEntity | null>(null)

  // ? On page load

  const callPosts = async () => {
    setGigData(await (await getAllPosts()).json())
  }

  useEffect(() => {
    callPosts()
  }, [])

  useEffect(() => {
    if (gigData && Object.entries(gigData).length) {
      console.log(gigData)
      console.log(gigData.data)
      setComponentState("")
    }
  }, [gigData])



  return (
    <section className={componentState} id="gigs">
      <NavHeader transitionOnNavItemClick={setComponentState} />
      <div id="cards">
        {gigData?.data.allGigs ?
          gigData.data.allGigs.map((gig) =>
            <div key={gig.id}>
              <h2>{gig.title}</h2>
              <h3>{gig.datetime}</h3>
              <p>{gig.details}</p>
              <img src={gig.gigposter.url} />
              {gig.venue}
              {gig.venuelocation.latitude}
              {gig.venuelocation.longitude}
            </div>
          )
          : <h2>No gigs at this time</h2>}
      </div>
    </section >
  )
}
