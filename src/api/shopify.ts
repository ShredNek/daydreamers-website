async function proxyCall(query: string) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  const url = `${import.meta.env.VITE_SHOPIFY_MIDDLEWEAR_URL}/all`;

  const res = await fetch(url, config);
  console.log(await res.json());

  return res;
}

export async function getAllMerch() {
  return await proxyCall("{products(first:10){edges{node{id title }}}}");
}

// TODO - Create a function that calls ALL products and
// TODO - programmatically updates an object, indexed by their id's
// TODO - which will help index images faster, for instance

export async function getMerchById() {
  return await proxyCall(
    'query {glasses: product(id: "gid://shopify/Product/108828309") {  title  description}}'
  );
}
