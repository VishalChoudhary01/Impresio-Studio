import React from 'react';
import Image from 'next/image';
import Button from '../atoms/Button';
import { MdLocationPin } from "react-icons/md";
import { useRouter } from 'next/navigation';

const PhotographerCard = ({ photographer }) => {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push(`/photographers/${photographer.id}`);
  };

  return (
    <div className="bg-white dark:bg-teal-800 rounded-xl shadow-md hover:shadow-lg dark:shadow-teal-900/50 transition-shadow duration-300 overflow-hidden">
      {/* Profile Image */}
      <div className="relative h-60">
        {photographer.profilePic ? (
          <Image 
            src={photographer.profilePic} 
            alt={photographer.name} 
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
            priority
          />
        ) : (
          <div className="bg-gray-200 dark:bg-slate-700 border-2 border-dashed dark:border-slate-500 rounded-xl w-full h-full flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300">No Image</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{photographer.name}</h3>
          <span className="flex items-center bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 text-sm font-semibold px-2 py-1 rounded">
            {photographer.rating} ★
          </span>
        </div>

        {/* Location */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 flex items-center gap-1">
          <MdLocationPin/>
          {photographer.location}
        </p>

        {/* Price */}
        <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">
          ₹{photographer.price.toLocaleString('en-IN')}
        </p>

        {/* Styles Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {photographer.styles.map((style, idx) => (
            <span 
              key={idx} 
              className="bg-blue-100 text-blue-800 dark:bg-teal-700 dark:text-teal-100 text-xs px-2 py-1 rounded"
            >
              {style}
            </span>
          ))}
        </div>

        {/* Button */}
        <Button 
          buttonStyle="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md transition-colors duration-300"
          buttonText="View Profile"
          buttonOnClick={handleViewProfile}
        />
      </div>
    </div>
  );
};

export default PhotographerCard;