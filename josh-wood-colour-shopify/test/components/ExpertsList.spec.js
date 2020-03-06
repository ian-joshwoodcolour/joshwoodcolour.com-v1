/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import {mount} from 'enzyme';
import ExpertsList from '../../src/js/components/react/ExpertsList';
import {experts, filters} from '../stubs/experts';

describe('Component: <ExpertsList />', () => {
    it('renders a filter nav', () => {
        const wrapper = mount(<ExpertsList content={{experts, filters}} />);
        const actual = wrapper.find('ExpertsFilterNav').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders only unique filters for the nav', () => {
        const wrapper = mount(<ExpertsList content={{experts, filters}} />);
        const actual = wrapper.find('ExpertsFilterNav').prop('filters').length;
        const expected = 3;

        expect(actual).to.equal(expected);
    });

    it('renders a default filter if it exists in the URL', () => {
        window.location.hash = `#${filters[0].slug}`;

        const wrapper = mount(<ExpertsList content={{experts, filters}} />);
        const actual = wrapper.find('ExpertsFilterNav').prop('activeFilter');
        const expected = filters[0].slug;

        expect(actual).to.equal(expected);
    });

    it('renders a grid for the cards', () => {
        const wrapper = mount(<ExpertsList content={{experts, filters}} />);
        const actual = wrapper.find('.o-layout').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders each expert in a card', () => {
        const activeExperts = experts.filter(expert => expert.categorySlug === filters[0].slug);
        const wrapper = mount(<ExpertsList content={{experts, filters}} />);
        const actual = wrapper.find('ExpertsCard').length;
        const expected = activeExperts.length;

        expect(actual).to.equal(expected);
    });

    it('renders different cards when the filter changes', () => {
        const wrapper = mount(<ExpertsList content={{experts, filters}} />);

        wrapper.find(`.c-button[data-filter="${filters[1].slug}"]`).simulate('click');

        const activeExperts = experts.filter(expert => expert.categorySlug === filters[1].slug);
        const actual = wrapper.find('ExpertsCard').length;
        const expected = activeExperts.length;

        expect(actual).to.equal(expected);
    });
});
