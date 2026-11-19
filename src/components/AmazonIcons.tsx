import React from 'react';

export const AmazonSgLogo: React.FC<{ className?: string; size?: 'sm' | 'md' }> = ({
  className = '',
  size = 'md',
}) => {
  const heightClass = size === 'sm' ? 'h-7' : 'h-8';
  return (
    <div className={`inline-flex items-start select-none ${heightClass} ${className}`}>
      <svg
        viewBox="0 0 132 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Amazon.sg"
      >
        <text
          x="2"
          y="23"
          fill="#FFFFFF"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="800"
          fontSize="24"
          letterSpacing="-0.8"
        >
          amazon
        </text>
        <text
          x="99"
          y="23"
          fill="#FFFFFF"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="600"
          fontSize="14.5"
          letterSpacing="-0.2"
        >
          .sg
        </text>
        {/* Signature curved Amazon smile arrow */}
        <path
          d="M17 28.5C34 36.2 64 36.5 85.5 27.6"
          stroke="#FF9900"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M80.5 25.5L88.2 26.8L84.8 33.4"
          stroke="#FF9900"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const PrimeBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={`inline-flex items-center select-none leading-none ${className}`}
    aria-label="Amazon Prime"
  >
    <svg viewBox="0 0 56 18" className="h-[15px] w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.2 10.6L5.8 14L11.8 6.4"
        stroke="#FF9900"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="13"
        y="13.5"
        fill="#00A8E1"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="800"
        fontSize="13"
        letterSpacing="-0.4"
      >
        prime
      </text>
    </svg>
  </span>
);

export const SingaporeFlagIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-[1px] shrink-0 ${className}`}
    aria-hidden="true"
  >
    <rect width="24" height="8" fill="#EF3340" />
    <rect y="8" width="24" height="8" fill="#FFFFFF" />
    <circle cx="5.2" cy="4" r="2.6" fill="#FFFFFF" />
    <circle cx="6.2" cy="4" r="2.2" fill="#EF3340" />
    <circle cx="8.2" cy="2.6" r="0.55" fill="#FFFFFF" />
    <circle cx="9.6" cy="3.6" r="0.55" fill="#FFFFFF" />
    <circle cx="9.1" cy="5.2" r="0.55" fill="#FFFFFF" />
    <circle cx="7.4" cy="5.2" r="0.55" fill="#FFFFFF" />
    <circle cx="6.9" cy="3.6" r="0.55" fill="#FFFFFF" />
  </svg>
);

export const AmazonCartIcon: React.FC<{ count: number }> = ({ count }) => (
  <div className="relative inline-flex items-center justify-center w-10 h-8">
    <span
      className={`absolute -top-0.5 left-[21px] -translate-x-1/2 font-bold leading-none tabular-nums text-[#F08804] ${
        count > 99 ? 'text-[11px]' : count > 9 ? 'text-[13px]' : 'text-[15px]'
      }`}
    >
      {count > 99 ? '99+' : count}
    </span>
    <svg
      viewBox="0 0 42 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-8"
      aria-hidden="true"
    >
      <path
        d="M2.5 5.5H8.5L13 21.5H31.5L36 9.5H10.5"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="27.5" r="2.5" fill="#FFFFFF" />
      <circle cx="29.5" cy="27.5" r="2.5" fill="#FFFFFF" />
    </svg>
  </div>
);

export const StarRating: React.FC<{
  rating: number;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}> = ({ rating, size = 'sm', className = '' }) => {
  const px = size === 'xs' ? 13 : size === 'md' ? 18 : 15;
  return (
    <span
      className={`inline-flex items-center gap-[1px] ${className}`}
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const diff = rating - (starIndex - 1);
        const fillType = diff >= 0.75 ? 'full' : diff >= 0.25 ? 'half' : 'empty';
        const gradId = `star-half-${starIndex}-${Math.round(rating * 10)}`;
        return (
          <svg
            key={starIndex}
            width={px}
            height={px}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {fillType === 'half' && (
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="50%" stopColor="#DE7921" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
            )}
            <path
              d="M10 1.6L12.55 6.76L18.25 7.59L14.12 11.61L15.1 17.28L10 14.6L4.9 17.28L5.88 11.61L1.75 7.59L7.45 6.76L10 1.6Z"
              fill={
                fillType === 'full'
                  ? '#DE7921'
                  : fillType === 'half'
                    ? `url(#${gradId})`
                    : '#FFFFFF'
              }
              stroke="#DE7921"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </span>
  );
};
