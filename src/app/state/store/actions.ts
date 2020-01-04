import { GET_CONTINENTS, UPDATE_CONTINENTS } from './types'
import { eventDispatcher$ as  dispatch } from './index';








export const getContinents = () => {
  dispatch.next({
    type: GET_CONTINENTS
  });
};

export const updateContinents = (continents: string[]) => {
  dispatch.next({
    type: UPDATE_CONTINENTS,
    payload: continents
  });
  console.log(continents)
}
