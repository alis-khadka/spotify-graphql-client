import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { query } from '../../lib/spotify';
import { excludeKeys } from '../../lib/utilities';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  List,
  PageHeader,
  Skeleton,
  Avatar,
  Tag,
  Table,
  Row,
  Tooltip,
  Col,
  Button,
  Image,
  Typography,
} from 'antd';

const { Title, Text } = Typography;

export default function Playlist({ id, searchText, searchOption }) {
  const { loading, error, data } = useQuery(query.GET_PLAYLIST_WITH_TRACKS, {
    variables: { query: id },
  });

  const [page, setPage] = useState(1);

  let playlist = {};
  let tracks = Array(10).fill({});

  if (error) return <h2>{`Error! ${error}`}</h2>;
  if (data) {
    playlist = excludeKeys(data.queryIndividualPlaylist, ['tracks']);
    tracks = data.queryIndividualPlaylist.tracks;
  }

  const columns = [
    {
      title: '#',
      key: 'index',
      width: 60,
      render: (value, item, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      render: (name, obj) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={obj.image}
            height={50}
            width={50}
            style={{ marginRight: '16px' }}
          />
          <div>
            <div className="track-title-col">{name}</div>
            <Text
              className="text-gray"
              style={{ maxWidth: '150px' }}
              ellipsis={true}
            >
              {obj.artist_name}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Preview',
      dataIndex: 'preview_url',
      key: 'preview_url',
      width: 150,
      render: (previewUrl) => {
        if (!!previewUrl) {
          return (
            <a href={previewUrl} target="_blank" rel="noreferrer">
              <Tooltip placement="right" title="Preview in Spotify">
                <img
                  src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png"
                  height={28}
                />
              </Tooltip>
            </a>
          );
        } else {
          return (
            <Tooltip placement="right" title="Preview not available">
              <Tag color="orange" style={{ cursor: 'not-allowed' }}>
                N/A
              </Tag>
            </Tooltip>
          );
        }
      },
    },
    {
      title: 'Album',
      dataIndex: 'album_name',
      key: 'album_name',
    },
    {
      title: 'Uploaded at',
      dataIndex: 'added_at',
      key: 'added_at',
    },
  ];

  const titleContent = (
    <div>
      <Tag color="blue">Playlist</Tag>

      <div className="playlist-title">{playlist?.name}</div>

      <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}>
        <FontAwesomeIcon
          icon={faMusic}
          style={{ height: '16px', marginRight: '6px' }}
        />
        <span className="text-gray">Total tracks:&nbsp;</span>
        {tracks?.length}

        <a
          className="spotify-link-full"
          href={playlist?.spotify_url}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            style={{
              marginLeft: '60px',
              padding: '3px',
              borderRadius: '10px',
              height: '50px',
              width: '170px',
            }}
            icon={
              <img
                src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png"
                height={30}
              />
            }
          >
            <span
              className="spotify-link"
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              &nbsp;Open In Spotify
            </span>
          </Button>
        </a>
        <a
          className="spotify-link-icon-only"
          href={playlist?.spotify_url}
          target="_blank"
          rel="noreferrer"
        >
          <Tooltip placement="right" title="Open In Spotify">
            <Button
              style={{
                marginLeft: '80px',
                padding: '3px',
                borderRadius: '50px',
                height: '50px',
                width: '50px',
              }}
              icon={
                <img
                  src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png"
                  height={30}
                />
              }
            />
          </Tooltip>
        </a>
      </div>
    </div>
  );

  return (
    <div className="playlist-container">
      <Skeleton active={true} loading={loading}>
        <PageHeader
          title={titleContent}
          className="site-page-header playlist-header"
          avatar={{
            src: playlist?.image,
            shape: 'square',
            className: 'playlist-cover',
          }}
        />
      </Skeleton>

      {/* Large screen table view: Start */}
      <Table
        className="tracks-table"
        loading={loading}
        columns={columns}
        dataSource={tracks}
        pageSizeOptions={false}
        rowKey="id"
        pagination={{
          pageSize: 10,
          onChange(current) {
            setPage(current);
          },
        }}
        scroll={{ y: 400 }}
      />
      {/* Large screen table view: End */}

      {/* Small-Medium screen table view: Start */}
      <div className="tracks-list">
        <Title level={3} style={{ marginTop: '20px' }}>
          Tracks
        </Title>
        <div
          style={{
            height: '60vh',
            overflow: 'auto',
            padding: '0 0 0 16px',
            backgroundColor: 'azure',
            borderRadius: '10px',
          }}
        >
          <InfiniteScroll
            dataLength={tracks.length}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={tracks}
              renderItem={(item) => (
                <Skeleton avatar title={false} loading={loading} active>
                  <List.Item
                    key={item.id}
                    actions={previewAndUploadedDetails(item)}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.image} shape="square" size={50} />
                      }
                      title={
                        <Text ellipsis={true} style={{ maxWidth: '180px' }}>
                          {item.name}
                        </Text>
                      }
                      description={
                        item.artist_name?.length
                          ? `By ${item.artist_name}`
                          : null
                      }
                    />
                  </List.Item>
                </Skeleton>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
      {/* Small-Medium screen table view: End */}
    </div>
  );
}

const previewAndUploadedDetails = (track) => {
  let preview;
  const uploadedAt = (
    <Tooltip placement="right" title="Uploaded at">
      {track.added_at}
    </Tooltip>
  );
  if (!!track.preview_url) {
    preview = (
      <a href={track.preview_url} target="_blank" rel="noreferrer">
        <Tooltip placement="right" title="Preview in Spotify">
          <img
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png"
            height={28}
          />
        </Tooltip>
      </a>
    );
  } else {
    preview = (
      <Tooltip placement="right" title="Preview not available">
        <Tag color="orange" style={{ cursor: 'not-allowed' }}>
          N/A
        </Tag>
      </Tooltip>
    );
  }

  return [preview, uploadedAt];
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}
