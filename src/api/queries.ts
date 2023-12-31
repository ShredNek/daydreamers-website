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
      productType
      createdAt
      tags
      totalInventory
      images(first: 5) {
        edges {
          node {
            src
          }
        }
      }
      variants(first: 75) {
        edges {
          node {
            title
            price
            selectedOptions {
              name
              value
            }
            image {
              src
            }
            inventoryQuantity
          }
        }
      }
    }
  }
`;

export const GET_VARIANT_DETAILS = gql`
  query GetOneMerch {
    product(id: "gid://shopify/Product/MERCH_ID") {
      variants(first: 100) {
        edges {
          node {
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
