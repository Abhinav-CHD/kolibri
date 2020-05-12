import VueRouter from 'vue-router';
import { mount, createLocalVue } from '@vue/test-utils';
import SignUpPage from '../../src/views/SignUpPage';
import makeStore from '../makeStore';

const localVue = createLocalVue();
localVue.use(VueRouter);

function makeWrapper() {
  const store = makeStore();
  store.state.core.facilities = [{ id: 1, name: 'facility' }];
  store.state.facilityId = 1;
  return mount(SignUpPage, {
    store,
    router: new VueRouter({
      routes: [{ name: 'SIGN_IN', path: '/signin' }],
    }),
    methods: {
      // To silence router error
      goToFirstStep() {
        return Promise.resolve();
      },
    },
  });
}

describe('signUpPage component', () => {
  it('smoke test', () => {
    const wrapper = makeWrapper();
    expect(wrapper.isVueInstance()).toEqual(true);
  });
});
