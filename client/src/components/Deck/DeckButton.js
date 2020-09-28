import React from 'react';
import {Query} from '@apollo/react-components';
import {GET_DECK_TOTAL} from '../../constants/constants'
import Button from '../Button/Button';


const DeckButton = ({onClick}) => (
  <Query query={GET_DECK_TOTAL}>
    {({loading, error, data}) => (
      <Button onClick={onClick}>
        {loading || error ? 0 : data && data.deck.total}
      </Button>
    )}
  </Query>
);

export default DeckButton;
