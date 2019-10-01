import { shallow } from 'enzyme';
import React from 'react';
import App from './App';


describe('App', () => {
  test('App renders', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists()).toBe(true);
  });
});
