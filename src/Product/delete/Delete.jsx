import React from 'react';

function Delete({ deleted, history }) {
  deleted(history)
  return null;
}

export default Delete;