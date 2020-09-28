import React from 'react'
import {Mutation} from '@apollo/react-components';
import Button from '../Button/Button'
import {ADD_TO_DECK, GET_DECK, GET_DECK_TOTAL} from '../../constants/constants'

const AddToDeckButton = ({productId}) => {
  return (
    <Mutation mutation={ADD_TO_DECK} refetchQueries={[{query: GET_DECK}, {query: GET_DECK_TOTAL}]}>
      {addToDeck => (
        <Button onClick={() => addToDeck({variables: {productId}})}>
          {`+ Add to deck`}
        </Button>
      )}
    </Mutation>
  )
}

export default AddToDeckButton
