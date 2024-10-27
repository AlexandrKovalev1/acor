import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { gql } from 'graphql-request'

type ClassTypes = { standard: boolean; code?: boolean } & Omit<Tree, 'classTypes'>

type Tree = {
  id: string
  name: string
  description: string
  sort: number
  classTypes: ClassTypes[]
}

type ModelTreeClasses = {
  modelTreeClasses: {
    tree: Tree[]
  }
}

export const modelTreeClassesApi = createApi({
  reducerPath: 'modelTreeClassesApi',
  baseQuery: graphqlRequestBaseQuery({
    url: 'http://80.90.190.26:8081/graphql',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      } else {
        // use refresh token or navigate to login
      }
      return headers
    },
  }),

  endpoints: builder => ({
    getModelTreeClasses: builder.query<ModelTreeClasses, void>({
      query: () => ({
        document: gql`
          query classes {
            modelTreeClasses {
              tree {
                id
                name
                description
                sort
                classTypes {
                  id
                  name
                  description
                  sort
                  standard
                  code
                }
              }
            }
          }
        `,
      }),
    }),
  }),
})

export const { useGetModelTreeClassesQuery } = modelTreeClassesApi
