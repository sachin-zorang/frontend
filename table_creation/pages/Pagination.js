import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    const paginationContainerStyle = {
        display: "flex",
        listStyleType: "none"
    };

    const paginationItemStyle = {
        padding: "0 12px",
        height: "32px",
        textAlign: "center",
        margin: "auto 4px",
        color: "rgba(0, 0, 0, 0.87)",
        display: "flex",
        boxSizing: "border-box",
        alignItems: "center",
        letterSpacing: "0.01071em",
        borderRadius: "16px",
        lineHeight: "1.43",
        fontSize: "13px",
        minWidth: "32px",
        cursor: "pointer"
    };

    const paginationItemDisabledStyle = {
        ...paginationItemStyle,
        pointerEvents: "none",
        color: "rgba(0, 0, 0, 0.43)"
    };

    const arrowStyle = {
        position: "relative",
        content: '""',
        display: "inline-block",
        width: "0.4em",
        height: "0.4em",
        borderRight: "0.12em solid rgba(0, 0, 0, 0.87)",
        borderTop: "0.12em solid rgba(0, 0, 0, 0.87)",
    };

    const arrowLeftStyle = {
        ...arrowStyle,
        transform: "rotate(-135deg) translate(-50%)"
    };

    const arrowRightStyle = {
        ...arrowStyle,
        transform: "rotate(45deg)"
    };

    const arrowDisabledStyle = {
        borderRight: "0.12em solid rgba(0, 0, 0, 0.43)",
        borderTop: "0.12em solid rgba(0, 0, 0, 0.43)"
    };

    return (
        <ul
            className={classnames('pagination-container', { [className]: className })}
            style={paginationContainerStyle}
        >
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1
                })}
                style={currentPage === 1 ? paginationItemDisabledStyle : paginationItemStyle}
                onClick={onPrevious}
            >
                <div style={currentPage === 1 ? arrowDisabledStyle : arrowLeftStyle} />
            </li>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <li key={index} className="pagination-item dots" style={paginationItemStyle}>&#8230;</li>;
                }

                return (
                    <li
                        key={index}
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage
                        })}
                        style={pageNumber === currentPage ? { ...paginationItemStyle, backgroundColor: 'rgba(0, 0, 0, 0.08)' } : paginationItemStyle}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                style={currentPage === lastPage ? paginationItemDisabledStyle : paginationItemStyle}
                onClick={onNext}
            >
                <div style={currentPage === lastPage ? arrowDisabledStyle : arrowRightStyle} />
            </li>
        </ul>
    );
};

export default Pagination;
