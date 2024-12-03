import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS= gql`
  query Product {
    products {
      id
      name
      description
      price
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query Products($productsId: String!) {
    products(id: $productsId) {
      id
      name
      description
      price
      specialInstructions
    }
  }
`;