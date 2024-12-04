import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query GetOrders {
    orders {
      id
      total_price
      address
      order_history_id
      created_at
      updated_at
      user {
        id
        name
        email
        image
      }
    }
  }
`;