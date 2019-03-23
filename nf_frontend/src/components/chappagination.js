import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import {LinkContainer} from 'react-router-bootstrap'
//import Link from 'react-router-dom/Link'

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

class Pageswitch extends Component {

    constructor(props) {
        super(props);
        const {totalRecords = null, pageLimit = 30, pageNeighbours = 0} = props;

        this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
        this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

        // pageNeighbours can be: 0, 1 or 2
        this.pageNeighbours = typeof pageNeighbours === 'number'
            ? Math.max(0, Math.min(pageNeighbours, 2))
            : 0;

        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

        this.state = {currentPage: props.currentPage, totalPages: this.totalPages};
    }

    componentDidMount() {
        this.gotoPage(this.props.currentpage);
    }

    gotoPage = page => {
        //console.log("goto page "+ page);
        const {onPageChanged = f => f} = this.props;

        const currentPage = Math.max(0, Math.min(page, this.totalPages));

        const paginationData = {
            currentPage,
            totalPages: this.totalPages,
            pageLimit: this.pageLimit,
            totalRecords: this.totalRecords
        };

        this.setState({currentPage}, () => onPageChanged(paginationData));
    };

    handleClick = page => evt => {
        //evt.preventDefault();
        this.gotoPage(page);
    };

    getMoveLeft() {
        return this.state.currentPage - (this.pageNeighbours * 2) - 1
    }

    handleMoveLeft = evt => {
        //evt.preventDefault();
        this.gotoPage(this.state.currentPage - (this.pageNeighbours * 2) - 1);
    };

    getMoveRight() {
        return this.state.currentPage + (this.pageNeighbours * 2) + 1
    }

    handleMoveRight = evt => {
        //evt.preventDefault();
        this.gotoPage(this.state.currentPage + (this.pageNeighbours * 2) + 1);
    };

    getPrev() {
        if (this.state.currentPage !== 1) {
            return this.state.currentPage - 1
        } else {
            return this.state.currentPage
        }
    }

    handlePrev = evt => {
        //evt.preventDefault();
        //console.log("prev");
        if (this.state.currentPage !== 1) {
            this.gotoPage(this.state.currentPage - 1)
        }
    };

    getNext() {
        if (this.state.currentPage !== this.state.totalPages) {
            return this.state.currentPage + 1
        } else {
            return this.state.currentPage
        }
    }

    handleNext = evt => {
        //evt.preventDefault();
        //console.log("next");
        //console.log(this.state.totalPages);
        if (this.state.currentPage !== this.state.totalPages) {
            //console.log("here");
            this.gotoPage(this.state.currentPage + 1)
        }
    };

    /**
     * Let's say we have 10 pages and we set pageNeighbours to 2
     * Given that the current page is 6
     * The pagination control will look like the following:
     *
     * (1) < {4 5} [6] {7 8} > (10)
     *
     * (x) => terminal pages: first and last page(always visible)
     * [x] => represents current page
     * {...x} => represents page neighbours
     */
    fetchPageNumbers = () => {

        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;
        const pageNeighbours = this.pageNeighbours;

        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = (this.pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {

            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

            let pages = range(startPage, endPage);

            /**
             * hasLeftSpill: has hidden pages to the left
             * hasRightSpill: has hidden pages to the right
             * spillOffset: number of hidden pages either to the left or to the right
             */
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            if (true === hasLeftSpill && !hasRightSpill) {

                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = [LEFT_PAGE, ...extraPages, ...pages];


            } else if (true === !hasLeftSpill && hasRightSpill) {

                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, RIGHT_PAGE];


            } else {

                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];

            }

            return [1, ...pages, totalPages];

        }

        return range(1, totalPages);

    };

    render() {

        if (!this.totalRecords || this.totalPages === 1) return null;

        const {currentPage} = this.state;
        const pages = this.fetchPageNumbers();

        return (
            <Fragment>
                <nav aria-label="Countries Pagination">
                    <ul className="pagination">
                        <Pagination>

                            <LinkContainer to={`/oldfic/${this.props.ficid}/${this.getPrev()}`}>
                                <Pagination.Prev onClick={this.handlePrev}/>
                            </LinkContainer>
                            {pages.map((page, index) => {

                                if (page === LEFT_PAGE) return (
                                    <LinkContainer to={`/oldfic/${this.props.ficid}/${this.getMoveLeft()}`} key={index}>
                                        <Pagination.First key={index} onClick={this.handleMoveLeft}/>
                                    </LinkContainer>

                                );

                                if (page === RIGHT_PAGE) return (
                                    <LinkContainer to={`/oldfic/${this.props.ficid}/${this.getMoveRight()}`} key={index}>
                                        <Pagination.Last key={index} onClick={this.handleMoveRight}/>
                                    </LinkContainer>
                                );

                                return (

                                    <LinkContainer to={`/oldfic/${this.props.ficid}/${page}`} key={index}>
                                        <Pagination.Item key={index} active={currentPage === page}
                                                         onClick={this.handleClick(page)}>{page}</Pagination.Item>
                                    </LinkContainer>

                                );
                            })}
                            <LinkContainer to={`/oldfic/${this.props.ficid}/${this.getNext()}`}>
                                <Pagination.Next onClick={this.handleNext}/>
                            </LinkContainer>
                        </Pagination>
                    </ul>
                </nav>
            </Fragment>
        );

    }
}

// onClick={this.handleClick(page)}
Pageswitch.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func,
    ficid: PropTypes.string,
    currentpage: PropTypes.string
};

export default Pageswitch;