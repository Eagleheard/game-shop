import { runSaga } from 'redux-saga';

import * as cartApi from 'api/fetchCart';
import * as achievementApi from 'api/fetchAchievements';
import { getStore, getDiscount } from 'store/cart/sagas';
import { getCartRequest, getCartSuccess, getDiscountRequest, getDiscountSuccess } from '../actions';

describe('Cart', () => {
it('get games that in cart', async () => {
    const dispatchedActions = [];

    const mockedBasket = {data: []};
    cartApi.getBasket = jest.fn(() => Promise.resolve(mockedBasket));
    const fakeStore = {
        getState: () => ({}),
        dispatch: (action) => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, getStore).done;
    expect(cartApi.getBasket.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(getCartSuccess([]));
})

it('get discounts for 1 user', async () => {
    const dispatchedActions = [];

    const mockedAchievements = [];
    achievementApi.fetchAchievement = jest.fn(() => Promise.resolve(mockedAchievements));

    const fakeStore = {
        getState: () => ({ discounts: [] }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, getDiscount).done;
    expect(achievementApi.fetchAchievement.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(getDiscountRequest(mockedAchievements));
})
})