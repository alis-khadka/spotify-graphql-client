import React from 'react';
import { Select, Input } from 'antd';

const { Option } = Select;
const { Search } = Input;

export default ({ handleDropdownChange, handleSearchChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Select
        defaultValue="list"
        style={{
          width: '80px',
          color: 'rgba(255, 255, 255, 0.65)',
        }}
        bordered={false}
        onChange={handleDropdownChange}
      >
        <Option value="list">Name</Option>
        <Option value="specific">Id</Option>
      </Select>
      <Search
        id="search-field"
        placeholder="Search"
        onSearch={(value) => {
          handleSearchChange(value);
        }}
        onKeyPress={(e) => {
          if (e.keyCode === 13) {
            handleSearchChange(value);
          }
        }}
        style={{ display: 'flex', flex: 1 }}
      />
    </div>
  );
};
