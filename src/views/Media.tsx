import { getAllMedia } from "../api/datoCmsCalls"
import { MediaCollection, MediaData } from "../types"
import { useEffect, useState } from "react"
import VideoPlayerHls from "../components/VideoPlayerHls"
import NavHeader from "../components/NavHeader"
import Footer from "../components/Footer"
import LazyImage from "../components/LazyImage"
import { MdOutlineFileDownload, MdOutlineShare } from "react-icons/md";
import { downloadImage, convertToPng } from "../helper/index"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Media() {
  const [media, setMedia] = useState<null | MediaData[]>(null)

  const callMediaOnLoad = async () => {
    const res: MediaCollection = (await (await getAllMedia()).json())
    setMedia(res.data.mediaCollection.mediaData)
  }

  const handleShare = async (imgUrl: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this image',
          text: 'Here is an image I wanted to share with you',
          url: imgUrl
        });
      } else {
        const response = await fetch(imgUrl);
        let blob: Blob = await response.blob();

        if (!blob.type.startsWith('image/png')) blob = await convertToPng(blob)

        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
        toast.info("Image copied to clipboard")
      }
    } catch (error) {
      toast.error("There was an error sharing this image")
      console.error(`Error sharing this image link ${imgUrl}. Error caught:`, error);
    }
  }

  useEffect(() => {
    callMediaOnLoad()
  }, [])

  return (
    <>
      <NavHeader linkToDisable="Media" />
      <ToastContainer />
      <section className="media">
        <div className="media-container">
          {media?.map(media => (
            media.video ? (
              <VideoPlayerHls src={media.video.streamingUrl} key={media.id} />
            ) :
              <div className="lazy-image-parent" id={media.filename ?? media.id} key={media.id}>
                <div className="button-row">
                  <a onClick={() => handleShare(media.url)}><MdOutlineShare /></a>
                  <a onClick={() => downloadImage(media.url, media.filename ?? "downloaded image")} ><MdOutlineFileDownload /></a>
                </div>
                <div className="overlay" />
                <LazyImage
                  highQualitySrc={media.url}
                  lowQualitySrc={media.blurUpThumb}
                  alt={media.alt ?? media.filename ?? ""}
                />
              </div>
          ))
          }
        </div>
      </section>
      <Footer />
    </>
  )
}
