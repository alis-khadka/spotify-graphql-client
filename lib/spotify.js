import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql/',
//   cache: new InMemoryCache(),
// });

export const queryTypes = Object.freeze({
  list: 'SEARCH_PLAYLISTS',
  specific: 'GET_PLAYLIST',
});

export const query = Object.freeze({
  SEARCH_PLAYLISTS: gql`
    query SearchPlaylists($query: String!) {
      queryPlaylists(byPlaylistName: $query) {
        id
        name
        image
        description
        spotify_url
        owner_name
      }
    }
  `,

  GET_PLAYLIST: gql`
    query GetPlaylist($query: String!) {
      queryIndividualPlaylist(byPlaylistId: $query) {
        id
        name
        image
        description
        spotify_url
        owner_name
      }
    }
  `,

  GET_PLAYLIST_WITH_TRACKS: gql`
    query GetPlaylistWithTracks($query: String!) {
      queryIndividualPlaylist(byPlaylistId: $query) {
        id
        name
        image
        description
        spotify_url
        owner_name
        tracks {
          id
          name
          image
          preview_url
          album_name
          added_at
          artist_name
        }
      }
    }
  `,
});
