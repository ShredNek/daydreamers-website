import { useEffect, useState } from "react"
import { getAllPosts } from "../api/datoCmsCalls"
import { AllGigsEntity, ComponentLoadingStatus } from "../types/index"
import { returnFormattedArtistNames, returnFormattedDate } from "../helper/index"
import NavHeader from "../components/NavHeader";
import Pin from "../components/svgs/Pin"
import Calendar from "../components/svgs/Calendar"
import Ticket from "../components/svgs/Ticket"

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
            <div className="gig-card" key={gig.id}>
              <div className="gig-details">
                <h2>{gig.title}</h2>
                <h3>{returnFormattedArtistNames(gig.artistnames)}</h3>
                <div> <Calendar /><p>{returnFormattedDate(gig.datetime)}</p></div>
                <div> <Pin /><p>{gig.venue}</p></div>
              </div>
              <div className="poster-parent">
                <img src={gig.gigposter.url} />
              </div>
            </div>
          )
          : <h2>No gigs at this time</h2>}
      </div>
    </section >
  )
}
