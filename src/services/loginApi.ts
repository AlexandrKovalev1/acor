import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

type Login = {
  email: string
  password: string
}

type AuthPayload = {
  login: {
    token: string
    organizations: {
      users: {
        name: string
        surname: string
      }[]
    }
  }
}

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: graphqlRequestBaseQuery({
    url: 'http://80.90.190.26:8081/graphql',
  }),
  endpoints: builder => ({
    login: builder.mutation<AuthPayload, Login>({
      query: data => ({
        document: gql`
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              organizations {
                users {
                  name
                  surname
                }
              }
            }
          }
        `,
        variables: {
          email: data.email,
          password: data.password,
        },
      }),
    }),
  }),
})

export const { useLoginMutation } = loginApi
