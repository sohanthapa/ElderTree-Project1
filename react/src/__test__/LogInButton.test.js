import { createShallow, createMount } from '@material-ui/core/test-utils';
import { shallow, mount } from 'enzyme';
import React from 'react';
import LogInButton from '../components/login/LogInButton';


describe('<LogIn />', () => {
  it('App renders', () => {
    const wrapper = shallow(<LogInButton />);

    expect(wrapper.exists()).toBe(true);
  });
});
