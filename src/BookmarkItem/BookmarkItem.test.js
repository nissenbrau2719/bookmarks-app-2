import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkItem from './BookmarkItem';

const testBookmark = {
  title: "Google",
  url: "https://www.google.com",
  id: 123,
  rating: 1
}
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookmarkItem title={testBookmark.title} url={testBookmark.url} rating={testBookmark.rating} id={testBookmark.id}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
