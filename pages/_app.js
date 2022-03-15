import 'antd/dist/antd.css';
import '../styles/globals.css';

import React, { useState } from 'react';
import Layout from '../components/layout';
import Navbar from '../components/navbar';

import fetch from 'cross-fetch';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';

const GRAPHQL_SERVER = process.env.NEXT_PUBLIC_GRAPHQL_SERVER || 'http://localhost:4000/graphql';

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_SERVER, fetch }),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  const [searchText, setSearchText] = useState('top 100');
  const [searchOption, setSearchOption] = useState('list');

  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Layout>
          <Navbar
            setSearchText={setSearchText}
            setSearchOption={setSearchOption}
          />
          <Component
            searchText={searchText}
            searchOption={searchOption}
            {...pageProps}
          />
        </Layout>
      </ApolloProvider>
    </ErrorBoundary>
  );
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default MyApp;
