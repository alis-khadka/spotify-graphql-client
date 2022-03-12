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

  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: 'https://ant.design',
      title: `ant design part ${i}`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

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
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listData}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
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
