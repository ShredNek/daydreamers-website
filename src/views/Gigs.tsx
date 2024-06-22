import { useEffect, useState, useContext } from "react"
import { getAllGigs } from "../api/datoCmsCalls"
import { ComponentLoadingStatus, AllGigsEntity } from "../types/index"
import { returnFormattedArtistNames, returnFormattedDate, toKebabCase } from "../helper/index.tsx"
import { useNavigate } from "react-router-dom"
import { FADE_SPEED } from "../utils/globals"
import NavHeader from "../components/NavHeader";
import Pin from "../components/svg/Pin"
import Calendar from "../components/svg/Calendar"
import Ticket from "../components/svg/Ticket"
import { AppContext } from "../utils/AppContext"
import Footer from "../components/Footer"

export default function Gigs() {
  const [componentLoadingState, setComponentLoadingState] = useState<ComponentLoadingStatus>("transitioning static")
  const { gigData, setGigData } = useContext(AppContext)
  let navigate = useNavigate();

  const handleCardClick = (gigSlug: string) => {
    setComponentLoadingState("transitioning static");
    setTimeout(() => navigate(`/gig/${gigSlug}`), FADE_SPEED);
  }

  // ? On page load

  const callAndSetGigData = async () => {
    let rawData: AllGigsEntity | null = null;
    try {
      rawData = (await (await getAllGigs()).json())
    } catch (error) {
      throw Error(`getAllPosts API call failed - ${error}`)
    }

    if (rawData === null) throw Error("getAllPosts API call failed - rawData is null")
    const finalData: AllGigsEntity = {
      data: {
        ...rawData.data,
        allGigs:
          rawData.data.allGigs?.map(gig => ({
            ...gig,
            slugname: toKebabCase(gig.title)
          })) ?? null
      }
    }
    setGigData(finalData)
  }

  useEffect(() => {
    gigData === null
      ? callAndSetGigData()
      : setComponentLoadingState("")
  }, [])

  useEffect(() => {
    if (gigData && Object.entries(gigData).length) {
      setComponentLoadingState("")
    }
  }, [gigData])

  return (
    <>
      <NavHeader linkToDisable="Gigs" transitionOnNavItemClick={setComponentLoadingState} />
      <section className={componentLoadingState} id="gigs">
        <div id="cards">
          {gigData?.data.allGigs ?
            gigData.data.allGigs.map((gig) =>
              <div className="gig-card" key={gig.id}>
                <div className="body" onClick={() => handleCardClick(gig.slugname)}>
                  <div className="gig-details">
                    <h2>{gig.title}</h2>
                    <h3>{returnFormattedArtistNames(gig.artistnames)}</h3>
                    <div> <Calendar /><p>{returnFormattedDate(gig.datetime)}</p></div>
                    <div> <Pin /><p>{gig.venue}</p></div>
                    <div> <Ticket /><p>{gig.ticketprice}</p></div>
                    <div> <a className="button" target="_blank" href={gig.ticketslink}>Tickets</a></div>
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
      <Footer />
    </>
  )
}
