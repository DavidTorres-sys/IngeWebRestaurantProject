import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($data: ProductCreateInput!) {
    createProduct(data: $data) {
      id
      name
      description
      price
      special_instructions
      category_id
      image_url
    }
  }
`;
