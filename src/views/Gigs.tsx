import { useEffect, useState, useContext } from "react"
import { getAllPosts } from "../api/datoCmsCalls"
import { ComponentLoadingStatus } from "../types/index"
import { returnFormattedArtistNames, returnFormattedDate } from "../helper/index"
import { useNavigate } from "react-router-dom"
import { FADE_SPEED } from "../utils/globals"
import NavHeader from "../components/NavHeader";
import Pin from "../components/svg/Pin"
import Calendar from "../components/svg/Calendar"
import Ticket from "../components/svg/Ticket"
import { AppContext } from "../utils/AppContext"

export default function Gigs() {
  const [componentLoadingState, setComponentLoadingState] = useState<ComponentLoadingStatus>("transitioning static")
  const { gigData, updateGigData } = useContext(AppContext)
  let navigate = useNavigate();

  const handleCardClick = (gigId: string) => {
    setComponentLoadingState("transitioning static");
    setTimeout(() => navigate(`/gig/${gigId}`), FADE_SPEED);
  }

  // ? On page load

  const callPosts = async () => {
    updateGigData(await (await getAllPosts()).json())
  }

  useEffect(() => {
    callPosts()
  }, [])

  useEffect(() => {
    if (gigData && Object.entries(gigData).length) {
      setComponentLoadingState("")
    }
  }, [gigData])

  return (
    <section className={componentLoadingState} id="gigs">
      <NavHeader transitionOnNavItemClick={setComponentLoadingState} />
      <div id="cards">
        {gigData?.data.allGigs ?
          gigData.data.allGigs.map((gig) =>
            <div className="gig-card" key={gig.id}>
              <div className="body" onClick={() => handleCardClick(gig.id)}>
                <div className="gig-details">
                  <h2>{gig.title}</h2>
                  <h3>{returnFormattedArtistNames(gig.artistnames)}</h3>
                  <div> <Calendar /><p>{returnFormattedDate(gig.datetime)}</p></div>
                  <div> <Pin /><p>{gig.venue}</p></div>
                  <div> <Ticket /><p>{gig.ticketprice}</p></div>
                  <div> <a target="_blank" href={gig.ticketslink}>Tickets</a></div>
                </div>
                <div className="poster-parent">
                  <img src={gig.gigposter.url} />
                </div>
              </div>
            </div>
          )
          : <div style={{ textAlign: "center" }}>
            <h2 style={{ paddingBottom: "1em" }}>No gigs at this time.</h2>
            <p>check back in later, or reach out if you want a band for your cousin's 10th birthday party!</p>
          </div>}
      </div>
    </section>
  )
}
