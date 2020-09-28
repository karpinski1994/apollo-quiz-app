import React from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import ProductItem from './ProductItem';
import Filter from './Filter';
import {Query} from '@apollo/react-components';
import {useQuery} from '@apollo/client';

import {GET_PRODUCTS, GET_LIMIT} from '../../constants/constants';

const ProductItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;
const Products = ({history}) => {
  const {
    data: {limit},
  } = useQuery(GET_LIMIT);
  const {data, error, loading} = useQuery(GET_PRODUCTS, {
    variables: {limit: parseInt(limit)},
  });
  if (loading || error) {
    return <Alert>{loading ? 'Loading...' : error.message}</Alert>;
  }
  return (
    <>
      {history && (
        <SubHeader
          title='Available decks'
          goToDeck={() => history.push('/deck')}
        />
      )}
      <>
        <Filter limit={parseInt(limit)} />
        <ProductItemsWrapper>
          {data.products &&
            data.products.map((product) => (
              <ProductItem key={product.id} data={product} />
            ))}
        </ProductItemsWrapper>
      </>
    </>
  );
};

export default Products;
