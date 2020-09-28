import React from 'react';
import {ApolloConsumer} from '@apollo/client';

const Filter = ({limit}) => {
  console.log('Filter limit:', limit);
  return (
    <ApolloConsumer>
      {(client) => {
        return (
          <>
            <label htmlFor='limit'>Number of decks: </label>
            <select
              id='limit'
              value={limit}
              onChange={(e) =>
                client.cache.writeData({data: {limit: e.target.value}})
              }
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </>
        );
      }}
    </ApolloConsumer>
  );
};

export default Filter;
