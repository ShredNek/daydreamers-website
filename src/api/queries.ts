import { gql } from "graphql-tag";

export const GET_ALL_MERCH = gql`
  query GetAllMerch {
    products(first: 100) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

export const GET_ONE_MERCH = gql`
  query GetOneMerch {
    product(id: "gid://shopify/Product/MERCH_ID") {
      title
      variants(first: 100) {
        edges {
          node {
            id
            title
            price
            selectedOptions {
              name
              value
            }
            image {
              src
            }
          }
        }
      }
    }
  }
`;
