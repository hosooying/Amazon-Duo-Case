import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Info,
  Check,
  Trash2,
  Plus,
  Minus,
  Smartphone,
} from 'lucide-react';
import { Product } from '../data/products';
import { PrimeBadge, StarRating } from './AmazonIcons';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  cartQuantity: number;
  selectedColour: string;
  voucherApplied: boolean;
  onSelectColour: (colour: string) => void;
  onToggleVoucher: () => void;
  onAddToCart: () => void;
  onOneClickBuy: () => void;
  onUpdateCartQty: (delta: number) => void;
  onOpenDetail: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
  cartQuantity,
  selectedColour,
  voucherApplied,
  onSelectColour,
  onToggleVoucher,
  onAddToCart,
  onOneClickBuy,
  onUpdateCartQty,
  onOpenDetail,
}) => {
  const [imgError, setImgError] = useState(false);
  const [showRatingPopover, setShowRatingPopover] = useState(false);
  const ratingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showRatingPopover) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ratingRef.current && !ratingRef.current.contains(e.target as Node)) {
        setShowRatingPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showRatingPopover]);

  const wholeDollars = Math.floor(product.price);
  const cents = (product.price - wholeDollars).toFixed(2).slice(2);
  const discountPercent = product.listPrice
    ? Math.round(((product.listPrice - product.price) / product.listPrice) * 100)
    : null;

  const isList = viewMode === 'list';

  return (
    <article
      className={`group bg-white border border-[#E7E9EC] rounded-[4px] overflow-hidden flex transition-shadow duration-150 hover:shadow-[0_2px_10px_rgba(15,17,17,0.08)] ${
        isList ? 'flex-col sm:flex-row' : 'flex-col h-full'
      }`}
    >
      {/* Product Image Area */}
      <div
        className={`relative bg-[#F7F7F7] flex items-center justify-center overflow-hidden shrink-0 ${
          isList
            ? 'w-full sm:w-[235px] md:w-[260px] h-[220px] sm:h-auto sm:min-h-[240px]'
            : 'w-full aspect-square max-h-[245px]'
        }`}
      >
        {/* Authentic single editorial ribbon (only on select items) */}
        {product.badge === 'Best Seller' && (
          <div className="absolute top-0 left-0 z-10 bg-[#D14900] text-white text-[11px] font-bold pl-2.5 pr-4 py-1 amazon-ribbon-cut tracking-tight">
            Best Seller
          </div>
        )}
        {product.badge === "Amazon's Choice" && (
          <div className="absolute top-0 left-0 z-10 bg-[#232F3E] text-white text-[11px] font-semibold pl-2.5 pr-4 py-1 amazon-ribbon-cut">
            Amazon&apos;s{' '}
            <span className="text-[#FF9900] font-bold">Choice</span>
          </div>
        )}

        <button
          type="button"
          onClick={onOpenDetail}
          aria-label={`View details for ${product.title}`}
          className="w-full h-full flex items-center justify-center p-4 focus-visible:outline-2 focus-visible:outline-[#007185]"
        >
          {!imgError ? (
            <img
              src={product.image}
              alt={`${product.brand} ${product.title}`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#565959] gap-2 p-4 text-center">
              <Smartphone className="w-10 h-10 text-[#888C8C]" />
              <span className="text-[12px] font-medium">{product.brand} iPhone Duo Case</span>
            </div>
          )}
        </button>
      </div>

      {/* Product Body Details */}
      <div
        className={`flex-1 flex flex-col justify-between p-3.5 ${
          isList ? 'sm:px-5 sm:py-4' : ''
        }`}
      >
        <div>
          {/* Sponsored label (only on sponsored cards) */}
          {product.isSponsored && (
            <div className="flex items-center gap-1 text-[11px] text-[#565959] mb-1">
              <span>Sponsored</span>
              <Info className="w-3 h-3 text-[#767676]" />
            </div>
          )}

          {/* Interactive Colour Swatches */}
          {product.colours.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              {product.colours.map((c) => {
                const active = selectedColour === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => onSelectColour(c.name)}
                    title={c.name}
                    aria-label={`Select colour ${c.name}`}
                    className={`w-[18px] h-[18px] rounded-full p-[1.5px] transition-transform ${
                      active
                        ? 'ring-[1.5px] ring-[#007185] ring-offset-1 scale-105'
                        : 'border border-[#C9CCCC] hover:scale-110'
                    }`}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-black/10"
                      style={{
                        background: c.secondaryHex
                          ? `linear-gradient(135deg, ${c.hex} 55%, ${c.secondaryHex} 55%)`
                          : c.hex,
                      }}
                    />
                  </button>
                );
              })}
              <span className="text-[11px] text-[#565959] ml-1 truncate max-w-[125px]">
                {selectedColour}
              </span>
            </div>
          )}

          {/* Brand & Title */}
          <div className="text-[12px] font-semibold text-[#565959] mb-0.5">
            {product.brand}
          </div>
          <h3 className="text-[14px] leading-[1.35] font-normal text-[#0F1111] mb-1.5">
            <button
              type="button"
              onClick={onOpenDetail}
              className={`text-left hover:text-[#C7511F] transition-colors focus-visible:outline-2 focus-visible:outline-[#007185] ${
                isList ? 'line-clamp-2 text-[16px] font-medium' : 'line-clamp-3'
              }`}
            >
              {product.title}
            </button>
          </h3>

          {/* Ratings Row with Interactive Breakdown Popover */}
          <div ref={ratingRef} className="relative flex items-center gap-1 mb-0.5">
            <button
              type="button"
              onClick={() => setShowRatingPopover((v) => !v)}
              className="inline-flex items-center gap-0.5 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[#007185]"
              aria-label={`Show rating breakdown: ${product.rating} out of 5 stars`}
            >
              <StarRating rating={product.rating} size="sm" />
              <ChevronDown className="w-3.5 h-3.5 text-[#565959]" />
            </button>
            <button
              type="button"
              onClick={onOpenDetail}
              className="text-[12px] text-[#007185] hover:text-[#C7511F] tabular-nums ml-0.5"
            >
              {product.reviewCount.toLocaleString()}
            </button>

            {showRatingPopover && (
              <div className="absolute left-0 top-6 z-30 w-[265px] bg-white border border-[#D5D9D9] rounded-[6px] shadow-[0_6px_18px_rgba(15,17,17,0.18)] p-3.5 text-[12px]">
                <div className="flex items-center gap-2 mb-1">
                  <StarRating rating={product.rating} size="sm" />
                  <span className="font-bold text-[14px] text-[#0F1111] tabular-nums">
                    {product.rating.toFixed(1)} out of 5
                  </span>
                </div>
                <p className="text-[#565959] mb-2.5 tabular-nums">
                  {product.reviewCount.toLocaleString()} global ratings
                </p>
                <div className="space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star, idx) => {
                    const pct = product.ratingBreakdown[idx];
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[#007185] w-10 shrink-0">
                          {star} star
                        </span>
                        <div className="flex-1 h-3.5 bg-[#F0F2F2] rounded-[3px] border border-[#E3E6E6] overflow-hidden">
                          <div
                            className="h-full bg-[#FFA41C]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-[#007185] tabular-nums">
                          {pct}%
                        </span>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowRatingPopover(false);
                    onOpenDetail();
                  }}
                  className="mt-3 pt-2 border-t border-[#EAEAEA] w-full text-center text-[#007185] hover:text-[#C7511F] hover:underline font-medium"
                >
                  See customer reviews &rsaquo;
                </button>
              </div>
            )}
          </div>

          {product.boughtPastMonth && (
            <p className="text-[12px] text-[#565959] mb-2">
              {product.boughtPastMonth}
            </p>
          )}

          {/* Limited Time Deal Tag */}
          {product.badge === 'Limited time deal' && (
            <div className="mb-1.5">
              <span className="inline-block bg-[#CC0C39] text-white text-[11px] font-bold px-2 py-0.5 rounded-[2px]">
                Limited time deal
              </span>
            </div>
          )}

          {/* Authentic Amazon Superscript SGD Price Block */}
          <div className="flex items-baseline flex-wrap gap-x-1.5 gap-y-0.5 mb-1 tabular-nums">
            <button
              type="button"
              onClick={onOpenDetail}
              className="inline-flex items-start text-[#0F1111] leading-none"
            >
              <span className="text-[12px] font-medium relative top-[3px] mr-[1px]">
                S$
              </span>
              <span className="text-[26px] font-medium tracking-tight">
                {wholeDollars}
              </span>
              <span className="text-[12px] font-medium relative top-[3px]">
                {cents}
              </span>
            </button>

            {product.listPrice && (
              <span className="text-[12px] text-[#565959]">
                List:{' '}
                <span className="line-through">
                  S${product.listPrice.toFixed(2)}
                </span>
              </span>
            )}
            {discountPercent && discountPercent > 0 && (
              <span className="text-[12px] text-[#0F1111]">
                ({discountPercent}% off)
              </span>
            )}
          </div>

          {/* Interactive Amazon.sg Green Voucher Toggle */}
          {product.voucher && (
            <div className="mb-2">
              <button
                type="button"
                onClick={onToggleVoucher}
                className="inline-flex items-center gap-1.5 text-[12px] text-left group/voucher"
              >
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 font-semibold rounded-[2px] transition-colors ${
                    voucherApplied
                      ? 'bg-[#067D62] text-white'
                      : 'bg-[#7FDA69] text-[#0F1111] group-hover/voucher:bg-[#6BCE55]'
                  }`}
                >
                  {voucherApplied && <Check className="w-3 h-3 stroke-[3]" />}
                  {product.voucher.label}
                </span>
                <span className="text-[#565959] group-hover/voucher:text-[#0F1111]">
                  {voucherApplied ? 'voucher applied' : 'with voucher'}
                </span>
              </button>
            </div>
          )}

          {/* Prime & Singapore Delivery Info */}
          <div className="space-y-0.5 text-[12px] leading-snug text-[#0F1111] mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.isPrime && <PrimeBadge />}
              <span>
                {product.isFreeDelivery ? 'FREE delivery ' : 'Delivery '}
                <strong className="font-bold">{product.deliveryDateText}</strong>
              </span>
            </div>
            {product.shippingOrigin !== 'Singapore' ? (
              <p className="text-[11px] text-[#565959]">
                Ships from {product.shippingOrigin} · Amazon International Store
              </p>
            ) : (
              product.deliverySubtext && (
                <p className="text-[11px] text-[#565959]">
                  {product.deliverySubtext}
                </p>
              )
            )}
            {product.stockStatus !== 'In Stock' && (
              <p className="text-[12px] text-[#B12704] font-medium pt-0.5">
                {product.stockStatus}
              </p>
            )}
          </div>

          {/* List View Key Specs Preview */}
          {isList && (
            <ul className="hidden md:block list-disc pl-4 space-y-1 text-[12px] text-[#333] mb-3 max-w-2xl">
              {product.aboutBullets.slice(0, 2).map((bullet, i) => (
                <li key={i} className="line-clamp-1">
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bottom Primary Actions: Add to Cart + Buy now with 1-Click directly below */}
        <div
          className={`pt-1.5 flex flex-col gap-2 ${
            isList ? 'items-start' : 'items-stretch'
          }`}
        >
          <div className="flex items-center gap-2 flex-wrap">
            {cartQuantity === 0 ? (
              <button
                type="button"
                onClick={onAddToCart}
                className={`${
                  isList ? 'w-[184px]' : 'w-full'
                } px-4 py-[7px] rounded-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] border border-[#FCD200] text-[13px] font-medium text-[#0F1111] shadow-[0_1px_2px_rgba(15,17,17,0.08)] transition-colors whitespace-nowrap`}
              >
                Add to cart
              </button>
            ) : (
              <div
                className={`${
                  isList ? 'w-[184px]' : 'w-full'
                } inline-flex items-center justify-between rounded-full border-[2px] border-[#FFD814] bg-white overflow-hidden shadow-[0_1px_2px_rgba(15,17,17,0.08)]`}
              >
                <button
                  type="button"
                  onClick={() => onUpdateCartQty(-1)}
                  aria-label={cartQuantity === 1 ? 'Remove from cart' : 'Decrease quantity'}
                  className="w-10 h-[30px] flex items-center justify-center hover:bg-[#F7F8F8] text-[#0F1111] transition-colors"
                >
                  {cartQuantity === 1 ? (
                    <Trash2 className="w-3.5 h-3.5" />
                  ) : (
                    <Minus className="w-3.5 h-3.5" />
                  )}
                </button>
                <span className="px-2.5 text-[13px] font-bold text-[#0F1111] tabular-nums select-none">
                  {cartQuantity} in cart
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateCartQty(1)}
                  aria-label="Increase quantity"
                  className="w-10 h-[30px] flex items-center justify-center hover:bg-[#F7F8F8] text-[#0F1111] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {isList && (
              <button
                type="button"
                onClick={onOpenDetail}
                className="text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline ml-1"
              >
                Quick view details
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onOneClickBuy}
            className={`${
              isList ? 'w-[184px]' : 'w-full'
            } px-4 py-[7px] rounded-full bg-[#FFA41C] hover:bg-[#FA8900] active:bg-[#E77600] border border-[#FF8F00] text-[13px] font-medium text-[#0F1111] shadow-[0_1px_2px_rgba(15,17,17,0.08)] transition-colors whitespace-nowrap`}
          >
            Buy now with 1-Click
          </button>
        </div>
      </div>
    </article>
  );
};
