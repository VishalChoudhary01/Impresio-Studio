import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Button from '../atoms/Button'; 

const FilterDrawer = ({
  toggleDrawer,
  openDrawer,
  filters,
  sort,
  maxPrice,
  locations,
  styles,
  onSetMinRating,
  onSetPriceRange,
  onToggleStyle,
  onSetLocation,
  onSetSort,
  onResetFilters
}) => {
  return (
    <>
      <aside
        className={`bg-teal-900 text-white border-t border-l border-slate-500/30 fixed left-0 top-0 transition-all duration-300 w-72 h-screen z-20 py-9 pl-5 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-600 scrollbar-track-teal-900 scrollbar-thumb-rounded-full ${
          openDrawer ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className='flex justify-between items-center mb-6 px-3'>
          <h2 className='text-xl font-bold text-teal-100'>Filters</h2>
          <div className="flex items-center gap-3">
            <Button
              buttonText="Reset"
              buttonOnClick={onResetFilters}
              buttonStyle="text-sm text-teal-300 hover:text-teal-50 dark:text-teal-300 dark:hover:text-teal-100"
            />
            <span
              onClick={toggleDrawer}
              className="cursor-pointer text-xl text-teal-300 hover:text-teal-50 dark:text-teal-300 dark:hover:text-teal-100"
            >
              <FaArrowLeft />
            </span>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6 px-3">
          <h3 className="text-teal-200 dark:text-teal-300 font-medium mb-3">
            Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
          </h3>

          <div className="py-4">
            <Slider
              range
              min={0}
              max={maxPrice}
              value={filters.priceRange}
              onChange={onSetPriceRange}
              trackStyle={[{ backgroundColor: '#0d9488' }]}
              handleStyle={[
                {
                  backgroundColor: '#fff',
                  borderColor: '#0d9488',
                  width: 18,
                  height: 18,
                  marginTop: -7,
                  opacity: 1,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                },
                {
                  backgroundColor: '#fff',
                  borderColor: '#0d9488',
                  width: 18,
                  height: 18,
                  marginTop: -7,
                  opacity: 1,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }
              ]}
              railStyle={{ backgroundColor: '#4b5563', height: 4 }}
            />
          </div>

          <div className="flex justify-between text-sm text-teal-300 dark:text-teal-400 mt-1">
            <span>₹0</span>
            <span>₹{maxPrice}</span>
          </div>
        </div>

        {/* Minimum Rating */}
        <div className="mb-6 px-3">
          <h3 className="text-teal-200 dark:text-teal-300 font-medium mb-3">Minimum Rating</h3>
          <div className="flex flex-wrap gap-2">
            {[0, 3, 4, 4.5].map((rating) => (
              <Button
                key={rating}
                buttonText={rating === 0 ? 'All' : `${rating}+`}
                buttonOnClick={() => onSetMinRating(rating)}
                buttonStyle={`px-3 py-2 rounded ${
                  filters.minRating === rating
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-800 text-teal-200 hover:bg-teal-700 dark:bg-teal-800 dark:text-teal-300 dark:hover:bg-teal-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Styles */}
        <div className="mb-6 px-3">
          <h3 className="text-teal-200 dark:text-teal-300 font-medium mb-3">Styles</h3>
          <div className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <Button
                key={style}
                buttonText={style}
                buttonOnClick={() => onToggleStyle(style)}
                buttonStyle={`px-3 py-2 rounded ${
                  filters.styles.includes(style)
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-800 text-teal-200 hover:bg-teal-700 dark:bg-teal-800 dark:text-teal-300 dark:hover:bg-teal-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-6 px-3">
          <h3 className="text-teal-200 dark:text-teal-300 font-medium mb-3">Location</h3>
          <select
            value={filters.location}
            onChange={(e) => onSetLocation(e.target.value)}
            className="w-full p-2 bg-teal-800 border border-teal-700 rounded text-white dark:bg-teal-900 dark:border-teal-700 dark:text-white"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="mb-6 px-3">
          <h3 className="text-teal-200 dark:text-teal-300 font-medium mb-3">Sort By</h3>
          <select
            value={sort}
            onChange={(e) => onSetSort(e.target.value)}
            className="w-full p-2 bg-teal-800 border border-teal-700 rounded text-white dark:bg-teal-900 dark:border-teal-700 dark:text-white"
          >
            <option value="default">Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Highest Rated</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>
      </aside>

      {/* Overlay */}
      {openDrawer && (
        <div
          onClick={toggleDrawer}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-10 md:hidden'
        />
      )}
    </>
  );
};

export default FilterDrawer;
