import React from 'react';
import Link from 'next/link';
import { List, Card, Empty, Skeleton } from 'antd';
import { PageHeader } from 'antd';

const { Meta } = Card;
const invalidResponse = [
  { id: 1, title: 'No results found for the provided query.' },
  { id: 2, title: 'Please check your query & try again.' },
];

function Playlists({ playlistsArr, isLoading, searchText }) {
  if (playlistsArr.length) {
    return (
      <List
        className="scrollable-playlists"
        grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 7 }}
        style={{ marginLeft: '30px' }}
        pagination={{
          pageSize: 14,
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
        renderItem={(item, index) => (
          <Link href={`/playlists/${item.id}`}>
            <Card
              rowkey={item.id}
              hoverable={true}
              loading={isLoading}
              cover={
                isLoading ? (
                  <Skeleton.Image />
                ) : (
                  <img
                    alt="Playlist cover picture"
                    src={item.image}
                    style={{
                      padding: '16px',
                      height: '200px',
                      borderRadius: '12%',
                      objectFit: 'cover',
                    }}
                  />
                )
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
