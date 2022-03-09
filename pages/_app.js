import 'antd/dist/antd.css';
import '../styles/globals.css';

import React, { useState } from 'react';
import Layout from '../components/layout';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }) {
  const [searchText, setSearchText] = useState('top 100');
  const [searchOption, setSearchOption] = useState('list');

  return (
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
  );
}

export default MyApp;
