import { shallow } from 'enzyme';
import * as React from 'react';

import { Dialog } from '../../../src/renderer/components/dialog';
import { overridePlatform, resetPlatform } from '../../utils';

describe('Dialog component', () => {
  beforeAll(() => {
    // We render the buttons different depending on the
    // platform, so let' have a uniform platform for unit tests
    overridePlatform('darwin');
  });

  afterAll(() => {
    resetPlatform();
  });

  it('renders if showing', () => {
    const wrapper = shallow(<Dialog isShowing={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render if not showing', () => {
    const wrapper = shallow(<Dialog isShowing={false} />);
    expect(wrapper.type()).toBe(null);
  });

  it('renders a backdrop', () => {
    const wrapper = shallow(<Dialog isShowing={true} isShowingBackdrop={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onClose when closed', () => {
    const onClose = jest.fn();
    const wrapper = shallow(<Dialog isShowing={true} onClose={onClose} />);
    wrapper.find('button.btn-close').simulate('click');

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onConfirm when closed', () => {
    const onConfirm = jest.fn();
    const wrapper = shallow(<Dialog isShowing={true} onConfirm={onConfirm} />);
    wrapper.find('button.btn-ok').simulate('click');

    expect(onConfirm).toHaveBeenCalled();
  });
});
