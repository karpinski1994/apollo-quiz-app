import React from 'react';
import styled from 'styled-components';
import {Query} from '@apollo/react-components';
import {GET_DECK} from '../../constants/constants';
import {Link} from 'react-router-dom';
import SubHeader from '../Header/SubHeader';
import ProductItem from '../Products/ProductItem';
import Totals from './Totals';
import Button from '../Button/Button';

const DeckWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const DeckItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Deck = ({match, history}) => (
  <>
    {history && (
      <SubHeader title='Deck' goToDeck={() => history.push('/deck')} />
    )}
    <Query query={GET_DECK}>
      {({loading, error, data}) => {
        if (loading || error) {
          return <Alert>{loading ? 'Loading...' : error}</Alert>;
        }
        return (
          <DeckWrapper>
            <DeckItemsWrapper>
              {data.deck.products &&
                data.deck.products.map((product) => (
                  <ProductItem key={product.id} data={product} />
                ))}
            </DeckItemsWrapper>
            <Totals count={data.deck.total} />
            <Link to='/checkout'>
              <Button color='royalBlue'>Checkout</Button>
            </Link>
          </DeckWrapper>
        );
      }}
    </Query>
  </>
);

export default Deck;
