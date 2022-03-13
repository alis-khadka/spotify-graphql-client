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

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

test('should search for the provided query', async () => {
  await act(async () => {
    await preloadAll();
    const { container } = render(<MyApp Component={App} />);

    const searchField = container.querySelector('#search-field');
    expect(searchField).toBeInTheDocument();

    fireEvent.change(searchField, { target: { value: 'test query' } });
    const searchBtn = container.querySelector('.ant-input-search-button');
    fireEvent.click(searchBtn);
    await new Promise((r) => setTimeout(r, 4000));
    expect(
      container.querySelector('.ant-page-header-heading-title').innerHTML
    ).toBe('Results for: test query');
  });
});

test('should navigate to the specific playlist page when clicked on an playlist from the results', async () => {
  await act(async () => {
    await preloadAll();
    const { container } = render(<MyApp Component={App} />);

    await new Promise((r) => setTimeout(r, 4000));

    const playlistCard = container.querySelector(
      '[rowkey="5ABHKGoOzxkaa28ttQV9sE"]'
    );
    fireEvent.click(playlistCard);
    await new Promise((r) => setTimeout(r, 4000));

    expect(singletonRouter).toMatchObject({
      asPath: '/playlists/5ABHKGoOzxkaa28ttQV9sE',
    });
  });
});
