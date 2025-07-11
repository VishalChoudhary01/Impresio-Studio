// Footer.jsx
import React from 'react'
import Logo from '../atoms/Logo';
import { FaInstagram, FaFacebook, FaTwitter, FaPinterest } from "react-icons/fa";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-teal-100 dark:bg-teal-900 border-t border-gray-200 dark:border-teal-800">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-gray-600 dark:text-teal-200 text-sm">
              Connecting expectant mothers with professional photographers to capture beautiful maternity moments.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-gray-500 hover:text-teal-600 dark:text-teal-300 dark:hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-600 dark:text-teal-300 dark:hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-600 dark:text-teal-300 dark:hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-600 dark:text-teal-300 dark:hover:text-white transition-colors">
                <FaPinterest size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Photographers', 'Pricing', 'About Us'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-teal-600 dark:text-teal-200 dark:hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              {['Blog', 'FAQ', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-teal-600 dark:text-teal-200 dark:hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
            <address className="not-italic text-gray-600 dark:text-teal-200 space-y-2 text-sm">
              <p>123 Photography Lane</p>
              <p>Mumbai, India 400001</p>
              <p className="mt-2">Email: info@maternityphotos.com</p>
              <p>Phone: +91 98765 43210</p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-teal-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-teal-300 text-sm">
            © {new Date().getFullYear()} Maternity Moments. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-600 hover:text-teal-600 dark:text-teal-300 dark:hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-teal-600 dark:text-teal-300 dark:hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer