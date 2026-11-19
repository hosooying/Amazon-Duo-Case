import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { FilterState, ALL_BRANDS } from '../data/products';
import { PrimeBadge, StarRating } from './AmazonIcons';

interface FilterSidebarProps {
  filters: FilterState;
  onUpdateFilters: (patch: Partial<FilterState>) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
  brandCounts: Record<string, number>;
}

const DEPARTMENTS = [
  'Rugged Hinge Cases',
  'Ultra-Thin & Aramid',
  'Clear & MagSafe',
  'Kickstand Cases',
  'Flip & Wallet Folios',
];

const FEATURE_OPTIONS = [
  'MagSafe Compatible',
  'Hinge Protection',
  'Built-in Kickstand',
  'Ultra-Thin (< 1mm)',
  'Anti-Yellowing Clear',
];

const PRICE_RANGES: Array<{ label: string; min: number | null; max: number | null }> = [
  { label: 'Under S$35', min: null, max: 35 },
  { label: 'S$35 to S$60', min: 35, max: 60 },
  { label: 'S$60 to S$85', min: 60, max: 85 },
  { label: 'S$85 & Above', min: 85, max: null },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onUpdateFilters,
  onClearAll,
  hasActiveFilters,
  brandCounts,
}) => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [minInput, setMinInput] = useState(filters.minPrice?.toString() ?? '');
  const [maxInput, setMaxInput] = useState(filters.maxPrice?.toString() ?? '');

  const visibleBrands = showAllBrands ? ALL_BRANDS : ALL_BRANDS.slice(0, 7);

  const toggleBrand = (brand: string) => {
    const exists = filters.brands.includes(brand);
    const next = exists
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onUpdateFilters({ brands: next });
  };

  const toggleFeature = (feature: string) => {
    const exists = filters.features.includes(feature);
    const next = exists
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature];
    onUpdateFilters({ features: next });
  };

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const minVal = minInput.trim() === '' ? null : Number(minInput);
    const maxVal = maxInput.trim() === '' ? null : Number(maxInput);
    onUpdateFilters({
      minPrice: minVal !== null && !Number.isNaN(minVal) ? minVal : null,
      maxPrice: maxVal !== null && !Number.isNaN(maxVal) ? maxVal : null,
    });
  };

  const applyPresetPrice = (min: number | null, max: number | null) => {
    const isSame = filters.minPrice === min && filters.maxPrice === max;
    if (isSame) {
      setMinInput('');
      setMaxInput('');
      onUpdateFilters({ minPrice: null, maxPrice: null });
    } else {
      setMinInput(min !== null ? String(min) : '');
      setMaxInput(max !== null ? String(max) : '');
      onUpdateFilters({ minPrice: min, maxPrice: max });
    }
  };

  return (
    <aside
      aria-label="Search refinements"
      className="w-full text-[13px] text-[#0F1111] select-none space-y-5"
    >
      {hasActiveFilters && (
        <div className="pb-2 border-b border-[#EAEAEA]">
          <button
            type="button"
            onClick={() => {
              setMinInput('');
              setMaxInput('');
              onClearAll();
            }}
            className="text-[12px] font-medium text-[#007185] hover:text-[#C7511F] hover:underline flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Clear all filters
          </button>
        </div>
      )}

      {/* Delivery Day & Prime */}
      <section>
        <h3 className="font-bold text-[14px] text-[#0F1111] mb-2">
          Delivery &amp; Prime
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.primeOnly}
              onChange={(e) => onUpdateFilters({ primeOnly: e.target.checked })}
              className="w-4 h-4 accent-[#007185] rounded-[2px] border-[#888C8C]"
            />
            <PrimeBadge />
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.tomorrowOnly}
              onChange={(e) => onUpdateFilters({ tomorrowOnly: e.target.checked })}
              className="w-4 h-4 accent-[#007185] rounded-[2px] border-[#888C8C]"
            />
            <span className="group-hover:text-[#C7511F]">Get It by Tomorrow</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.freeDeliveryOnly}
              onChange={(e) => onUpdateFilters({ freeDeliveryOnly: e.target.checked })}
              className="w-4 h-4 accent-[#007185] rounded-[2px] border-[#888C8C]"
            />
            <span className="group-hover:text-[#C7511F]">FREE Delivery by Amazon</span>
          </label>
        </div>
      </section>

      {/* Shipping Origin — Authentic Amazon.sg section */}
      <section>
        <h3 className="font-bold text-[14px] text-[#0F1111] mb-2">
          International Store
        </h3>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'All Fulfillment Origins' },
            { id: 'Singapore', label: 'Ships from Singapore' },
            { id: 'International', label: 'Amazon US / Japan Store' },
          ].map((opt) => (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="shippingOrigin"
                checked={filters.shippingOrigin === opt.id}
                onChange={() =>
                  onUpdateFilters({
                    shippingOrigin: opt.id as FilterState['shippingOrigin'],
                  })
                }
                className="w-3.5 h-3.5 accent-[#007185]"
              />
              <span
                className={
                  filters.shippingOrigin === opt.id
                    ? 'font-semibold text-[#0F1111]'
                    : 'text-[#0F1111] group-hover:text-[#C7511F]'
                }
              >
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Department Hierarchy */}
      <section>
        <h3 className="font-bold text-[14px] text-[#0F1111] mb-1.5">Department</h3>
        <div className="space-y-1">
          {filters.department && (
            <button
              type="button"
              onClick={() => onUpdateFilters({ department: null })}
              className="flex items-center gap-1 text-[#0F1111] hover:text-[#C7511F] mb-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Any Department</span>
            </button>
          )}
          <div className="text-[#565959] text-[12px] pl-1">
            Electronics
          </div>
          <div className="font-semibold text-[#0F1111] pl-2.5 text-[13px]">
            Cases, Holsters &amp; Sleeves
          </div>
          <ul className="pl-5 space-y-1 pt-0.5">
            {DEPARTMENTS.map((dept) => {
              const active = filters.department === dept;
              return (
                <li key={dept}>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateFilters({ department: active ? null : dept })
                    }
                    className={`text-left transition-colors ${
                      active
                        ? 'font-bold text-[#C7511F]'
                        : 'text-[#0F1111] hover:text-[#C7511F]'
                    }`}
                  >
                    {dept}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Customer Reviews */}
      <section>
        <h3 className="font-bold text-[14px] text-[#0F1111] mb-1.5">
          Customer Reviews
        </h3>
        <div className="space-y-1">
          {filters.minRating !== null && (
            <button
              type="button"
              onClick={() => onUpdateFilters({ minRating: null })}
              className="flex items-center gap-1 text-[12px] text-[#0F1111] hover:text-[#C7511F] mb-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
          {[4, 3, 2, 1].map((stars) => {
            const active = filters.minRating === stars;
            return (
              <button
                key={stars}
                type="button"
                onClick={() =>
                  onUpdateFilters({ minRating: active ? null : stars })
                }
                className={`flex items-center gap-1.5 w-full py-0.5 text-left transition-colors ${
                  active ? 'font-bold text-[#C7511F]' : 'hover:text-[#C7511F]'
                }`}
              >
                <StarRating rating={stars} size="sm" />
                <span className="text-[12px]">&amp; Up</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Brands */}
      <section>
        <h3 className="font-bold text-[14px] text-[#0F1111] mb-2">Brands</h3>
        <div className="space-y-1.5">
          {visibleBrands.map((brand) => {
            const checked = filters.brands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center justify-between gap-2 cursor-pointer group"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 accent-[#007185] rounded-[2px] border-[#888C8C] shrink-0"
                  />
                  <span
                    className={`truncate ${
                      checked
                        ? 'font-semibold text-[#0F1111]'
                        : 'group-hover:text-[#C7511F]'
                    }`}
                  >
                    {brand}
                  </span>
                </span>
                <span className="text-[11px] text-[#565959] tabular-nums">
                  ({brandCounts[brand] ?? 0})
                </span>
              </label>
            );
          })}
        </div>
        {ALL_BRANDS.length > 7 && (
          <button
            type="button"
            onClick={() => setShowAllBrands((v) => !v)}
            className="mt-1.5 inline-flex items-center gap-1 text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline"
          >
            {showAllBrands ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                See less
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                See more
              </>
            )}
          </button>
        )}
      </section>

      {/* Price (SGD) */}
      <section>
        <h3 className="font-bold text-[14px] text-[#0F1111] mb-1.5">Price</h3>
        <ul className="space-y-1 mb-2.5">
          {PRICE_RANGES.map((range) => {
            const active =
              filters.minPrice === range.min && filters.maxPrice === range.max;
            return (
              <li key={range.label}>
                <button
                  type="button"
                  onClick={() => applyPresetPrice(range.min, range.max)}
                  className={`text-left tabular-nums transition-colors ${
                    active
                      ? 'font-bold text-[#C7511F]'
                      : 'text-[#0F1111] hover:text-[#C7511F]'
                  }`}
                >
                  {range.label}
                </button>
              </li>
            );
          })}
        </ul>

        <form onSubmit={handlePriceSubmit} className="flex items-center gap-1.5">
          <div className="relative flex-1 min-w-0">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-[#565959]">
              S$
            </span>
            <input
              type="number"
              min="0"
              step="1"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              placeholder="Min"
              aria-label="Minimum price in SGD"
              className="w-full h-[30px] pl-6 pr-1.5 text-[12px] tabular-nums border border-[#888C8C] rounded-[4px] focus:outline-none focus:border-[#007185] focus:ring-2 focus:ring-[#007185]/20"
            />
          </div>
          <div className="relative flex-1 min-w-0">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-[#565959]">
              S$
            </span>
            <input
              type="number"
              min="0"
              step="1"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              placeholder="Max"
              aria-label="Maximum price in SGD"
              className="w-full h-[30px] pl-6 pr-1.5 text-[12px] tabular-nums border border-[#888C8C] rounded-[4px] focus:outline-none focus:border-[#007185] focus:ring-2 focus:ring-[#007185]/20"
            />
          </div>
          <button
            type="submit"
            className="h-[30px] px-2.5 text-[12px] font-medium bg-white hover:bg-[#F7FAFA] border border-[#D5D9D9] rounded-[8px] shadow-[0_1px_2px_rgba(15,17,17,0.08)] shrink-0"
          >
            Go
          </button>
        </form>
      </section>

      {/* Case Features */}
      <section>
        <h3 className="font-bold text-[14px] text-[#0F1111] mb-2">
          Case Features
        </h3>
        <div className="space-y-1.5">
          {FEATURE_OPTIONS.map((feat) => {
            const checked = filters.features.includes(feat);
            return (
              <label key={feat} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleFeature(feat)}
                  className="w-4 h-4 accent-[#007185] rounded-[2px] border-[#888C8C]"
                />
                <span
                  className={
                    checked
                      ? 'font-semibold text-[#0F1111]'
                      : 'group-hover:text-[#C7511F]'
                  }
                >
                  {feat}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Deals & Discounts */}
      <section>
        <h3 className="font-bold text-[14px] text-[#0F1111] mb-2">
          Deals &amp; Discounts
        </h3>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.dealsOnly}
              onChange={(e) => onUpdateFilters({ dealsOnly: e.target.checked })}
              className="w-4 h-4 accent-[#007185] rounded-[2px] border-[#888C8C]"
            />
            <span className="group-hover:text-[#C7511F]">Today&apos;s Deals</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.voucherOnly}
              onChange={(e) => onUpdateFilters({ voucherOnly: e.target.checked })}
              className="w-4 h-4 accent-[#007185] rounded-[2px] border-[#888C8C]"
            />
            <span className="group-hover:text-[#C7511F]">Voucher Eligible</span>
          </label>
        </div>
      </section>
    </aside>
  );
};
