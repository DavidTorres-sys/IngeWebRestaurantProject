import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation Mutation($where: UserWhereUniqueInput!, $data: UserUpdateInput) {
    updateUser(where: $where, data: $data) {
      id
      name
      email
      role
      image
      deleted
      enabled
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUserCustom($data: userCreateInputCustom) {
    createUserCustom(data: $data) {
      name
      id
    }
  }
`;