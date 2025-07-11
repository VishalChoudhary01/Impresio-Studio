'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotographers, selectPhotographerById ,fetchPhotographerById} from './../../redux/slice/photographerSlice';
import Image from 'next/image';
import { MdLocationPin, MdStar, MdStarHalf, MdStarOutline, MdCalendarToday, MdCameraAlt, MdEmail, MdPhone, MdBookmark, MdShare } from 'react-icons/md';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

const PhotographerProfile = () => {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isLoading, setIsLoading] = useState(true);
  
  const loading = useSelector((state) => state.photographers.loading);
  const error = useSelector((state) => state.photographers.error);
  const photographer = useSelector((state) => selectPhotographerById(state, id));

  useEffect(() => {
   if (!photographer && id) {
    dispatch(fetchPhotographerById(id)); 
  }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);
    
    return () => clearTimeout(timer);
  }, [dispatch, photographer, id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<MdStar key={`full-${i}`} className="text-amber-500 text-xl" />);
    }
    
    if (hasHalfStar) {
      stars.push(<MdStarHalf key="half" className="text-amber-500 text-xl" />);
    }
    
    const remaining = 5 - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<MdStarOutline key={`empty-${i}`} className="text-amber-500 text-xl" />);
    }
    
    return stars;
  };

  if (loading || isLoading || !photographer) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500 mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">Loading photographer profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-slate-900 p-4">
        <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-xl max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">Error Loading Profile</h2>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-r from-teal-600 to-cyan-500 pt-16 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
              <Image
                src={photographer.profilePic}
                alt={photographer.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            
            <div className="flex-1 text-white">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{photographer.name}</h1>
                  <p className="flex items-center gap-2 mt-2 text-teal-100">
                    <MdLocationPin className="text-xl" />
                    <span className="font-medium">{photographer.location}</span>
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                    <MdBookmark className="text-xl" />
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                    <MdShare className="text-xl" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center bg-teal-800/40 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-semibold mr-2">₹{photographer.price.toLocaleString('en-IN')}</span>
                  <span className="text-sm">per session</span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex">
                    {renderStars(photographer.rating)}
                  </div>
                  <span className="ml-2 font-semibold">{photographer.rating.toFixed(1)}</span>
                </div>
                
                <div className="flex gap-2">
                  <a href="#" className="bg-teal-800/40 backdrop-blur-sm p-2 rounded-full hover:bg-teal-800/60 transition-colors">
                    <FaInstagram />
                  </a>
                  <a href="#" className="bg-teal-800/40 backdrop-blur-sm p-2 rounded-full hover:bg-teal-800/60 transition-colors">
                    <FaTwitter />
                  </a>
                  <a href="#" className="bg-teal-800/40 backdrop-blur-sm p-2 rounded-full hover:bg-teal-800/60 transition-colors">
                    <FaFacebookF />
                  </a>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {photographer.styles.map((style, index) => (
                  <span key={index} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {style}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-16">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 dark:border-slate-700">
            <nav className="flex flex-wrap">
              <button
                className={`px-6 py-4 font-medium text-sm ${activeTab === 'portfolio' ? 'text-teal-600 border-b-2 border-teal-600 dark:text-teal-400 dark:border-teal-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('portfolio')}
              >
                <span className="flex items-center gap-2">
                  <MdCameraAlt />
                  Portfolio
                </span>
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm ${activeTab === 'about' ? 'text-teal-600 border-b-2 border-teal-600 dark:text-teal-400 dark:border-teal-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm ${activeTab === 'reviews' ? 'text-teal-600 border-b-2 border-teal-600 dark:text-teal-400 dark:border-teal-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm ${activeTab === 'contact' ? 'text-teal-600 border-b-2 border-teal-600 dark:text-teal-400 dark:border-teal-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Portfolio Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {photographer.portfolio.map((img, i) => (
                    <div key={i} className="group relative h-64 w-full rounded-xl overflow-hidden shadow-md">
                      <Image 
                        src={img} 
                        alt={`portfolio-${i}`} 
                        layout="fill"
                        objectFit="cover"
                        className="transform transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white font-medium">Photo Session #{i+1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* About Tab */}
            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About {photographer.name}</h2>
                <div className="prose prose-teal max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                    {photographer.bio || "No biography available."}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-xl">
                      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Experience</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            8+
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            Years of professional photography experience
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            500+
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            Successful photo sessions completed
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            200+
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            Happy clients worldwide
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-xl">
                      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Specializations</h3>
                      <ul className="space-y-2">
                        {photographer.styles.map((style, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                            <span className="text-gray-700 dark:text-gray-300">{style}</span>
                          </li>
                        ))}
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                          <span className="text-gray-700 dark:text-gray-300">Commercial Photography</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                          <span className="text-gray-700 dark:text-gray-300">Photo Editing & Retouching</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Client Reviews</h2>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl mb-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-amber-600 dark:text-amber-400">{photographer.rating.toFixed(1)}</div>
                      <div className="flex justify-center mt-2">
                        {renderStars(photographer.rating)}
                      </div>
                      <p className="text-gray-600 dark:text-amber-200 mt-1">Overall Rating</p>
                    </div>
                    
                    <div className="flex-1 max-w-md">
                      <div className="flex items-center mb-1">
                        <span className="w-10 text-right mr-2 text-sm text-gray-600 dark:text-amber-200">5★</span>
                        <div className="flex-1 h-2 bg-gray-300 dark:bg-amber-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '85%' }}></div>
                        </div>
                        <span className="w-10 ml-2 text-sm text-gray-600 dark:text-amber-200">85%</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <span className="w-10 text-right mr-2 text-sm text-gray-600 dark:text-amber-200">4★</span>
                        <div className="flex-1 h-2 bg-gray-300 dark:bg-amber-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '12%' }}></div>
                        </div>
                        <span className="w-10 ml-2 text-sm text-gray-600 dark:text-amber-200">12%</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <span className="w-10 text-right mr-2 text-sm text-gray-600 dark:text-amber-200">3★</span>
                        <div className="flex-1 h-2 bg-gray-300 dark:bg-amber-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '2%' }}></div>
                        </div>
                        <span className="w-10 ml-2 text-sm text-gray-600 dark:text-amber-200">2%</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <span className="w-10 text-right mr-2 text-sm text-gray-600 dark:text-amber-200">2★</span>
                        <div className="flex-1 h-2 bg-gray-300 dark:bg-amber-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '1%' }}></div>
                        </div>
                        <span className="w-10 ml-2 text-sm text-gray-600 dark:text-amber-200">1%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-10 text-right mr-2 text-sm text-gray-600 dark:text-amber-200">1★</span>
                        <div className="flex-1 h-2 bg-gray-300 dark:bg-amber-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '0%' }}></div>
                        </div>
                        <span className="w-10 ml-2 text-sm text-gray-600 dark:text-amber-200">0%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {photographer.reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-slate-700 p-6 rounded-xl">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{review.date}</p>
                        </div>
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 italic">"{review.comment}"</p>
                      
                      {review.photos && review.photos.length > 0 && (
                        <div className="mt-4 flex gap-2">
                          {review.photos.slice(0, 3).map((photo, i) => (
                            <div key={i} className="w-16 h-16 rounded-md overflow-hidden">
                              <Image
                                src={photo}
                                alt={`review-${i}`}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact {photographer.name}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 mb-6">
                      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Get in Touch</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="bg-teal-100 dark:bg-teal-900/50 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                            <MdEmail className="text-teal-600 dark:text-teal-400 text-xl" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <p className="text-gray-900 dark:text-white">contact@{photographer.name.toLowerCase().replace(' ', '')}.com</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-teal-100 dark:bg-teal-900/50 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                            <MdPhone className="text-teal-600 dark:text-teal-400 text-xl" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                            <p className="text-gray-900 dark:text-white">+91 98765 43210</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-teal-100 dark:bg-teal-900/50 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                            <MdLocationPin className="text-teal-600 dark:text-teal-400 text-xl" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Studio Location</p>
                            <p className="text-gray-900 dark:text-white">{photographer.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Business Hours</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Monday - Friday</span>
                          <span className="text-gray-900 dark:text-white">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Saturday</span>
                          <span className="text-gray-900 dark:text-white">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Sunday</span>
                          <span className="text-gray-900 dark:text-white">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Book a Session</h3>
                      
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:text-white"
                            placeholder="Enter your name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:text-white"
                            placeholder="Enter your email"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                          <input 
                            type="tel" 
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:text-white"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Session Type</label>
                            <select className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:text-white">
                              <option>Portrait Session</option>
                              <option>Wedding Photography</option>
                              <option>Product Photography</option>
                              <option>Event Coverage</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Date</label>
                            <div className="relative">
                              <input 
                                type="date" 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:text-white"
                              />
                              <MdCalendarToday className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-500 text-xl" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                          <textarea 
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:text-white"
                            placeholder="Tell us about your photography needs..."
                          ></textarea>
                        </div>
                        
                        <button 
                          type="submit"
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                        >
                          Request Booking
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-10">
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all transform hover:scale-105">
          <MdCalendarToday className="text-xl" />
          <span>Book Session</span>
        </button>
      </div>
    </div>
  );
};

export default PhotographerProfile;