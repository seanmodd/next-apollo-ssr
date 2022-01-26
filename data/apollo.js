import {
  ApolloClient,
  InMemoryCache,
  gql,
  //  gql
} from '@apollo/client';
// import gql from 'graphql-tag';

const isServer = typeof window === 'undefined';
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

let CLIENT;

export function getApolloClient(forceNew) {
  if (!CLIENT || forceNew) {
    CLIENT = new ApolloClient({
      ssrMode: isServer,
      // uri: 'https://api.graphql.jobs/',
      uri: 'https://api.shopcarx.com/graphql',
      // uri: 'http://localhost:1337/graphql',
      cache: new InMemoryCache().restore(windowApolloState || {}),

      /**
        // Default options to disable SSR for all queries.
        defaultOptions: {
          // Skip queries when server side rendering
          // https://www.apollographql.com/docs/react/data/queries/#ssr
          watchQuery: {
            ssr: false
          },
          query: {
            ssr: false
          }
          // Selectively enable specific queries like so:
          // `useQuery(QUERY, { ssr: true });`
        }
      */
    });
  }

  return CLIENT;
}

export const QUERY = gql`
  query Jobs {
    jobs {
      id
      title
      postedAt
    }
  }
`;

// const ALLCARSQUERY = (dataPerPage = 24, pageNum = 1) => gql`
export const ALLCARSQUERY = () => gql`
  query Variants {
    #    variants(where: { product: { name_contains: "Chrysler" } }) {
     variants(limit: 1000) {
    # variants(limit: ${dataPerPage}, start: ${(pageNum - 1) * dataPerPage}) {
      car_carFax_status
      car_currentCarURL
      car_name
      car_make_name
      car_price
          }
  }
`;
