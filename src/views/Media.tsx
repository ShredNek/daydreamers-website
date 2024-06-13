import { getAllMedia } from "../api/datoCmsCalls"
import { MediaCollection, MediaData } from "../types"
import { useEffect, useState } from "react"
import VideoPlayerHls from "../components/VideoPlayerHls"
import NavHeader from "../components/NavHeader"
import Footer from "../components/Footer"

export default function Media() {
  const [media, setMedia] = useState<null | MediaData[]>(null)
  const [imagesLoaded, setImagesLoaded] = useState({ total: 0, loaded: 0 })

  const callMediaOnLoad = async () => {
    const res: MediaCollection = (await (await getAllMedia()).json())
    setMedia(res.data.mediaCollection.mediaData)
  }

  useEffect(() => {
    callMediaOnLoad()
  }, [])

  useEffect(() => {
    const totalImages = media?.filter(m => m.video === null)?.length ?? 0
    setImagesLoaded((prev) => ({ ...prev, total: totalImages }))
  }, [media])

  useEffect(() => {
    console.log(imagesLoaded.loaded)
  }, [imagesLoaded])

  return (
    <>
      <NavHeader linkToDisable="Media" />
      <section className="media">
        <div className="media-container">
          {media?.map(media => (
            media.video ? (
              <VideoPlayerHls src={media.video.streamingUrl} key={media.id} />
            ) : (
              <img key={media.id}
                src={media.url}
                alt={media.alt ?? media.filename ?? ""}
                onLoad={() => setImagesLoaded(prev => ({ ...prev, loaded: prev.loaded + 1 }))}
              />
            )))
          }
        </div>
      </section>
      <Footer />
    </>
  )
}
