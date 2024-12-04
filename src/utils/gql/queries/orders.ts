import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
query Order {
  orders {
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
  }
}
`;