import { useEffect, useRef, useState } from "react";
import { buyButtonScript } from "../../helper/buyButton"
import { getProductTitle } from "../../helper/componentHelpers";

type BuyButtonComponent = {
  productId: string
}

export default function BuyButton({ productId }: BuyButtonComponent) {
  const productComponentRef = useRef<HTMLDivElement>(null);
  const [productTitle, setProductTitle] = useState("");

  const launchComponentAndReadTitle = async () => {
    buyButtonScript({ productId })
    setProductTitle(await getProductTitle(productComponentRef))
    const event = new CustomEvent('reveal', { bubbles: true, cancelable: true, });
    productComponentRef.current?.dispatchEvent(event);
  }

  let firstLoad = true
  useEffect(() => {
    if (firstLoad) {
      firstLoad = false
    } else {
      launchComponentAndReadTitle()
    }
  }, [])

  // useEffect(() => {
  //   console.log(productTitle)
  // }, [productTitle])

  return (
    <>
      <h1 className="heading">{productTitle}</h1>
      <div id="product-component" ref={productComponentRef} />
    </>
  )
}


