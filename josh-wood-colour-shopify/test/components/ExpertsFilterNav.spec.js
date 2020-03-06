/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import ExpertsFilterNav from '../../src/js/components/react/ExpertsFilterNav';
import {filters} from '../stubs/experts';

describe('Component: <ExpertsFilterNav />', () => {
    it('renders a nav', () => {
        const wrapper = shallow(
            <ExpertsFilterNav activeFilter={null} filters={filters} handleClick={() => {}} />
        );
        const actual = wrapper.find('.c-filter-nav').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders the active filter in a data attribute', () => {
        const wrapper = shallow(
            <ExpertsFilterNav
                activeFilter={filters[0].slug}
                filters={filters}
                handleClick={() => {}}
            />
        );
        const actual = wrapper.find('.c-filter-nav').prop('data-filter');
        const expected = filters[0].slug;

        expect(actual).to.equal(expected);
    });

    it('renders each filter', () => {
        const wrapper = shallow(
            <ExpertsFilterNav
                activeFilter={filters[0].slug}
                filters={filters}
                handleClick={() => {}}
            />
        );
        const actual = wrapper.find('.c-filter-nav li').length;
        const expected = filters.length;

        expect(actual).to.equal(expected);
    });

    it("renders the filter's name", () => {
        const wrapper = shallow(
            <ExpertsFilterNav
                activeFilter={filters[0].slug}
                filters={filters}
                handleClick={() => {}}
            />
        );
        const actual = wrapper.find(`.c-button[data-filter="${filters[0].slug}"]`).text();
        const expected = filters[0].name;

        expect(actual).to.equal(expected);
    });

    it('renders a different style for the active filter', () => {
        const wrapper = shallow(
            <ExpertsFilterNav
                activeFilter={filters[0].slug}
                filters={filters}
                handleClick={() => {}}
            />
        );
        const actual =
            wrapper
                .find(`.c-button[data-filter="${filters[0].slug}"]`)
                .prop('className')
                .indexOf('c-button--black') !== -1;
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('handles the click of a filter', () => {
        const mockClickHandler = spy();
        const wrapper = shallow(
            <ExpertsFilterNav
                activeFilter={filters[0].slug}
                filters={filters}
                handleClick={mockClickHandler}
            />
        );

        wrapper.find(`.c-button[data-filter="${filters[0].slug}"]`).prop('onClick')();

        const actual = mockClickHandler.calledWith(filters[0].slug);
        const expected = true;

        expect(actual).to.equal(expected);
    });
});
