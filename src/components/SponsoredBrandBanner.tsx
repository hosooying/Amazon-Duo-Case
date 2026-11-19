import React from 'react';
import { ChevronRight, Info } from 'lucide-react';
import { Product } from '../data/products';
import { StarRating } from './AmazonIcons';

interface SponsoredBrandBannerProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onFilterBySpigen: () => void;
}

export const SponsoredBrandBanner: React.FC<SponsoredBrandBannerProps> = ({
  products,
  onSelectProduct,
  onFilterBySpigen,
}) => {
  const spigenShowcase = products
    .filter((p) => p.brand === 'Spigen')
    .slice(0, 3);

  if (spigenShowcase.length < 3) return null;

  return (
    <section
      aria-label="Sponsored brand showcase"
      className="mb-4 border border-[#E3E6E6] rounded-[4px] bg-white overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Brand Editorial Panel */}
        <div className="lg:col-span-4 bg-[#F7F8F8] border-b lg:border-b-0 lg:border-r border-[#EAEAEA] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="inline-flex items-center gap-2">
                <div className="w-8 h-8 bg-[#131921] text-white font-extrabold text-[14px] flex items-center justify-center rounded-[3px] tracking-tighter">
                  SP
                </div>
                <span className="font-bold text-[15px] tracking-tight text-[#0F1111]">
                  Spigen Official SG
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#565959]">
                Sponsored
                <Info className="w-3 h-3 text-[#767676]" />
              </span>
            </div>

            <h2 className="text-[16px] font-bold text-[#0F1111] leading-snug mb-1.5">
              Engineered for iPhone Duo. Patented Semi-Auto Hinge Protection.
            </h2>
            <p className="text-[12px] text-[#565959] leading-relaxed">
              Local Singapore stock with Prime next-day delivery and MagFit N52 alignment.
            </p>
          </div>

          <button
            type="button"
            onClick={onFilterBySpigen}
            className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-[#007185] hover:text-[#C7511F] hover:underline w-fit"
          >
            Shop Spigen iPhone Duo Store
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right 3 Product Showcase Tiles */}
        <div className="lg:col-span-8 grid grid-cols-3 divide-x divide-[#EAEAEA]">
          {spigenShowcase.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectProduct(item)}
              className="p-3 text-left hover:bg-[#FAFAFA] transition-colors flex flex-col justify-between group focus-visible:outline-2 focus-visible:outline-[#007185]"
            >
              <div className="w-full h-[110px] sm:h-[125px] bg-[#F7F7F7] rounded-[3px] overflow-hidden flex items-center justify-center mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-1.5 group-hover:scale-[1.03] transition-transform duration-200"
                />
              </div>
              <div>
                <p className="text-[12px] text-[#0F1111] group-hover:text-[#C7511F] line-clamp-2 leading-snug mb-1">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <StarRating rating={item.rating} size="xs" />
                  <span className="text-[11px] text-[#007185] tabular-nums">
                    {item.reviewCount.toLocaleString()}
                  </span>
                  <span className="text-[13px] font-bold text-[#0F1111] tabular-nums ml-auto">
                    S${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
