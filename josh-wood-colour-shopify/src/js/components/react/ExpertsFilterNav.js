/**
 * @prettier
 * @flow
 */
import React from 'react';

type Props = {
    activeFilter: string,
    filters: Array<ExpertsFilter>,
    handleClick: Function
};

const ExpertsFilterNav = ({activeFilter, filters, handleClick}: Props) => (
    <nav className="c-filter-nav u-pt u-pt0@mobile u-fade-in" data-filter={activeFilter}>
        <ul className="o-list-inline c-filter-nav__nav u-pt0">
            {filters.map((filter, index) => (
                <li className="o-list-inline__item c-filter-nav__item u-pt0" key={index}>
                    <button
                        className={`c-button c-button--black c-button--block u-1/1 ${
                            activeFilter !== filter.slug ? 'c-button--ghost' : ''
                        }`}
                        data-filter={filter.slug}
                        onClick={event => {
                            if (event && event.target) {
                                event.target.blur();
                            }

                            handleClick(filter.slug);
                        }}
                    >
                        {filter.name}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
);

export default ExpertsFilterNav;
