import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import MyApp from '../../pages/_app';
import App from '../../pages/index';

jest.setTimeout(100000);

jest.mock('next/dist/client/router', () => require('next-router-mock'));

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

test('should search for the provided query', async () => {
  await preloadAll();
  const { container } = render(<MyApp Component={App} />);

  const searchField = container.querySelector('#search-field');
  expect(searchField).toBeInTheDocument();

  searchField.value = 'test query';
  const searchBtn = container.querySelector('.ant-input-search-button');

  searchBtn.click();
  await new Promise((r) => setTimeout(r, 4000));
  
  expect(
    container.querySelector('.ant-page-header-heading-title').innerHTML
  ).toBe('Results for: test query');
});
