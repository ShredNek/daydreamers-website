import { gql } from "graphql-tag";

// ? Dato queries

export const GET_ALL_SHOWS = gql`
  query GetAllShows {
    allShows {
      id
      title
      venue
      venuelocation {
        latitude
        longitude
      }
      datetime
      details
      poster {
        format
        filename
        url
      }
      ticketslink
      ticketprice
      artists {
        name
        socialsLink
      }

      _status
      _firstPublishedAt
    }

    _allShowsMeta {
      count
    }
  }
`;

export const GET_ALL_MUSIC = gql`
  query GetAllMusic {
    allSongCollections {
      appleMusicLink
      collectionType
      duration
      id
      name
      otherViewsLink
      releaseDate
      spotifyLink
      trackList {
        title
        id
        duration
        lyrics
      }
      _status
      _firstPublishedAt
      coverArt {
        url
      }
    }
  }
`;

export const GET_ALL_MEDIA = gql`
  query GetAllMedia {
    mediaCollection {
      mediaData {
        id
        url
        _createdAt
        height
        width
        alt
        filename
        blurUpThumb
        video {
          duration
          mp4Url
          streamingUrl
          thumbnailUrl
          width
        }
      }
    }
  }
`;
