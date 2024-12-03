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

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($where: ProductWhereUniqueInput!) {
    deleteProduct(where: $where) {
      id
      name
    }
  }
`;
