{/* <div id='product-component-1703987104859'></div> */ }

import { useEffect } from "react";
import { buyButtonScript } from "../../helper/buyButton"

type BuyButtonComponent = {
  productId: string
}

export default function BuyButton({ productId }: BuyButtonComponent) {

  let firstLoad = true
  useEffect(() => {
    if (firstLoad) {
      firstLoad = false
    } else {
      buyButtonScript({ productId })
    }

  }, [])

  return (
    <div id="product-component" />
  )
}


