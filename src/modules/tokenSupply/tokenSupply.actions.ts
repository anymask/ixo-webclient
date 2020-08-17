import Axios from 'axios';
import { Dispatch } from 'redux';
import { TokenSupplyActions, GetTotalSupplyAction } from './types';

export const getTotalSupply = () => (
  dispatch: Dispatch,
): GetTotalSupplyAction => {
  return dispatch({
    type: TokenSupplyActions.GetTotalSupply,
    payload: Axios.get(`${process.env.REACT_APP_GAIA_URL  }/supply/total`, {
      transformResponse: [
        (response: string): any => {
          return JSON.parse(response).result;
        },
      ],
    }).then(response => {
      return { tokenSupply: response.data };
    }),
  });
};
