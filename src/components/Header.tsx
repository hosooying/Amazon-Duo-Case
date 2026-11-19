import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Search,
  ChevronDown,
  Menu,
  X,
  Package,
  Heart,
  Clock,
} from 'lucide-react';
import {
  AmazonSgLogo,
  SingaporeFlagIcon,
  AmazonCartIcon,
  PrimeBadge,
} from './AmazonIcons';
import { SEARCH_DEPARTMENTS, SEARCH_SUGGESTIONS } from '../data/products';

interface HeaderProps {
  searchQuery: string;
  searchDepartment: string;
  onSearchSubmit: (query: string, department: string) => void;
  onResetHome: () => void;
  cartCount: number;
  savedCount: number;
  deliveryLocation: { label: string; postalCode: string };
  onOpenLocationModal: () => void;
  onOpenCart: () => void;
  onOpenAllMenu: () => void;
  onQuickNavFilter: (action: string) => void;
  activeNavTag: string | null;
}

const SUBNAV_ITEMS = [
  { id: 'best-sellers', label: 'Best Sellers' },
  { id: 'deals', label: 'Deals Store' },
  { id: 'prime', label: 'Prime', hasCaret: true },
  { id: 'new-releases', label: 'New Releases' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'magsafe', label: 'MagSafe Cases' },
  { id: 'hinge', label: 'Hinge Protection' },
  { id: 'aramid', label: 'Aramid Fiber' },
  { id: 'international', label: 'International Store' },
  { id: 'fresh', label: 'Fresh' },
  { id: 'customer-service', label: 'Customer Service' },
];

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  searchDepartment,
  onSearchSubmit,
  onResetHome,
  cartCount,
  savedCount,
  deliveryLocation,
  onOpenLocationModal,
  onOpenCart,
  onOpenAllMenu,
  onQuickNavFilter,
  activeNavTag,
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [department, setDepartment] = useState(searchDepartment);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setDepartment(searchDepartment);
  }, [searchDepartment]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(inputValue.trim().toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    setIsSearchFocused(false);
    onSearchSubmit(inputValue.trim() || 'iphone duo case', department);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    setIsSearchFocused(false);
    onSearchSubmit(suggestion, department);
  };

  return (
    <header className="w-full z-40 relative">
      {/* Primary Amazon.sg Top Navigation Bar */}
      <div className="bg-[#131921] text-white px-3 lg:px-4 h-[60px] flex items-center gap-2 lg:gap-3">
        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={onOpenAllMenu}
          className="md:hidden p-1.5 rounded-[2px] border border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-[#FF9900]"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Amazon.sg Logo */}
        <button
          type="button"
          onClick={onResetHome}
          className="px-2 py-1.5 rounded-[2px] border border-transparent hover:border-white transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF9900]"
          title="Amazon.sg — Reset search to iphone duo case"
        >
          <AmazonSgLogo />
        </button>

        {/* Deliver to Singapore */}
        <button
          type="button"
          onClick={onOpenLocationModal}
          className="hidden md:flex items-end gap-1 px-2 py-1.5 rounded-[2px] border border-transparent hover:border-white transition-colors text-left shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF9900]"
        >
          <MapPin className="w-4 h-4 text-white mb-0.5 shrink-0" />
          <div className="leading-tight">
            <div className="text-[11px] text-[#CCCCCC] font-normal whitespace-nowrap">
              Deliver to
            </div>
            <div className="text-[13px] font-bold text-white whitespace-nowrap">
              {deliveryLocation.label}{' '}
              {deliveryLocation.postalCode ? deliveryLocation.postalCode : ''}
            </div>
          </div>
        </button>

        {/* Full-Width Amazon Search Bar */}
        <div ref={searchWrapperRef} className="flex-1 min-w-0 relative">
          <form
            onSubmit={handleSubmit}
            className={`flex items-stretch h-[40px] rounded-[4px] overflow-hidden bg-white transition-shadow ${
              isSearchFocused
                ? 'ring-[3px] ring-[#FF9900]'
                : 'ring-0'
            }`}
          >
            {/* Department Select */}
            <div className="relative hidden sm:flex items-center bg-[#E6E6E6] hover:bg-[#D4D4D4] border-r border-[#CDCDCD] transition-colors shrink-0">
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  onSearchSubmit(inputValue.trim() || 'iphone duo case', e.target.value);
                }}
                aria-label="Search department"
                className="appearance-none bg-transparent text-[#555555] hover:text-[#0F1111] text-[12px] font-medium pl-3 pr-7 h-full focus:outline-none max-w-[140px] truncate"
              >
                {SEARCH_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept} className="text-[#0F1111] bg-white">
                    {dept}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#555555] pointer-events-none absolute right-2" />
            </div>

            {/* Search Input */}
            <div className="flex-1 relative flex items-center bg-white min-w-0">
              <input
                type="text"
                value={inputValue}
                onFocus={() => {
                  setIsSearchFocused(true);
                  setShowSuggestions(true);
                }}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="Search Amazon.sg"
                aria-label="Search Amazon.sg"
                className="w-full h-full px-3 text-[14px] text-[#0F1111] placeholder-[#767676] focus:outline-none"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue('');
                    setShowSuggestions(true);
                  }}
                  aria-label="Clear search query"
                  className="p-1.5 mr-1 text-[#565959] hover:text-[#0F1111]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              aria-label="Go"
              className="w-[45px] bg-[#FEBD69] hover:bg-[#F3A847] active:bg-[#E79733] text-[#111111] flex items-center justify-center shrink-0 transition-colors"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>
          </form>

          {/* Search Autocomplete Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-[42px] bg-white border border-[#D5D9D9] rounded-[4px] shadow-[0_6px_18px_rgba(15,17,17,0.18)] py-1.5 z-50">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-[14px] text-[#0F1111] hover:bg-[#F0F2F2] transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-[#565959] shrink-0" />
                  <span className="truncate font-medium">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Country / Language Indicator (SG EN) */}
        <button
          type="button"
          onClick={onOpenLocationModal}
          className="hidden xl:flex items-center gap-1 px-2 py-2.5 rounded-[2px] border border-transparent hover:border-white transition-colors shrink-0"
          title="Country/Region: Singapore (SGD)"
        >
          <SingaporeFlagIcon />
          <span className="text-[13px] font-bold text-white leading-none">EN</span>
          <ChevronDown className="w-3 h-3 text-[#A7ACB2]" />
        </button>

        {/* Account & Lists Popover */}
        <div ref={accountRef} className="relative hidden lg:block shrink-0">
          <button
            type="button"
            onClick={() => setShowAccountMenu((v) => !v)}
            className="px-2 py-1.5 rounded-[2px] border border-transparent hover:border-white transition-colors text-left leading-tight focus-visible:outline-2 focus-visible:outline-[#FF9900]"
          >
            <div className="text-[11px] text-[#CCCCCC] font-normal whitespace-nowrap">
              Hello, sign in
            </div>
            <div className="text-[13px] font-bold text-white flex items-center gap-0.5 whitespace-nowrap">
              Account &amp; Lists
              <ChevronDown className="w-3.5 h-3.5 text-[#A7ACB2]" />
            </div>
          </button>

          {showAccountMenu && (
            <div className="absolute right-0 top-[52px] w-[340px] bg-white text-[#0F1111] rounded-[4px] border border-[#D5D9D9] shadow-[0_8px_24px_rgba(15,17,17,0.2)] p-4 z-50">
              <div className="text-center pb-3 border-b border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setShowAccountMenu(false)}
                  className="w-48 py-1.5 rounded-[8px] bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[13px] font-medium text-[#0F1111] transition-colors"
                >
                  Sign in
                </button>
                <p className="text-[11px] text-[#565959] mt-1.5">
                  New customer?{' '}
                  <button
                    type="button"
                    onClick={() => setShowAccountMenu(false)}
                    className="text-[#007185] hover:text-[#C7511F] hover:underline"
                  >
                    Start here.
                  </button>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 text-[12px]">
                <div>
                  <h4 className="font-bold text-[13px] text-[#0F1111] mb-2">Your Lists</h4>
                  <ul className="space-y-1.5 text-[#444]">
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAccountMenu(false);
                          onOpenCart();
                        }}
                        className="hover:text-[#C7511F] hover:underline inline-flex items-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 text-[#565959]" />
                        Saved items ({savedCount})
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAccountMenu(false);
                          onQuickNavFilter('prime');
                        }}
                        className="hover:text-[#C7511F] hover:underline"
                      >
                        Prime Eligible Picks
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="border-l border-[#EAEAEA] pl-4">
                  <h4 className="font-bold text-[13px] text-[#0F1111] mb-2">Your Account</h4>
                  <ul className="space-y-1.5 text-[#444]">
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAccountMenu(false);
                          onOpenCart();
                        }}
                        className="hover:text-[#C7511F] hover:underline inline-flex items-center gap-1.5"
                      >
                        <Package className="w-3.5 h-3.5 text-[#565959]" />
                        Orders &amp; Cart
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAccountMenu(false);
                          onOpenLocationModal();
                        }}
                        className="hover:text-[#C7511F] hover:underline inline-flex items-center gap-1.5"
                      >
                        <Clock className="w-3.5 h-3.5 text-[#565959]" />
                        Singapore Address
                      </button>
                    </li>
                    <li className="pt-1">
                      <PrimeBadge />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <button
          type="button"
          onClick={onOpenCart}
          className="hidden xl:block px-2 py-1.5 rounded-[2px] border border-transparent hover:border-white transition-colors text-left leading-tight shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF9900]"
        >
          <div className="text-[11px] text-[#CCCCCC] font-normal whitespace-nowrap">
            Returns
          </div>
          <div className="text-[13px] font-bold text-white whitespace-nowrap">
            &amp; Orders
          </div>
        </button>

        {/* Cart Trigger */}
        <button
          type="button"
          onClick={onOpenCart}
          className="flex items-end px-2 py-1 rounded-[2px] border border-transparent hover:border-white transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF9900]"
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          <AmazonCartIcon count={cartCount} />
          <span className="hidden sm:inline text-[13px] font-bold text-white pb-1">
            Cart
          </span>
        </button>
      </div>

      {/* Secondary Sub-Header Navigation Bar (#232F3E) */}
      <nav
        aria-label="Shop categories"
        className="bg-[#232F3E] text-white px-2 lg:px-4 h-[39px] flex items-center gap-0.5 overflow-x-auto amazon-scroll"
      >
        <button
          type="button"
          onClick={onOpenAllMenu}
          className="flex items-center gap-1.5 px-2.5 h-[32px] rounded-[2px] border border-transparent hover:border-white text-[13px] font-bold whitespace-nowrap shrink-0 transition-colors"
        >
          <Menu className="w-4 h-4 stroke-[2.4]" />
          <span>All</span>
        </button>

        {SUBNAV_ITEMS.map((item) => {
          const isActive = activeNavTag === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onQuickNavFilter(item.id)}
              className={`flex items-center gap-0.5 px-2.5 h-[32px] rounded-[2px] border text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'border-[#FF9900] text-[#FF9900] bg-white/5'
                  : 'border-transparent hover:border-white text-white'
              }`}
            >
              <span>{item.label}</span>
              {item.hasCaret && (
                <ChevronDown className="w-3 h-3 text-[#A7ACB2] ml-0.5" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile Delivery Bar */}
      <button
        type="button"
        onClick={onOpenLocationModal}
        className="md:hidden w-full bg-[#37475A] text-white px-3 py-2 flex items-center gap-1.5 text-[12px] text-left"
      >
        <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
        <span className="truncate">
          Deliver to <strong className="font-semibold">{deliveryLocation.label} {deliveryLocation.postalCode}</strong>
        </span>
      </button>
    </header>
  );
};
