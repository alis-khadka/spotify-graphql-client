import React, { useState } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Searchbar from './searchbar';
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const LANDING_PAGE = '/';

export default function Navbar({ setSearchText, setSearchOption }) {
  const router = useRouter();

  const [burgerClicked, setBurgerClicked] = useState(false);

  const handleDropdownChange = (value) => {
    setSearchOption(value);
    setSearchText('');
  };

  const handleSearchChange = (value) => {
    changePathConditionally();
    setSearchText(value);
  };

  const changePathConditionally = () => {
    if (router.pathname != LANDING_PAGE) {
      router.push(LANDING_PAGE);
    }
  };

  return (
    <Header>
      <div className="content-wrapper">
        <div className="navmenu">
          <div id="search-form">
            <Searchbar
              handleDropdownChange={handleDropdownChange}
              handleSearchChange={handleSearchChange}
            />
          </div>
          <span
            id="menu"
            onClick={() => {
              setBurgerClicked(!burgerClicked);
            }}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC9JREFUeNpi/P//PwM1AQsQU9VEJgYqg8FvICgMGUeel0eTzWiyGU02Qz/ZAAQYAOPcBjEdYroKAAAAAElFTkSuQmCC" />
          </span>
          <nav
            id="navbar"
            style={{ display: burgerClicked ? 'block' : 'none' }}
            itemProp="mainEntity"
            itemScope="itemscope"
            itemType="https://schema.org/SiteNavigationElement"
          >
            <ul className="navbar">
              <li>
                <Link href="/">
                  <a title="Home">
                    <span itemProp="name">Home</span>
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div style={{ clear: 'both' }} />
    </Header>
  );
};
