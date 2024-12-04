import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
query Order {
  orders {
    id
    address
    created_at
    total_price
    updated_at
    orderHistory {
      changed_at
      order_id
      status {
        description
        name
      }
    }
    user {
      email
      name
    }
    productOrders {
      include_cutlery
      product_subtotal
      total_product
      product {
        description
        name
        price
        special_instructions
      }
    }
  }
}
`;