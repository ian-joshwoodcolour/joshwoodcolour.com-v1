/**
 * @prettier
 * @/flow
 */
import React, {Component} from 'react';
import {SCROLL_MONITOR_OFFSET} from '../scroll-monitor';
import ExpertsCard from './ExpertsCard';
import ExpertsFilterNav from './ExpertsFilterNav';

type Props = {
    content: {
        experts: Array<Expert>,
        filters: Array<ExpertsFilter>
    }
};

type State = {
    activeFilter: string,
    content: {
        experts: Array<Expert>,
        filters: Array<ExpertsFilter>
    },
    filters: Array<ExpertsFilter>
};

class ExpertsList extends Component<Props, State> {
    static defaultProps = {
        content: {
            experts: [],
            filters: []
        }
    };

    constructor(props?: Props) {
        super(props);

        this.state = {
            activeFilter: this.getDefaultFilter(),
            content: this.props.content,
            filters: this.getUniqueFilters(this.props.content.filters)
        };
    }

    getUniqueFilters(filters: Array<ExpertsFilter>): Array<ExpertsFilter> {
        const unique = filters.reduce((all: Array<ExpertsFilter>, current: ExpertsFilter) => {
            const exists = all.filter(filter => filter.name === current.name).length;

            return exists ? all : [...all, current];
        }, []);

        return unique;
    }

    getDefaultFilter(): string {
        let defaultFilter =
            typeof window !== 'undefined' ? window.location.hash.replace('#', '') : null;

        if (!defaultFilter) {
            defaultFilter = this.props.content.filters[0].slug;
        }

        return defaultFilter;
    }

    handleFilterChange(filter: string): void {
        const content = this.state.content;

        this.setState(
            {
                activeFilter: filter,
                content: {...content, ...{experts: []}}
            },
            () => {
                this.setState({content});
            }
        );

        window.location.hash = `#${filter}`;

        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'Experts Filter',
                eventAction: 'change',
                eventLabel: filter
            });
        }
    }

    render() {
        const {activeFilter, content, filters} = this.state;

        return (
            <div>
                <ExpertsFilterNav
                    activeFilter={activeFilter}
                    filters={filters}
                    handleClick={this.handleFilterChange.bind(this)}
                />

                <div className="o-layout o-layout--offset-tops o-layout--large u-stack-layout@mobile c-cards--h-offsets u-mt++">
                    {content.experts
                        ? content.experts
                              .filter(
                                  expert =>
                                      expert.active === true && expert.categorySlug === activeFilter
                              )
                              .map((expert, index) => (
                                  <div
                                      className="o-layout__item u-6/12@mobile u-4/12@tabletSmall u-6/12@mobile u-fade-in"
                                      key={index}
                                  >
                                      <ExpertsCard
                                          data={expert}
                                          offsets={SCROLL_MONITOR_OFFSET}
                                          titlePosition={index % 3 === 0 ? 'left' : 'right'}
                                      />
                                  </div>
                              ))
                        : null}
                </div>
            </div>
        );
    }
}

export default ExpertsList;
