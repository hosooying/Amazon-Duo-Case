import React from 'react';
import { X, ChevronRight, User } from 'lucide-react';
import { SingaporeFlagIcon } from './AmazonIcons';

interface AllMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFilter: (action: string) => void;
}

export const AllMenuDrawer: React.FC<AllMenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectFilter,
}) => {
  if (!isOpen) return null;

  const handleAction = (action: string) => {
    onSelectFilter(action);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-label="Browse all Amazon.sg categories"
      onClick={onClose}
    >
      <div
        className="w-[320px] max-w-[85vw] bg-white h-full flex flex-col shadow-[8px_0_28px_rgba(0,0,0,0.28)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Greeting Bar */}
        <div className="bg-[#232F3E] text-white px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white text-[#232F3E] flex items-center justify-center">
              <User className="w-4 h-4 stroke-[2.4]" />
            </div>
            <span className="text-[17px] font-bold">Hello, sign in</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-1 rounded hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Directory */}
        <div className="flex-1 overflow-y-auto amazon-scroll divide-y divide-[#EAEAEA] text-[14px]">
          <div className="py-3">
            <h3 className="px-6 py-2 text-[16px] font-bold text-[#0F1111]">
              Trending
            </h3>
            {[
              { id: 'best-sellers', label: 'Best Sellers' },
              { id: 'new-releases', label: 'New Releases' },
              { id: 'deals', label: "Today's Deals" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleAction(item.id)}
                className="w-full px-6 py-2.5 text-left text-[#111] hover:bg-[#EAEDED] flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#888C8C]" />
              </button>
            ))}
          </div>

          <div className="py-3">
            <h3 className="px-6 py-2 text-[16px] font-bold text-[#0F1111]">
              iPhone Duo Case Styles
            </h3>
            {[
              { id: 'hinge', label: 'Rugged Hinge Protection' },
              { id: 'aramid', label: 'Ultra-Thin & Aramid Fiber' },
              { id: 'magsafe', label: 'MagSafe & Clear Shells' },
              { id: 'kickstand', label: 'Kickstand & Ring Stand Cases' },
              { id: 'folio', label: 'Leather Wallet Folios' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleAction(item.id)}
                className="w-full px-6 py-2.5 text-left text-[#111] hover:bg-[#EAEDED] flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#888C8C]" />
              </button>
            ))}
          </div>

          <div className="py-3">
            <h3 className="px-6 py-2 text-[16px] font-bold text-[#0F1111]">
              Programs &amp; Features
            </h3>
            {[
              { id: 'prime', label: 'Amazon Prime Singapore' },
              { id: 'international', label: 'Amazon International Store (US / JP)' },
              { id: 'fresh', label: 'Amazon Fresh' },
              { id: 'reset', label: 'All iPhone Duo Cases' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleAction(item.id)}
                className="w-full px-6 py-2.5 text-left text-[#111] hover:bg-[#EAEDED] flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#888C8C]" />
              </button>
            ))}
          </div>

          <div className="py-4 px-6 flex items-center gap-2 text-[13px] text-[#565959]">
            <SingaporeFlagIcon />
            <span>Singapore · English (SGD)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
