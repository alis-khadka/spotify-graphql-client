import React from 'react';
import Link from 'next/link';
import { List, Card, Empty, Avatar } from 'antd';
import { PageHeader } from 'antd';

const { Meta } = Card;

function Playlists({ playlistsArr, isLoading, searchText }) {
  const invalidResponse = [
    { id: 1, title: 'Ne results found for the provided query.' },
    { id: 2, title: 'Please check your query & try again.' },
  ];

  if (playlistsArr.length) {
    return (
      <List
        className="scrollable-playlists"
        grid={{ xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 8 }}
        style={{ marginLeft: '30px' }}
        pagination={{
          pageSize: 16,
        }}
        dataSource={playlistsArr}
        header={
          isLoading ? (
            <PageHeader
              className="site-page-header"
              title={
                searchText == 'top 100'
                  ? 'Would you like to checkout the below playlists?'
                  : `Searching for: ${searchText}`
              }
            />
          ) : (
            <PageHeader
              className="site-page-header"
              title={
                searchText == 'top 100'
                  ? 'Would you like to checkout the below playlists?'
                  : `Results for: ${searchText}`
              }
            />
          )
        }
        renderItem={(item) => (
          <Link href={`/playlists/${item.id}`}>
            <Card
              rowkey={item.id}
              hoverable={true}
              loading={isLoading}
              cover={
                <img
                  alt="Playlist cover picture"
                  src={item.image}
                  style={{ padding: '16px', width: '180px', height: '180px' }}
                />
              }
              style={{
                width: '212px',
                height: '290px',
                margin: '10px',
                borderRadius: '4px',
              }}
            >
              <Meta
                style={{ paddingBottom: '8px' }}
                title={item.name}
                description={`By ${
                  item.owner_name && item.owner_name.length > 17
                    ? `${item.owner_name.substr(0, 15)}...`
                    : item?.owner_name
                }`}
              />
            </Card>
          </Link>
        )}
      />
    );
  } else {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={
          <List
            dataSource={invalidResponse}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta title={item.title} />
              </List.Item>
            )}
          />
        }
      ></Empty>
    );
  }
}

export default Playlists;
