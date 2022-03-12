import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
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
} from 'antd';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { query } from '../../lib/spotify';
import { excludeKeys } from '../../lib/utilities';

export default function Playlist({ id, searchText, searchOption }) {
  const { loading, error, data } = useQuery(query.GET_PLAYLIST_WITH_TRACKS, {
    variables: { query: id },
  });

  const [page, setPage] = useState(1);

  let playlist = {};
  let tracks = [];

  if (error) return <h2>{`Error! ${error}`}</h2>;
  if (data) {
    playlist = excludeKeys(data.queryIndividualPlaylist, ['tracks']);
    tracks = data.queryIndividualPlaylist.tracks;
  }

  const columns = [
    {
      title: '#',
      key: 'index',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      render: (value, item, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      render: (name, obj) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={obj.image}
            height={50}
            width={50}
            style={{ marginRight: '16px' }}
          />
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{name}</div>
            <div className="text-gray">{obj.artist_name}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Preview',
      dataIndex: 'preview_url',
      key: 'preview_url',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      render: (previewUrl) => (
        <a href={previewUrl} target="_blank">
          <Tooltip placement="right" title="Preview in Spotify">
            <img
              src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png"
              height={28}
            />
          </Tooltip>
        </a>
      ),
    },
    {
      title: 'Album',
      dataIndex: 'album_name',
      key: 'album_name',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    {
      title: 'Uploaded at',
      dataIndex: 'added_at',
      key: 'added_at',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
  ];

  const titleContent = (
    <div>
      <Tag color="blue">Playlist</Tag>

      <div style={{ fontSize: '52px', margin: '28px 0' }}>{playlist?.name}</div>
      <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}>
        <FontAwesomeIcon
          icon={faMusic}
          style={{ height: '16px', marginRight: '6px' }}
        />
        <span className="text-gray">Total tracks:&nbsp;</span>
        {tracks?.length}

        <a href={playlist?.spotify_url} target="_blank">
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
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
              &nbsp;Open In Spotify
            </span>
          </Button>
        </a>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '0 150px' }}>
      <Skeleton active={true} loading={loading}>
        <PageHeader
          title={titleContent}
          className="site-page-header playlist-header"
          avatar={{
            src: playlist?.image,
            size: 250,
            shape: 'square',
          }}
        />
      </Skeleton>
      <Table
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
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}
