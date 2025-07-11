import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-10 h-10 rounded-full ${
            currentPage === i
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded-full ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        <HiChevronLeft className="w-5 h-5 dark:text-teal-50" />
      </button>
      
      {renderPageNumbers()}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        <HiChevronRight className="w-5 h-5 dark:text-teal-50" />
      </button>
    </div>
  );
};

export default Pagination;