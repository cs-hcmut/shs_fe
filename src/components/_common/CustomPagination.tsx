import type { Dispatch, SetStateAction } from "react";

import { classNames } from "primereact/utils";

import { useSearchParams } from "react-router-dom";

interface Props {
  totalPage: number;
  isMobile?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setQueryConfig?: Dispatch<SetStateAction<any>>;
}

//! Style
const indexNumberStyle =
  "flex h-10 w-10 cursor-pointer items-center justify-center mx-1 hover:bg-primary-blue-unhover hover:text-white rounded-lg text-sm desktop:text-base";
const activeArrowStyle =
  "group flex cursor-pointer items-center space-x-1 rounded-lg border border-[#79716B] text-[#79716B] font-semibold px-3 py-2 text-sm shadow-sm desktop:text-base";
const inactiveArrowStyle =
  "group flex cursor-not-allowed items-center space-x-1 rounded-lg border border-[#79716B] text-[#79716B] font-semibold px-3 py-2 text-sm opacity-40 shadow-sm desktop:text-base";

export default function CustomPagination({
  totalPage,
  isMobile = false,
  setQueryConfig,
}: Props) {
  const [params, setSearchParams] = useSearchParams();
  const currentPage = Number(params.get("page"));
  const RANGE = isMobile ? 1 : 2;

  // ! Handle Navigation
  const handleChangeQueryParam = (targetPage: number) => {
    if (setQueryConfig) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setQueryConfig((prev: any) => ({
        ...prev,
        page: targetPage,
      }));
    } else {
      const newParams = new URLSearchParams(params.toString());
      newParams.set("page", String(targetPage));
      setSearchParams(newParams);
    }
  };

  const moveNextPage = (page: number) => {
    const nextPage = page + 1;
    handleChangeQueryParam(nextPage);
  };

  const movePrevPage = (page: number) => {
    const prevPage = page - 1;
    handleChangeQueryParam(prevPage);
  };

  const moveToPage = (targetPage: number) => {
    handleChangeQueryParam(targetPage);
  };

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            className="mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] shadow-sm "
            key={index}
          >
            ...
          </span>
        );
      }
      return null;
    };
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            className="mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] shadow-sm "
            key={index}
          >
            ...
          </span>
        );
      }
      return null;
    };
    return Array(totalPage)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        if (
          currentPage <= RANGE * 2 + 1 &&
          pageNumber > currentPage + RANGE &&
          pageNumber < totalPage - RANGE + 1
        ) {
          return renderDotAfter(index);
        }
        if (
          currentPage > RANGE * 2 + 1 &&
          currentPage < totalPage - RANGE * 2
        ) {
          if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          }
          if (
            pageNumber > currentPage + RANGE &&
            pageNumber < totalPage - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          currentPage >= totalPage - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < currentPage - RANGE
        ) {
          return renderDotBefore(index);
        }
        return (
          <button
            type="button"
            onClick={() => moveToPage(pageNumber)}
            className={classNames(indexNumberStyle, {
              " bg-primary-blue text-white": pageNumber === currentPage,
            })}
            key={index}
          >
            {pageNumber}
          </button>
        );
      });
  };

  if (totalPage === 0) return null;
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => movePrevPage(currentPage)}
        className={currentPage > 1 ? activeArrowStyle : inactiveArrowStyle}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8333 9.99984H4.16667M4.16667 9.99984L10 15.8332M4.16667 9.99984L10 4.1665"
            stroke="#414651"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>Previous</span>
      </button>

      <div className="w-full flex flex-grow justify-center items-center">
        {renderPagination()}
      </div>

      <button
        type="button"
        disabled={currentPage >= totalPage}
        onClick={() => moveNextPage(currentPage)}
        className={
          currentPage < totalPage ? activeArrowStyle : inactiveArrowStyle
        }
      >
        <span>Next</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.16663 9.99984H15.8333M15.8333 9.99984L9.99996 4.1665M15.8333 9.99984L9.99996 15.8332"
            stroke="#414651"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
