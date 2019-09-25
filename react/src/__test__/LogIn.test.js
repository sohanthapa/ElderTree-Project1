import { createShallow, createMount } from '@material-ui/core/test-utils';
import { shallow, mount } from 'enzyme';
import React from 'react';
import LogIn from '../components/login/LogIn';


describe('<LogIn />', () => {
  test('App renders', () => {
    const wrapper = shallow(<LogIn />);

    expect(wrapper.exists()).toBe(true);
  });
});
