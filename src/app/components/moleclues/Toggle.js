"use client";
import React, { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Button from "../atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slice/themeSlice";

const Toggle = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    if (mode === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

  }, [mode]);

  return (
    <Button
      buttonOnClick={() => dispatch(toggleTheme())}
      buttonText={
        mode === "dark" ? (
          <FaSun className="text-teal-100/60 " />
        ) : (
          <FaMoon className="text-teal-100" />
        )
      }
    />
  );
};

export default Toggle;
