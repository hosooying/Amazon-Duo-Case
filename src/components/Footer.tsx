import React from 'react';
import { AmazonSgLogo, SingaporeFlagIcon } from './AmazonIcons';

interface FooterProps {
  onQuickAction: (action: string) => void;
}

const FOOTER_COLUMNS = [
  {
    title: 'Get to Know Us',
    links: [
      { label: 'About Amazon Singapore', action: 'reset' },
      { label: 'Careers', action: 'reset' },
      { label: 'Amazon Science', action: 'reset' },
      { label: 'Sustainability', action: 'reset' },
    ],
  },
  {
    title: 'Shop with Us',
    links: [
      { label: 'Amazon Prime', action: 'prime' },
      { label: 'Amazon Fresh', action: 'fresh' },
      { label: 'Amazon International Store', action: 'international' },
      { label: "Today's Deals", action: 'deals' },
    ],
  },
  {
    title: 'Make Money with Us',
    links: [
      { label: 'Sell on Amazon.sg', action: 'reset' },
      { label: 'Fulfilment by Amazon', action: 'reset' },
      { label: 'Protect and Build Your Brand', action: 'reset' },
      { label: 'Advertise Your Products', action: 'reset' },
    ],
  },
  {
    title: 'Let Us Help You',
    links: [
      { label: 'Your Account', action: 'cart' },
      { label: 'Shipping Rates & Policies', action: 'location' },
      { label: 'Returns & Replacements', action: 'cart' },
      { label: 'Singapore GST & Import Info', action: 'international' },
      { label: 'Help & Customer Service', action: 'reset' },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({ onQuickAction }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-10 w-full">
      {/* Back to top strip */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-full bg-[#37475A] hover:bg-[#485769] text-white text-[13px] font-medium py-3.5 text-center transition-colors"
      >
        Back to top
      </button>

      {/* Main Directory */}
      <div className="bg-[#232F3E] text-[#DDDDDD] px-6 py-10">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[15px] font-bold text-white mb-3">
                {col.title}
              </h3>
              <ul className="space-y-2 text-[13px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => onQuickAction(link.action)}
                      className="text-[#DDDDDD] hover:underline text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Locale & Wordmark Row */}
      <div className="bg-[#232F3E] border-t border-[#3A4553] py-6 px-6">
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <AmazonSgLogo size="sm" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onQuickAction('location')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[3px] border border-[#848688] text-[13px] text-[#CCCCCC] hover:text-white hover:border-white transition-colors"
            >
              <SingaporeFlagIcon />
              <span>Singapore</span>
            </button>
            <span className="inline-flex items-center px-3 py-1.5 rounded-[3px] border border-[#848688] text-[13px] text-[#CCCCCC]">
              S$ SGD
            </span>
          </div>
        </div>
      </div>

      {/* Legal Bottom Strip */}
      <div className="bg-[#131921] text-[#CCCCCC] text-[12px] py-6 px-6 text-center space-y-2">
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <button
            type="button"
            onClick={() => onQuickAction('reset')}
            className="hover:underline"
          >
            Conditions of Use &amp; Sale
          </button>
          <button
            type="button"
            onClick={() => onQuickAction('reset')}
            className="hover:underline"
          >
            Privacy Notice
          </button>
          <button
            type="button"
            onClick={() => onQuickAction('reset')}
            className="hover:underline"
          >
            Interest-Based Ads Notice
          </button>
        </div>
        <p className="text-[#999999] text-[11px]">
          © 1996–2026, Amazon.com, Inc. or its affiliates · Amazon Singapore Pte. Ltd.
        </p>
      </div>
    </footer>
  );
};
