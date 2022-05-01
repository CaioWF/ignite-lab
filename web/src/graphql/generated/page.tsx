import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../../lib/withApollo';
export async function getServerPageGetMe
    (options: Omit<Apollo.QueryOptions<Types.GetMeQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetMeQuery>({ ...options, query: Operations.GetMeDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetMe = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetMeQuery, Types.GetMeQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetMeDocument, options);
};
export type PageGetMeComp = React.FC<{data?: Types.GetMeQuery, error?: Apollo.ApolloError}>;
export const withPageGetMe = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetMeQuery, Types.GetMeQueryVariables>) => (WrappedComponent:PageGetMeComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetMeDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetMe = {
      getServerPage: getServerPageGetMe,
      withPage: withPageGetMe,
      usePage: useGetMe,
    }
export async function getServerPageGetProducts
    (options: Omit<Apollo.QueryOptions<Types.GetProductsQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetProductsQuery>({ ...options, query: Operations.GetProductsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetProducts = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetProductsQuery, Types.GetProductsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetProductsDocument, options);
};
export type PageGetProductsComp = React.FC<{data?: Types.GetProductsQuery, error?: Apollo.ApolloError}>;
export const withPageGetProducts = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetProductsQuery, Types.GetProductsQueryVariables>) => (WrappedComponent:PageGetProductsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetProductsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetProducts = {
      getServerPage: getServerPageGetProducts,
      withPage: withPageGetProducts,
      usePage: useGetProducts,
    }