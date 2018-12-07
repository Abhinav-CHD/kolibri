import VueRouter from 'vue-router';
import { mount } from '@vue/test-utils';
import Index from '../../src/views/DeviceIndex';
import { makeAvailableChannelsPageStore } from '../utils/makeStore';

jest.mock('kolibri.urls');

function makeStore() {
  return makeAvailableChannelsPageStore();
}

function makeWrapper(store) {
  const router = new VueRouter({
    routes: [
      {
        name: 'MANAGE_CONTENT_PAGE',
        path: '/content',
      },
      {
        name: 'SELECT_CONTENT',
        path: '/content/channel/:channel_id',
      },
    ],
  });
  const wrapper = mount(Index, {
    store: store || makeStore,
    router,
  });
  const els = {
    CoreBase: () => wrapper.find({ name: 'CoreBase' }),
  };
  return { wrapper, els };
}

describe('device management index page', () => {
  let store;

  beforeEach(() => {
    store = makeStore();
  });

  it('core-base is immersive when at the SELECT_CONTENT page', () => {
    store.commit('SET_PAGE_NAME', 'SELECT_CONTENT');
    const { els } = makeWrapper(store);
    expect(els.CoreBase().props().immersivePage).toEqual(true);
  });

  it('core-base is immersive when at the AVAILABLE_CHANNELS page', () => {
    store.commit('SET_PAGE_NAME', 'AVAILABLE_CHANNELS');
    const { els } = makeWrapper(store);
    expect(els.CoreBase().props().immersivePage).toEqual(true);
  });
});
