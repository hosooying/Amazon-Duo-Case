import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  ShieldCheck,
  RotateCcw,
  Truck,
  Check,
  Heart,
  ThumbsUp,
  Lock,
} from 'lucide-react';
import { Product } from '../data/products';
import { PrimeBadge, StarRating } from './AmazonIcons';

interface ProductDetailModalProps {
  product: Product | null;
  selectedColour: string;
  voucherApplied: boolean;
  isSaved: boolean;
  deliveryLocation: { label: string; postalCode: string };
  onClose: () => void;
  onSelectColour: (colour: string) => void;
  onToggleVoucher: () => void;
  onToggleSave: () => void;
  onAddToCart: (qty: number) => void;
  onBuyNow: (qty: number) => void;
  onFilterBrand: (brand: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  selectedColour,
  voucherApplied,
  isSaved,
  deliveryLocation,
  onClose,
  onSelectColour,
  onToggleVoucher,
  onToggleSave,
  onAddToCart,
  onBuyNow,
  onFilterBrand,
}) => {
  const [qty, setQty] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setQty(1);
    setZoomed(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const discountedPrice =
    voucherApplied && product.voucher
      ? product.voucher.type === 'percent'
        ? product.price * (1 - product.voucher.value / 100)
        : Math.max(0, product.price - product.voucher.value)
      : product.price;

  const wholeDollars = Math.floor(discountedPrice);
  const cents = (discountedPrice - wholeDollars).toFixed(2).slice(2);
  const discountPercent = product.listPrice
    ? Math.round(((product.listPrice - product.price) / product.listPrice) * 100)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[8px] max-w-[1160px] w-full max-h-[90vh] overflow-y-auto amazon-scroll shadow-[0_16px_48px_rgba(0,0,0,0.28)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Sticky Top Bar */}
        <div className="sticky top-0 z-20 bg-[#F7F8F8] border-b border-[#E3E6E6] px-5 py-3 flex items-center justify-between gap-4">
          <div className="text-[12px] text-[#565959] truncate">
            <span>Electronics</span>
            <span className="mx-1.5">&rsaquo;</span>
            <span>Mobile Phones &amp; Accessories</span>
            <span className="mx-1.5">&rsaquo;</span>
            <span>{product.department}</span>
            <span className="mx-1.5">&rsaquo;</span>
            <span className="text-[#0F1111] font-medium">{product.brand}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="p-1.5 rounded-full hover:bg-[#E7E9EC] text-[#0F1111] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Column Amazon Product Detail Grid */}
        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Gallery Preview */}
          <div className="lg:col-span-4">
            <div
              onClick={() => setZoomed((z) => !z)}
              className="bg-[#F7F7F7] rounded-[6px] border border-[#EAEAEA] aspect-square flex items-center justify-center p-5 overflow-hidden cursor-zoom-in relative"
            >
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-contain transition-transform duration-300 ${
                  zoomed ? 'scale-125 cursor-zoom-out' : 'hover:scale-105'
                }`}
              />
              <span className="absolute bottom-2.5 right-3 text-[11px] text-[#565959] bg-white/90 px-2 py-0.5 rounded-[3px] border border-[#E3E6E6]">
                {zoomed ? 'Click to reset zoom' : 'Click image to zoom'}
              </span>
            </div>

            {/* Trust Highlights Bar */}
            <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-[#EAEAEA] text-center text-[11px] text-[#007185]">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#232F3E]" />
                <span>{product.shippingOrigin === 'Singapore' ? 'SG Local Stock' : product.shippingOrigin}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#232F3E]" />
                <span>15-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#232F3E]" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Column 2: Title, Price, Colour Swatches, Specs */}
          <div className="lg:col-span-5 space-y-3.5">
            <div>
              <button
                type="button"
                onClick={() => {
                  onFilterBrand(product.brand);
                  onClose();
                }}
                className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline font-medium"
              >
                Visit the {product.brand} Store
              </button>
              <h2 className="text-[20px] sm:text-[22px] font-medium text-[#0F1111] leading-snug mt-0.5">
                {product.title}
              </h2>

              <div className="flex items-center gap-2 mt-2 flex-wrap text-[13px]">
                <span className="font-semibold text-[#0F1111] tabular-nums">
                  {product.rating.toFixed(1)}
                </span>
                <StarRating rating={product.rating} size="sm" />
                <span className="text-[#007185] tabular-nums">
                  {product.reviewCount.toLocaleString()} ratings
                </span>
                {product.boughtPastMonth && (
                  <>
                    <span className="text-[#D5D9D9]">|</span>
                    <span className="text-[#565959] text-[12px]">
                      {product.boughtPastMonth}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-b border-[#EAEAEA] py-3 space-y-2">
              {product.badge === 'Limited time deal' && (
                <span className="inline-block bg-[#CC0C39] text-white text-[12px] font-bold px-2.5 py-0.5 rounded-[3px]">
                  Limited time deal
                </span>
              )}

              <div className="flex items-baseline gap-2.5 flex-wrap tabular-nums">
                {discountPercent && discountPercent > 0 && (
                  <span className="text-[24px] font-normal text-[#CC0C39]">
                    -{discountPercent}%
                  </span>
                )}
                <div className="inline-flex items-start text-[#0F1111] leading-none">
                  <span className="text-[13px] font-medium relative top-[4px] mr-0.5">
                    S$
                  </span>
                  <span className="text-[28px] font-semibold tracking-tight">
                    {wholeDollars}
                  </span>
                  <span className="text-[13px] font-medium relative top-[4px]">
                    {cents}
                  </span>
                </div>
                {voucherApplied && (
                  <span className="text-[12px] text-[#067D62] font-semibold">
                    (after voucher)
                  </span>
                )}
              </div>

              {product.listPrice && (
                <div className="text-[12px] text-[#565959] tabular-nums">
                  List Price:{' '}
                  <span className="line-through">
                    S${product.listPrice.toFixed(2)}
                  </span>
                  <span className="ml-2">Inclusive of GST (9%)</span>
                </div>
              )}

              {product.voucher && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={onToggleVoucher}
                    className="inline-flex items-center gap-2 text-[13px]"
                  >
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] font-semibold ${
                        voucherApplied
                          ? 'bg-[#067D62] text-white'
                          : 'bg-[#7FDA69] text-[#0F1111]'
                      }`}
                    >
                      {voucherApplied && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      Voucher: {product.voucher.label}
                    </span>
                    <span className="text-[#007185] hover:underline">
                      {voucherApplied ? 'Applied at checkout' : 'Apply voucher'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Colour Variant Selector */}
            <div>
              <div className="text-[13px] text-[#565959] mb-2">
                Colour:{' '}
                <strong className="text-[#0F1111] font-semibold">
                  {selectedColour}
                </strong>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.colours.map((c) => {
                  const active = selectedColour === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => onSelectColour(c.name)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-[6px] border text-[12px] transition-colors ${
                        active
                          ? 'border-[#007185] bg-[#EDFDFF] font-semibold text-[#0F1111]'
                          : 'border-[#D5D9D9] hover:border-[#888C8C] text-[#0F1111]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                        style={{
                          background: c.secondaryHex
                            ? `linear-gradient(135deg, ${c.hex} 55%, ${c.secondaryHex} 55%)`
                            : c.hex,
                        }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Technical Specs Table */}
            <div className="border-t border-[#EAEAEA] pt-3">
              <dl className="grid grid-cols-1 gap-y-1.5 text-[13px]">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-[#0F1111]">
                      {key}
                    </dt>
                    <dd className="col-span-7 text-[#333333]">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* About This Item */}
            <div className="border-t border-[#EAEAEA] pt-3">
              <h3 className="font-bold text-[14px] text-[#0F1111] mb-2">
                About this item
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-[13px] leading-relaxed text-[#0F1111]">
                {product.aboutBullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Contiguous Amazon Buy Box */}
          <div className="lg:col-span-3">
            <div className="border border-[#D5D9D9] rounded-[8px] p-4 space-y-3 bg-white sticky top-16">
              <div className="inline-flex items-start text-[#0F1111] leading-none tabular-nums">
                <span className="text-[13px] font-medium relative top-[4px] mr-0.5">
                  S$
                </span>
                <span className="text-[26px] font-semibold tracking-tight">
                  {wholeDollars}
                </span>
                <span className="text-[13px] font-medium relative top-[4px]">
                  {cents}
                </span>
              </div>

              {product.isPrime && (
                <div>
                  <PrimeBadge />
                </div>
              )}

              <div className="text-[13px] leading-snug text-[#0F1111]">
                <span className="text-[#007185]">FREE delivery</span>{' '}
                <strong className="font-bold">{product.deliveryDateText}</strong>
                {product.deliverySubtext && (
                  <p className="text-[12px] text-[#565959] mt-0.5">
                    {product.deliverySubtext}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-1.5 text-[12px] text-[#007185]">
                <MapPin className="w-3.5 h-3.5 text-[#0F1111] mt-0.5 shrink-0" />
                <span>
                  Deliver to {deliveryLocation.label}{' '}
                  {deliveryLocation.postalCode}
                </span>
              </div>

              <div
                className={`text-[16px] font-semibold ${
                  product.stockStatus === 'In Stock'
                    ? 'text-[#007600]'
                    : 'text-[#B12704]'
                }`}
              >
                {product.stockStatus}
              </div>

              {/* Quantity Dropdown */}
              <div>
                <label className="sr-only" htmlFor="pdp-qty">
                  Quantity
                </label>
                <select
                  id="pdp-qty"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full h-[34px] px-3 text-[13px] bg-[#F0F2F2] hover:bg-[#E3E6E6] border border-[#D5D9D9] rounded-[8px] shadow-[0_1px_2px_rgba(15,17,17,0.1)] focus:outline-none focus:ring-2 focus:ring-[#007185]"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      Quantity: {n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buy Actions */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => onAddToCart(qty)}
                  className="w-full py-2 px-4 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[13px] font-medium text-[#0F1111] shadow-[0_1px_2px_rgba(15,17,17,0.1)] transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => onBuyNow(qty)}
                  className="w-full py-2 px-4 rounded-full bg-[#C2410C] hover:bg-[#9A3412] active:bg-[#7C2D12] border border-[#9A3412] text-[13px] font-bold tracking-[0.015em] text-white shadow-[0_1px_2px_rgba(15,17,17,0.14)] transition-colors whitespace-nowrap one-click-blink"
                >
                  Buy now with 1-Click
                </button>
              </div>

              {/* Fulfillment Metadata */}
              <div className="text-[12px] text-[#565959] space-y-1 pt-2 border-t border-[#EAEAEA]">
                <div className="flex justify-between gap-2">
                  <span>Ships from</span>
                  <span className="text-[#0F1111] font-medium text-right">
                    {product.shippingOrigin === 'Singapore'
                      ? 'Amazon.sg'
                      : product.shippingOrigin}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Sold by</span>
                  <span className="text-[#007185] text-right">
                    {product.soldBy}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 pt-1 text-[#007185]">
                  <Lock className="w-3.5 h-3.5 text-[#565959]" />
                  <span>Secure transaction</span>
                </div>
              </div>

              {/* Save to List */}
              <button
                type="button"
                onClick={onToggleSave}
                className={`w-full py-1.5 px-3 rounded-[8px] border text-[13px] flex items-center justify-center gap-1.5 transition-colors ${
                  isSaved
                    ? 'border-[#007185] bg-[#EDFDFF] text-[#007185] font-medium'
                    : 'border-[#D5D9D9] bg-white hover:bg-[#F7FAFA] text-[#0F1111]'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#007185]' : ''}`}
                />
                {isSaved ? 'Saved to Your List' : 'Add to List'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Verified Singapore Customer Reviews Section */}
        <div className="border-t border-[#EAEAEA] px-5 sm:px-6 py-5 bg-[#FAFAFA]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <h3 className="text-[17px] font-bold text-[#0F1111] mb-1.5">
                Customer reviews
              </h3>
              <div className="flex items-center gap-2 mb-1">
                <StarRating rating={product.rating} size="md" />
                <span className="text-[16px] font-bold text-[#0F1111] tabular-nums">
                  {product.rating.toFixed(1)} out of 5
                </span>
              </div>
              <p className="text-[12px] text-[#565959] mb-3 tabular-nums">
                {product.reviewCount.toLocaleString()} global ratings
              </p>
              <div className="space-y-1.5 text-[12px]">
                {[5, 4, 3, 2, 1].map((star, idx) => {
                  const pct = product.ratingBreakdown[idx];
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-[#007185] w-11 shrink-0">
                        {star} star
                      </span>
                      <div className="flex-1 h-4 bg-white rounded-[3px] border border-[#D5D9D9] overflow-hidden">
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
            </div>

            <div className="lg:col-span-8 space-y-4">
              <h4 className="text-[15px] font-bold text-[#0F1111]">
                Top reviews from Singapore
              </h4>
              {product.reviews.map((rev) => {
                const isHelpful = !!helpfulClicked[rev.id];
                return (
                  <div
                    key={rev.id}
                    className="bg-white border border-[#E7E9EC] rounded-[6px] p-4"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-[#232F3E] text-white text-[12px] font-semibold flex items-center justify-center">
                        {rev.author.charAt(0)}
                      </div>
                      <span className="text-[13px] font-medium text-[#0F1111]">
                        {rev.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <StarRating rating={rev.rating} size="xs" />
                      <span className="text-[13px] font-bold text-[#0F1111]">
                        {rev.title}
                      </span>
                    </div>
                    <div className="text-[12px] text-[#565959] mb-2">
                      Reviewed in Singapore on {rev.date}
                      <span className="mx-1.5">·</span>
                      <span>Colour: {rev.colour}</span>
                      {rev.verified && (
                        <>
                          <span className="mx-1.5">·</span>
                          <span className="text-[#C45500] font-semibold">
                            Verified Purchase
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-[13px] leading-relaxed text-[#0F1111] mb-2.5">
                      {rev.body}
                    </p>
                    <div className="flex items-center gap-3 text-[12px] text-[#565959]">
                      <button
                        type="button"
                        onClick={() =>
                          setHelpfulClicked((prev) => ({
                            ...prev,
                            [rev.id]: !prev[rev.id],
                          }))
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] border text-[12px] transition-colors ${
                          isHelpful
                            ? 'border-[#007185] bg-[#EDFDFF] text-[#007185] font-medium'
                            : 'border-[#D5D9D9] bg-white hover:bg-[#F7FAFA] text-[#0F1111]'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        Helpful ({rev.helpfulCount + (isHelpful ? 1 : 0)})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
