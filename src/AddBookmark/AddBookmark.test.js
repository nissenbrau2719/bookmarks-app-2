import React from 'react';
import ReactDOM from 'react-dom';
import AddBookmark from './AddBookmark';

const history = {
  push: () => {}
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddBookmark history={history}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
