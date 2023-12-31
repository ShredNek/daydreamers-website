type BuyButtonScriptArgs = {
  productId: string;
};

export const buyButtonScript = ({ productId }: BuyButtonScriptArgs) => {
  let scriptURL =
    "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

  //@ts-ignore
  if (window.ShopifyBuy && window.ShopifyBuy.UI) {
    ShopifyBuyInit();
  } else {
    loadScript();
  }

  function loadScript() {
    let script = document.createElement("script");
    script.async = false;
    script.src = scriptURL;
    (
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(script);
    script.onload = ShopifyBuyInit;
  }

  function ShopifyBuyInit() {
    //@ts-ignore
    let client = ShopifyBuy.buildClient({
      domain: import.meta.env.VITE_SHOPIFY_SHOP_DOMAIN,
      storefrontAccessToken: import.meta.env.VITE_SHOPIFY_BUY_CLIENT_TOKEN,
    });
    //@ts-ignore
    ShopifyBuy.UI.onReady(client).then(function (ui: any) {
      ui.createComponent("product", {
        id: productId,
        node: document.getElementById("product-component"),
        moneyFormat: "%24%7B%7Bamount%7D%7D",
        options: {
          product: {
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0",
                  "margin-bottom": "50px",
                },
                "text-align": "left",
              },
              title: {
                "font-size": "26px",
                color: "#000000",
              },
              price: {
                "font-size": "18px",
              },
              compareAt: {
                "font-size": "15.299999999999999px",
              },
              unitPrice: {
                "font-size": "15.299999999999999px",
              },
            },
            layout: "horizontal",
            contents: {
              img: false,
              imgWithCarousel: true,
              description: true,
            },
            width: "100%",
            text: {
              button: "Add to cart",
            },
          },
          productSet: {
            styles: {
              products: {
                "@media (min-width: 601px)": {
                  "margin-left": "-20px",
                },
              },
            },
          },
          modalProduct: {
            contents: {
              img: false,
              imgWithCarousel: true,
              button: false,
              buttonWithQuantity: true,
            },
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0px",
                  "margin-bottom": "0px",
                },
              },
              title: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "bold",
                "font-size": "26px",
                color: "#4c4c4c",
              },
              price: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "normal",
                "font-size": "18px",
                color: "#4c4c4c",
              },
              compareAt: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "normal",
                "font-size": "15.299999999999999px",
                color: "#4c4c4c",
              },
              unitPrice: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "normal",
                "font-size": "15.299999999999999px",
                color: "#4c4c4c",
              },
            },
            text: {
              button: "Add to cart",
            },
          },
          option: {},
          cart: {
            text: {
              total: "Subtotal",
              button: "Checkout",
            },
            popup: false,
          },
          toggle: {},
        },
      });
    });
  }
};
