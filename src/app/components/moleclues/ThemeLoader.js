'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../redux/slice/themeSlice'; 

const ThemeLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    dispatch(setTheme(savedTheme));
  }, [dispatch]);

  return null; 
};

export default ThemeLoader;
