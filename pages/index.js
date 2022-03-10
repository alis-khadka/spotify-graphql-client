import { useQuery } from '@apollo/client';
import { query, queryTypes } from '../lib/spotify';
import Playlists from '../components/playlists';

import { useState } from 'react';

export default function App({ searchOption, searchText }) {
  const [response, setResponse] = useState([]);
  const { loading, error, data } = useQuery(query[queryTypes[searchOption]], {
    variables: { query: searchText },
    skip: !searchText,
    onCompleted: (data) => {
      if (data && searchOption == 'specific') {
        setResponse([data.queryIndividualPlaylist]);
      } else {
        setResponse(data.queryPlaylists);
      }
    },
  });

  if (loading)
    return (
      <Playlists
        playlistsArr={Array(10).fill({})}
        isLoading={!!loading}
        searchText={searchText}
      />
    );

  if (error && searchOption == 'specific') {
    return (
      <Playlists playlistsArr={[]} isLoading={false} searchText={searchText} />
    );
  } else if (error) {
    return <h2>{`Error! ${error}`}</h2>;
  }

  return (
    <Playlists
      playlistsArr={response || []}
      isLoading={!!loading}
      searchText={searchText}
    />
  );
}
