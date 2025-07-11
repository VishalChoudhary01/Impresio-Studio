"use client";
import { useState, useEffect } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import FilterDrawer from "./components/moleclues/FilterDrawer";
import ClientWrapper from "./components/templates/ClientWrapper";
import PhotographerCard from "./components/moleclues/PhotographerCard";
import SearchBar from "./components/organism/SearchBar";
import Image from "next/image";
import bannerImage from '../../public/banner/banner.jpg';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPhotographers,
  selectFiltersPhotographers,
  selectLoading,
  selectError,
  selectUniqueLocations,
  selectUniqueStyles,
  setMinRating,
  setPriceRange,
  toggleStyle,
  setLocation,
  setSort,
  resetFilters,
  selectAbsoluteMaxPrice,
} from "./redux/slice/photographerSlice";
import Pagination from "./components/moleclues/Pagination";

// Skeleton Components
const PhotographerCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="relative h-48 bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
      <div className="mt-4 space-y-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

const FilterBarSkeleton = () => (
  <div className="flex justify-between items-center mb-6 px-4 md:px-10">
    <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

export default function Home() {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Redux selectors
  const filteredPhotographers = useSelector(selectFiltersPhotographers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const locations = useSelector(selectUniqueLocations);
  const styles = useSelector(selectUniqueStyles);
  const filters = useSelector(state => state.photographers.filters);
  const sort = useSelector(state => state.photographers.sort);
  const maxPrice = useSelector(selectAbsoluteMaxPrice);

  // Pagination logic
  const photographersPerPage = 8;
  const indexOfLast = currentPage * photographersPerPage;
  const indexOfFirst = indexOfLast - photographersPerPage;
  const currentPhotographers = filteredPhotographers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPhotographers.length / photographersPerPage);

  useEffect(() => {
    dispatch(fetchPhotographers());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPhotographers]);

  const toggleDrawer = () => setOpenDrawer(prev => !prev);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ClientWrapper>
      <FilterDrawer
        maxPrice={maxPrice}
        toggleDrawer={toggleDrawer}
        openDrawer={openDrawer}
        filters={filters}
        sort={sort}
        locations={locations}
        styles={styles}
        onSetMinRating={(rating) => dispatch(setMinRating(rating))}
        onSetPriceRange={(range) => dispatch(setPriceRange(range))}
        onToggleStyle={(style) => dispatch(toggleStyle(style))}
        onSetLocation={(location) => dispatch(setLocation(location))}
        onSetSort={(sort) => dispatch(setSort(sort))}
        onResetFilters={() => dispatch(resetFilters())}
      />

      {/* Hero Section */}
      <section className="mb-8 relative w-full md:h-[500px] h-[200px]">
        <Image
          src={bannerImage}
          alt="Maternity Photography"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-800/30 dark:bg-slate-950/40 backdrop-blur-sm z-10" />

        <div className="absolute z-10 w-full h-full flex items-center justify-center px-4">
          <div className="w-full max-w-2xl flex flex-col items-center gap-y-6 text-center">
            <h1 className="text-xl md:text-5xl  font-semibold text-white tracking-wide drop-shadow-lg">
              Maternity Photographers
            </h1>
            <SearchBar />
          </div>
        </div>
      </section>

      {loading ? (
        <FilterBarSkeleton />
      ) : (
        <div className="flex justify-between items-center mb-6 px-4 md:px-10">
          <div
            className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-100 dark:bg-teal-800 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-teal-700 transition-colors"
            onClick={toggleDrawer}
          >
            <MdOutlineFilterAlt className="text-lg" />
            <p className="font-medium">Filters</p>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredPhotographers.length} photographers
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-12 text-red-500 dark:text-red-400">
          <p className="text-lg">Error: {error}</p>
        </div>
      )}

      {!error && (
        <>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-10">
              {[...Array(8)].map((_, index) => (
                <PhotographerCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredPhotographers.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">No photographers found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-10">
                {currentPhotographers.map((photographer) => (
                  <PhotographerCard
                    key={photographer.id}
                    photographer={photographer}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 px-4 md:px-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </ClientWrapper>
  );
}