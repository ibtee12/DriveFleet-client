import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Github, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white flex items-center">
                  Drive<span className="text-blue-400">Fleet</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 -mt-1 tracking-widest uppercase">
                  Car Rentals
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              DriveFleet is your premier destination for effortless luxury vehicle rentals, transparent pricing, and instant online bookings.
            </p>
            {/* Social Icons including new X logo */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors" title="X (Twitter)">
                {/* Custom SVG for re-branded X logo as specified in Work.docx */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home Page</Link></li>
              <li><Link to="/explore" className="hover:text-blue-400 transition-colors">Explore All Cars</Link></li>
              <li><Link to="/add-car" className="hover:text-blue-400 transition-colors">List Your Car</Link></li>
              <li><Link to="/my-bookings" className="hover:text-blue-400 transition-colors">Manage Bookings</Link></li>
            </ul>
          </div>

          {/* Car Categories */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Fleet Categories</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/explore?category=SUV" className="hover:text-blue-400 transition-colors">SUVs & Offroaders</Link></li>
              <li><Link to="/explore?category=Sedan" className="hover:text-blue-400 transition-colors">Executive Sedans</Link></li>
              <li><Link to="/explore?category=Electric" className="hover:text-blue-400 transition-colors">Electric EV Fleet</Link></li>
              <li><Link to="/explore?category=Luxury" className="hover:text-blue-400 transition-colors">Luxury Sports Cars</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>100 Fleet Boulevard, Suite 400, Los Angeles, CA</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <span>+1 (800) 555-DRIVE</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <span>support@drivefleet.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DriveFleet Platform. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Settings</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
