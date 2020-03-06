/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import {ExpertsCard} from '../../src/js/components/react/ExpertsCard';
import {experts} from '../stubs/experts';

describe('Component: <ExpertsCard />', () => {
    it('renders a card', () => {
        const wrapper = shallow(<ExpertsCard data={experts[0]} />);
        const actual = wrapper.find('.c-card').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it("renders a link to the expert's profile page", () => {
        const wrapper = shallow(<ExpertsCard data={experts[0]} />);
        const actual = wrapper.find('.c-card__title').prop('href');
        const expected = experts[0].profileLink;

        expect(actual).to.equal(expected);
    });

    it("renders the expert's name in a heading", () => {
        const wrapper = shallow(<ExpertsCard data={experts[0]} />);
        const actual = wrapper.find('.c-card__title .u-heading').text();
        const expected = experts[0].name;

        expect(actual).to.equal(expected);
    });

    it("renders the expert's role", () => {
        const wrapper = shallow(<ExpertsCard data={experts[0]} />);
        const actual = wrapper.find('.c-card__title span').text();
        const expected = experts[0].role;

        expect(actual).to.equal(expected);
    });

    it("renders the expert's title in a left position", () => {
        const wrapper = shallow(<ExpertsCard data={experts[0]} titlePosition="left" />);
        const actual = wrapper.find('.c-card__title--left').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it("renders the expert's title in a right position", () => {
        const wrapper = shallow(<ExpertsCard data={experts[0]} titlePosition="right" />);
        const actual = wrapper.find('.c-card__title--right').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it("renders without the expert's image when the card is not visible in the viewport", () => {
        const wrapper = shallow(<ExpertsCard data={experts[0]} />);
        const actual = wrapper.find('.c-card__image').prop('style').backgroundImage;
        const expected = null;

        expect(actual).to.equal(expected);
    });

    it("renders the expert's photo when the card is visible in the viewport", () => {
        const wrapper = shallow(<ExpertsCard data={experts[0]} isInViewport={true} />);
        const actual = wrapper.find('.c-card__image').prop('style').backgroundImage;
        const expected = `url(${experts[0].photo})`;

        expect(actual).to.equal(expected);
    });

    it('stops watching scroll position after the card is visible in the viewport for the first time', () => {
        const stopWatcher = spy();
        const wrapper = shallow(
            <ExpertsCard data={experts[0]} isInViewport={false} stopWatcher={stopWatcher} />
        );

        wrapper.setProps({isInViewport: true});

        const actual = stopWatcher.called;
        const expected = true;

        expect(actual).to.equal(expected);
    });
});
