import { gql } from '@apollo/client';

export const CREATE_ORDER_HISTORY = gql`
  mutation CreateOrderHistory($data: OrderHistoryCreateInput) {
    createOrderHistory(data: $data) {
      order_id
      status {
        name
        id
        description
      }
    }
  }
`;
