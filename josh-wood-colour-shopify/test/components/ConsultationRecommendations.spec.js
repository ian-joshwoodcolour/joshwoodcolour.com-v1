/**
 * @prettier
 */
import React from 'react';
import {expect} from 'chai';
import {spy} from 'sinon';
import {mount} from 'enzyme';
import {consultationResults, setProducts} from '../../src/js/components/consultation-results';
import ConsultationRecommendations from '../../src/js/components/react/ConsultationRecommendations';
import {
    allCollectionAnswers,
    allCollectionAnswersNoPersonalData,
    noPermanentCollectionAnswers,
    noCareOrConcealerCollectionAnswers
} from '../stubs/consultation-answers';
import {careProducts, concealerProducts, permanentProducts} from '../stubs/consultation-products';

describe.skip('Component: <ConsultationRecommendations />', () => {
    beforeEach(() => {
        setProducts({
            careProducts,
            concealerProducts,
            permanentProducts
        });
    });

    it('renders a wrapper', () => {
        const results = consultationResults(allCollectionAnswers);
        const wrapper = mount(
            <ConsultationRecommendations answers={allCollectionAnswers} results={results} />
        );
        const actual = wrapper.find('.qa-recommendations').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it("does not render the user's name if it was not saved", () => {
        const results = consultationResults(allCollectionAnswersNoPersonalData);
        const wrapper = mount(
            <ConsultationRecommendations
                answers={allCollectionAnswersNoPersonalData}
                results={results}
            />
        );
        const actual = wrapper.find('.qa-name').text();
        const expected = 'Here are your perfect products';

        expect(actual).to.equal(expected);
    });

    it("renders the user's name if it is saved", () => {
        const results = consultationResults(allCollectionAnswers);
        const wrapper = mount(
            <ConsultationRecommendations answers={allCollectionAnswers} results={results} />
        );
        const actual = wrapper.find('.qa-name').text();
        const expected = 'Sean, here are your perfect products';

        expect(actual).to.equal(expected);
    });

    it("renders the user's name with a capitilised first name, if it was saved", () => {
        const answers = [{questionId: 1, name: 'NAME', value: 'sean'}];
        const results = consultationResults(answers);
        const wrapper = mount(<ConsultationRecommendations answers={answers} results={results} />);
        const actual = wrapper.find('.qa-name').text();
        const expected = 'Sean, here are your perfect products';

        expect(actual).to.equal(expected);
    });

    it('renders Permanent product recommendations if there is some', () => {
        const results = consultationResults(allCollectionAnswers);
        const wrapper = mount(
            <ConsultationRecommendations answers={allCollectionAnswers} results={results} />
        );
        const actual = wrapper.find('ConsultationPermanentRecommendation').length;
        const expected = 1;

        expect(actual).to.equal(expected);
    });

    it('renders no Permanent product recommendations if there is none', () => {
        const results = consultationResults(noPermanentCollectionAnswers);
        const wrapper = mount(
            <ConsultationRecommendations answers={noPermanentCollectionAnswers} results={results} />
        );
        const actual = wrapper.find('ConsultationPermanentRecommendation').length;
        const expected = 0;

        expect(actual).to.equal(expected);
    });

    it('renders Concealer product recommendations if there is some', () => {
        const results = consultationResults(noCareOrConcealerCollectionAnswers);
        const wrapper = mount(
            <ConsultationRecommendations
                answers={noCareOrConcealerCollectionAnswers}
                results={results}
            />
        );
        const actual = wrapper.find('ConsultationCareAndConcealerRecommendation').length;
        const expected = 2;

        expect(actual).to.equal(expected);
    });

    it('renders Care product recommendations if there is some', () => {
        const results = consultationResults(noCareOrConcealerCollectionAnswers);
        const wrapper = mount(
            <ConsultationRecommendations
                answers={noCareOrConcealerCollectionAnswers}
                results={results}
            />
        );
        const actual = wrapper.find('ConsultationCareAndConcealerRecommendation').length;
        const expected = 2;

        expect(actual).to.equal(expected);
    });
});
