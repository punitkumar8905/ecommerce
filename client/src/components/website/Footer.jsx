import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiPhone, FiMail } from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard, FaCcStripe, FaCcPaypal } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white pt-20 border-t border-gray-200">
      <div className="px-8 max-w-[1400px] mx-auto grid grid-cols-5 gap-16 pb-16">
        {/* Contact Info */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#0bb59d] rounded-full flex items-center justify-center text-white font-bold">S</div>
            <h1 className="font-bold text-lg">SWOO</h1>
          </div>
          <p className="text-xs text-gray-400 mb-2 uppercase">Hotline 24/7</p>
          <p className="text-xl font-bold text-[#0bb59d] mb-6">(025) 3686 25 16</p>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            257 Thatcher Road St, Brooklyn, Manhattan, NY 10092<br />contact@swootechmart.com
          </p>
          <div className="flex gap-4 text-gray-400">
            <FiFacebook className="hover:text-[#0bb59d] cursor-pointer" />
            <FiTwitter className="hover:text-[#0bb59d] cursor-pointer" />
            <FiInstagram className="hover:text-[#0bb59d] cursor-pointer" />
            <FiYoutube className="hover:text-[#0bb59d] cursor-pointer" />
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h5 className="font-bold text-sm mb-6 uppercase">Top Categories</h5>
          <ul className="text-xs text-gray-500 space-y-3">
            <li className="hover:text-[#0bb59d] cursor-pointer">Laptops</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">PC & Computers</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">Cell Phones</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">Tablets</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">Gaming & VR</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-sm mb-6 uppercase">Company</h5>
          <ul className="text-xs text-gray-500 space-y-3">
            <li className="hover:text-[#0bb59d] cursor-pointer">About Swoo</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">Contact</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">Career</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">Blog</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">Sitemap</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-sm mb-6 uppercase">Help Center</h5>
          <ul className="text-xs text-gray-500 space-y-3">
            <li className="hover:text-[#0bb59d] cursor-pointer">Customer Service</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">FAQ</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">My Account</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-sm mb-6 uppercase">Partner</h5>
          <ul className="text-xs text-gray-500 space-y-3">
            <li className="hover:text-[#0bb59d] cursor-pointer">Become Seller</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">Affiliate</li>
            <li className="hover:text-[#0bb59d] cursor-pointer">Advertise</li>
          </ul>
        </div>
      </div>

      {/* Newsletter Bar */}
      <div className="border-t border-gray-200 py-10 px-8 max-w-[1400px] mx-auto flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">USD</span>
          </div>
          <div className="flex items-center gap-2 text-sm border-l pl-4">
            <span className="font-bold">ENG</span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-center max-w-2xl">
          <span className="text-xs font-bold uppercase whitespace-nowrap">Subscribe & Get <span className="text-[#0bb59d]">10% Off</span> For Your First Order</span>
          <div className="flex border rounded-full overflow-hidden w-full max-w-sm">
            <input type="email" placeholder="Enter your email address" className="px-4 py-2 text-xs w-full outline-none" />
            <button className="bg-black text-white px-6 py-2 text-[10px] font-bold uppercase">Subscribe</button>
          </div>
        </div>

        <div className="flex gap-4 text-gray-300 text-2xl">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcStripe />
          <FaCcPaypal />
        </div>
      </div>

      {/* Bottom Rights */}
      <div className="bg-gray-50 py-4 px-8 text-center border-t border-gray-200">
        <p className="text-[10px] text-gray-400">© 2024 <span className="font-bold text-gray-600">Swoonetch</span>. All Rights Reserved. <span className="ml-4 hover:text-[#0bb59d] cursor-pointer">Mobile Site</span></p>
      </div>
    </footer>
  );
}