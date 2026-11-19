import React, { useState, useMemo, useCallback } from 'react';
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle2,
} from 'lucide-react';
import {
  PRODUCTS,
  INITIAL_FILTERS,
  RELATED_SEARCHES,
  FilterState,
  SortOption,
  CartItem,
  Product,
} from './data/products';
import { Header } from './components/Header';
import { FilterSidebar } from './components/FilterSidebar';
import { SponsoredBrandBanner } from './components/SponsoredBrandBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { LocationModal } from './components/LocationModal';
import { AllMenuDrawer } from './components/AllMenuDrawer';
import { OneClickModal, OneClickOrder } from './components/OneClickModal';
import { Footer } from './components/Footer';

const PAGE_SIZE = 12;

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeNavTag, setActiveNavTag] = useState<string | null>(null);

  // Per-product selected colour & voucher states
  const [selectedColours, setSelectedColours] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(PRODUCTS.map((p) => [p.id, p.colours[0]?.name ?? 'Default']))
  );
  const [appliedVouchers, setAppliedVouchers] = useState<Record<string, boolean>>({});

  // Cart & Saved Lists
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedProductIds, setSavedProductIds] = useState<string[]>([]);

  // Overlays & Modals
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAllMenuOpen, setIsAllMenuOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [oneClickOrder, setOneClickOrder] = useState<OneClickOrder | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState({
    label: 'Singapore',
    postalCode: '',
  });

  // Subtle toast notification for cart / nav feedback
  const [toast, setToast] = useState<{
    message: string;
    showCartAction?: boolean;
  } | null>(null);

  const showToast = useCallback((message: string, showCartAction = false) => {
    setToast({ message, showCartAction });
    window.clearTimeout((window as unknown as { __amzToastTimer?: number }).__amzToastTimer);
    (window as unknown as { __amzToastTimer?: number }).__amzToastTimer = window.setTimeout(
      () => setToast(null),
      3200
    );
  }, []);

  const updateFilters = useCallback((patch: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setCurrentPage(1);
    setActiveNavTag(null);
  }, []);

  const resetAllFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSortBy('featured');
    setCurrentPage(1);
    setActiveNavTag(null);
  }, []);

  // Brand counts across catalog for sidebar display
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of PRODUCTS) {
      counts[p.brand] = (counts[p.brand] ?? 0) + 1;
    }
    return counts;
  }, []);

  // Filter + Sort pipeline
  const filteredProducts = useMemo(() => {
    const rawQuery = filters.searchQuery.trim().toLowerCase();
    // Treat default "iphone duo case" as showing full catalog; more specific terms narrow results
    const stopWords = new Set(['iphone', 'duo', 'case', 'cases', 'for']);
    const specificTerms = rawQuery
      .split(/\s+/)
      .filter((word) => word.length > 1 && !stopWords.has(word));

    const list = PRODUCTS.filter((p) => {
      if (specificTerms.length > 0) {
        const haystack = [
          p.title,
          p.brand,
          p.department,
          ...p.features,
          ...p.colours.map((c) => c.name),
          ...p.aboutBullets,
        ]
          .join(' ')
          .toLowerCase();
        if (!specificTerms.every((term) => haystack.includes(term))) {
          return false;
        }
      }

      if (filters.primeOnly && !p.isPrime) return false;
      if (filters.tomorrowOnly && !p.isTomorrowDelivery) return false;
      if (filters.freeDeliveryOnly && !p.isFreeDelivery) return false;

      if (filters.shippingOrigin === 'Singapore' && p.shippingOrigin !== 'Singapore') {
        return false;
      }
      if (
        filters.shippingOrigin === 'International' &&
        p.shippingOrigin === 'Singapore'
      ) {
        return false;
      }

      if (filters.department && p.department !== filters.department) {
        return false;
      }

      if (filters.minRating !== null && p.rating < filters.minRating) {
        return false;
      }

      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
        return false;
      }

      if (filters.minPrice !== null && p.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== null && p.price > filters.maxPrice) {
        return false;
      }

      if (
        filters.features.length > 0 &&
        !filters.features.every((f) =>
          p.features.includes(f as Product['features'][number])
        )
      ) {
        return false;
      }

      if (filters.dealsOnly && !p.listPrice && p.badge !== 'Limited time deal') {
        return false;
      }

      if (filters.voucherOnly && !p.voucher) {
        return false;
      }

      return true;
    });

    const sorted = [...list];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        sorted.sort((a, b) => b.releaseTimestamp - a.releaseTimestamp);
        break;
      case 'bestsellers':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return sorted;
  }, [filters, sortBy]);

  const hasActiveRefinements =
    filters.primeOnly ||
    filters.tomorrowOnly ||
    filters.freeDeliveryOnly ||
    filters.shippingOrigin !== 'all' ||
    filters.department !== null ||
    filters.minRating !== null ||
    filters.brands.length > 0 ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.features.length > 0 ||
    filters.dealsOnly ||
    filters.voucherOnly ||
    filters.searchQuery.trim().toLowerCase() !== 'iphone duo case';

  const activeFilterCount =
    (filters.primeOnly ? 1 : 0) +
    (filters.tomorrowOnly ? 1 : 0) +
    (filters.freeDeliveryOnly ? 1 : 0) +
    (filters.shippingOrigin !== 'all' ? 1 : 0) +
    (filters.department ? 1 : 0) +
    (filters.minRating !== null ? 1 : 0) +
    filters.brands.length +
    (filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0) +
    filters.features.length +
    (filters.dealsOnly ? 1 : 0) +
    (filters.voucherOnly ? 1 : 0);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const rangeStart = filteredProducts.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filteredProducts.length);

  // Cart handlers
  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const getProductCartQty = (productId: string, colour: string) =>
    cartItems.find((ci) => ci.productId === productId && ci.colour === colour)
      ?.quantity ?? 0;

  const handleAddToCart = (product: Product, qty = 1) => {
    const colour = selectedColours[product.id] ?? product.colours[0]?.name ?? 'Default';
    const voucherApplied = !!appliedVouchers[product.id];
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (ci) => ci.productId === product.id && ci.colour === colour
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + qty,
          voucherApplied: next[idx].voucherApplied || voucherApplied,
        };
        return next;
      }
      return [...prev, { productId: product.id, colour, quantity: qty, voucherApplied }];
    });
    showToast(`Added ${product.brand} (${colour}) to Cart`, true);
  };

  const handleUpdateCartQty = (productId: string, colour: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) =>
          ci.productId === productId && ci.colour === colour
            ? { ...ci, quantity: ci.quantity + delta }
            : ci
        )
        .filter((ci) => ci.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string, colour: string) => {
    setCartItems((prev) =>
      prev.filter((ci) => !(ci.productId === productId && ci.colour === colour))
    );
  };

  const handleSaveForLater = (productId: string, colour: string) => {
    handleRemoveCartItem(productId, colour);
    setSavedProductIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
    showToast('Item saved for later in your cart');
  };

  const handleToggleSave = (productId: string) => {
    setSavedProductIds((prev) => {
      const exists = prev.includes(productId);
      showToast(exists ? 'Removed from Your List' : 'Saved to Your List');
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const handleMoveSavedToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    setSavedProductIds((prev) => prev.filter((id) => id !== productId));
    handleAddToCart(product, 1);
  };

  // Sub-nav & drawer quick actions
  const handleQuickNavFilter = (action: string) => {
    setCurrentPage(1);
    switch (action) {
      case 'best-sellers':
        setFilters(INITIAL_FILTERS);
        setSortBy('bestsellers');
        setActiveNavTag('best-sellers');
        break;
      case 'deals':
        setFilters({ ...INITIAL_FILTERS, dealsOnly: true });
        setSortBy('featured');
        setActiveNavTag('deals');
        break;
      case 'prime':
        setFilters({ ...INITIAL_FILTERS, primeOnly: true });
        setSortBy('featured');
        setActiveNavTag('prime');
        break;
      case 'new-releases':
        setFilters(INITIAL_FILTERS);
        setSortBy('newest');
        setActiveNavTag('new-releases');
        break;
      case 'magsafe':
        setFilters({ ...INITIAL_FILTERS, features: ['MagSafe Compatible'] });
        setActiveNavTag('magsafe');
        break;
      case 'hinge':
        setFilters({ ...INITIAL_FILTERS, features: ['Hinge Protection'] });
        setActiveNavTag('hinge');
        break;
      case 'aramid':
        setFilters({ ...INITIAL_FILTERS, department: 'Ultra-Thin & Aramid' });
        setActiveNavTag('aramid');
        break;
      case 'kickstand':
        setFilters({ ...INITIAL_FILTERS, department: 'Kickstand Cases' });
        setActiveNavTag('kickstand');
        break;
      case 'folio':
        setFilters({ ...INITIAL_FILTERS, department: 'Flip & Wallet Folios' });
        setActiveNavTag('folio');
        break;
      case 'international':
        setFilters({ ...INITIAL_FILTERS, shippingOrigin: 'International' });
        setActiveNavTag('international');
        break;
      case 'electronics':
        setFilters({ ...INITIAL_FILTERS, searchDepartment: 'Electronics' });
        setActiveNavTag('electronics');
        break;
      case 'fresh':
        setFilters({ ...INITIAL_FILTERS, tomorrowOnly: true });
        setActiveNavTag('fresh');
        showToast('Showing fast local Singapore Tomorrow Delivery picks');
        break;
      case 'cart':
        setIsCartOpen(true);
        break;
      case 'location':
        setIsLocationOpen(true);
        break;
      case 'customer-service':
        showToast('Amazon.sg 24/7 Singapore Help: 15-day hassle-free local returns');
        break;
      case 'reset':
      default:
        resetAllFilters();
        break;
    }
  };

  const activeProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === activeProductId) ?? null,
    [activeProductId]
  );

  // Build removable active filter pills for quick clearing
  const activeFilterTags: Array<{ label: string; onRemove: () => void }> = [];
  if (filters.primeOnly) {
    activeFilterTags.push({
      label: 'Prime',
      onRemove: () => updateFilters({ primeOnly: false }),
    });
  }
  if (filters.tomorrowOnly) {
    activeFilterTags.push({
      label: 'Get It by Tomorrow',
      onRemove: () => updateFilters({ tomorrowOnly: false }),
    });
  }
  if (filters.freeDeliveryOnly) {
    activeFilterTags.push({
      label: 'FREE Delivery',
      onRemove: () => updateFilters({ freeDeliveryOnly: false }),
    });
  }
  if (filters.shippingOrigin !== 'all') {
    activeFilterTags.push({
      label:
        filters.shippingOrigin === 'Singapore'
          ? 'Ships from Singapore'
          : 'Amazon International Store',
      onRemove: () => updateFilters({ shippingOrigin: 'all' }),
    });
  }
  if (filters.department) {
    activeFilterTags.push({
      label: filters.department,
      onRemove: () => updateFilters({ department: null }),
    });
  }
  if (filters.minRating !== null) {
    activeFilterTags.push({
      label: `${filters.minRating}★ & Up`,
      onRemove: () => updateFilters({ minRating: null }),
    });
  }
  filters.brands.forEach((b) => {
    activeFilterTags.push({
      label: b,
      onRemove: () =>
        updateFilters({ brands: filters.brands.filter((x) => x !== b) }),
    });
  });
  if (filters.minPrice !== null || filters.maxPrice !== null) {
    const label =
      filters.minPrice !== null && filters.maxPrice !== null
        ? `S$${filters.minPrice}–S$${filters.maxPrice}`
        : filters.minPrice !== null
          ? `S$${filters.minPrice}+`
          : `Under S$${filters.maxPrice}`;
    activeFilterTags.push({
      label,
      onRemove: () => updateFilters({ minPrice: null, maxPrice: null }),
    });
  }
  filters.features.forEach((f) => {
    activeFilterTags.push({
      label: f,
      onRemove: () =>
        updateFilters({ features: filters.features.filter((x) => x !== f) }),
    });
  });
  if (filters.dealsOnly) {
    activeFilterTags.push({
      label: "Today's Deals",
      onRemove: () => updateFilters({ dealsOnly: false }),
    });
  }
  if (filters.voucherOnly) {
    activeFilterTags.push({
      label: 'Voucher Eligible',
      onRemove: () => updateFilters({ voucherOnly: false }),
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F1111]">
      {/* Authentic Amazon.sg Header & Sub-Nav */}
      <Header
        searchQuery={filters.searchQuery}
        searchDepartment={filters.searchDepartment}
        onSearchSubmit={(query, dept) => {
          updateFilters({ searchQuery: query, searchDepartment: dept });
        }}
        onResetHome={resetAllFilters}
        cartCount={totalCartCount}
        savedCount={savedProductIds.length}
        deliveryLocation={deliveryLocation}
        onOpenLocationModal={() => setIsLocationOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAllMenu={() => setIsAllMenuOpen(true)}
        onQuickNavFilter={handleQuickNavFilter}
        activeNavTag={activeNavTag}
      />

      {/* Search Results Summary & Sort Sub-bar */}
      <div className="bg-white border-b border-[#DDDDDD] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1500px] mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2.5 text-[13px]">
          <div className="flex items-center gap-2 min-w-0">
            {/* Mobile Filters Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#F0F2F2] hover:bg-[#E3E6E6] border border-[#D5D9D9] text-[12px] font-medium text-[#0F1111] shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="font-bold text-[#007185] tabular-nums">
                  ({activeFilterCount})
                </span>
              )}
            </button>

            <p className="text-[#0F1111] truncate tabular-nums">
              {filteredProducts.length === 0 ? (
                <>
                  No results for{' '}
                  <strong className="font-bold text-[#C45500]">
                    &ldquo;{filters.searchQuery}&rdquo;
                  </strong>
                </>
              ) : !hasActiveRefinements && safePage === 1 ? (
                <>
                  1–{rangeEnd} of over 1,000 results for{' '}
                  <strong className="font-bold text-[#C45500]">
                    &ldquo;{filters.searchQuery}&rdquo;
                  </strong>
                </>
              ) : (
                <>
                  {rangeStart}–{rangeEnd} of {filteredProducts.length} results for{' '}
                  <strong className="font-bold text-[#C45500]">
                    &ldquo;{filters.searchQuery}&rdquo;
                  </strong>
                </>
              )}
            </p>
          </div>

          {/* Right Controls: Grid/List Toggle & Sort By */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className="hidden sm:inline-flex items-center bg-[#F0F2F2] border border-[#D5D9D9] rounded-[6px] p-0.5"
              role="group"
              aria-label="Results view layout"
            >
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
                className={`p-1.5 rounded-[4px] transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.08)]'
                    : 'text-[#565959] hover:text-[#0F1111]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
                className={`p-1.5 rounded-[4px] transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.08)]'
                    : 'text-[#565959] hover:text-[#0F1111]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="inline-flex items-center bg-[#F0F2F2] hover:bg-[#E3E6E6] border border-[#D5D9D9] rounded-[8px] px-2.5 h-[29px] shadow-[0_1px_2px_rgba(15,17,17,0.08)] transition-colors">
              <label
                htmlFor="amazon-sort"
                className="text-[12px] text-[#0F1111] mr-1 whitespace-nowrap"
              >
                Sort by:
              </label>
              <select
                id="amazon-sort"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortOption);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-[12px] font-medium text-[#0F1111] focus:outline-none pr-1"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Avg. Customer Review</option>
                <option value="newest">Newest Arrivals</option>
                <option value="bestsellers">Best Sellers</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Search Layout */}
      <main className="flex-1 w-full max-w-[1500px] mx-auto px-3 sm:px-4 pt-4">
        <div className="flex items-start gap-5">
          {/* Desktop Left Refinement Sidebar */}
          <div className="hidden lg:block w-[240px] xl:w-[252px] shrink-0 pr-4 border-r border-[#EAEAEA]">
            <FilterSidebar
              filters={filters}
              onUpdateFilters={updateFilters}
              onClearAll={resetAllFilters}
              hasActiveFilters={hasActiveRefinements}
              brandCounts={brandCounts}
            />
          </div>

          {/* Right Main Product Column */}
          <div className="flex-1 min-w-0">
            {/* Active Interactive Filter Removal Strip */}
            {activeFilterTags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-3.5 pb-2.5 border-b border-[#EAEAEA]">
                <span className="text-[12px] text-[#565959] font-medium">
                  Active filters:
                </span>
                {activeFilterTags.map((tag) => (
                  <button
                    key={tag.label}
                    type="button"
                    onClick={tag.onRemove}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#F0F2F2] hover:bg-[#E3E6E6] border border-[#D5D9D9] text-[12px] text-[#0F1111] transition-colors"
                  >
                    <span>{tag.label}</span>
                    <X className="w-3 h-3 text-[#565959]" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Sponsored Brands Top Showcase (Page 1 when relevant) */}
            {safePage === 1 &&
              (!filters.brands.length || filters.brands.includes('Spigen')) && (
                <SponsoredBrandBanner
                  products={PRODUCTS}
                  onSelectProduct={(p) => setActiveProductId(p.id)}
                  onFilterBySpigen={() =>
                    updateFilters({ brands: ['Spigen'] })
                  }
                />
              )}

            {/* Results Section Heading */}
            <div className="mb-3">
              <h1 className="text-[20px] font-bold text-[#0F1111] leading-tight">
                Results
              </h1>
              <p className="text-[13px] text-[#565959] mt-0.5">
                Check each product page for other buying options. Price and other details may vary based on product size and colour.
              </p>
            </div>

            {/* Product Grid / List or Empty State */}
            {paginatedProducts.length === 0 ? (
              <div className="border border-[#E3E6E6] rounded-[6px] bg-[#FAFAFA] py-14 px-6 text-center my-4">
                <Search className="w-9 h-9 text-[#888C8C] mx-auto mb-3" />
                <h2 className="text-[18px] font-bold text-[#0F1111] mb-1">
                  No matching iPhone Duo cases found
                </h2>
                <p className="text-[13px] text-[#565959] max-w-md mx-auto mb-4">
                  Try loosening your brand, price, or feature refinements, or search a broader term.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-5 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[13px] font-medium text-[#0F1111]"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5'
                    : 'flex flex-col gap-3'
                }
              >
                {paginatedProducts.map((product) => {
                  const selectedColour =
                    selectedColours[product.id] ?? product.colours[0]?.name ?? 'Default';
                  const cartQty = getProductCartQty(product.id, selectedColour);
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                      cartQuantity={cartQty}
                      selectedColour={selectedColour}
                      voucherApplied={!!appliedVouchers[product.id]}
                      onSelectColour={(colour) =>
                        setSelectedColours((prev) => ({
                          ...prev,
                          [product.id]: colour,
                        }))
                      }
                      onToggleVoucher={() => {
                        setAppliedVouchers((prev) => {
                          const next = !prev[product.id];
                          showToast(
                            next
                              ? `Voucher applied for ${product.brand}`
                              : `Voucher removed for ${product.brand}`
                          );
                          return { ...prev, [product.id]: next };
                        });
                      }}
                      onAddToCart={() => handleAddToCart(product, 1)}
                      onOneClickBuy={() => {
                        const voucherApplied = !!appliedVouchers[product.id];
                        const unitDiscount =
                          voucherApplied && product.voucher
                            ? product.voucher.type === 'percent'
                              ? product.price * (product.voucher.value / 100)
                              : product.voucher.value
                            : 0;
                        const finalUnit = Math.max(0, product.price - unitDiscount);
                        const rand = Math.floor(1000000 + Math.random() * 9000000);
                        setOneClickOrder({
                          orderNumber: `408-${rand}-1902641`,
                          product,
                          colour: selectedColour,
                          quantity: 1,
                          unitPrice: finalUnit,
                          voucherSavings: unitDiscount,
                          total: finalUnit,
                        });
                      }}
                      onUpdateCartQty={(delta) =>
                        handleUpdateCartQty(product.id, selectedColour, delta)
                      }
                      onOpenDetail={() => setActiveProductId(product.id)}
                    />
                  );
                })}
              </div>
            )}

            {/* Authentic Amazon Pagination Strip */}
            {filteredProducts.length > 0 && (
              <nav
                aria-label="Pagination"
                className="mt-7 mb-6 flex items-center justify-center"
              >
                <div className="inline-flex items-stretch border border-[#D5D9D9] rounded-[8px] overflow-hidden shadow-[0_1px_2px_rgba(15,17,17,0.06)] bg-white text-[14px]">
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3.5 py-2.5 inline-flex items-center gap-1 border-r border-[#EAEAEA] transition-colors ${
                      safePage <= 1
                        ? 'text-[#A6ADAD] cursor-not-allowed'
                        : 'text-[#0F1111] hover:bg-[#F5F6F6]'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                    (pageNum) => {
                      const active = pageNum === safePage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          aria-current={active ? 'page' : undefined}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`min-w-[44px] py-2.5 px-3 tabular-nums transition-colors ${
                            active
                              ? 'border border-[#0F1111] font-bold text-[#0F1111] bg-white z-10'
                              : 'text-[#0F1111] hover:bg-[#F5F6F6]'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}

                  <button
                    type="button"
                    disabled={safePage >= totalPages}
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3.5 py-2.5 inline-flex items-center gap-1 border-l border-[#EAEAEA] transition-colors ${
                      safePage >= totalPages
                        ? 'text-[#A6ADAD] cursor-not-allowed'
                        : 'text-[#0F1111] hover:bg-[#F5F6F6]'
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </nav>
            )}

            {/* Related Searches Section */}
            <section className="border-t border-[#EAEAEA] pt-5 pb-4">
              <h2 className="text-[18px] font-bold text-[#0F1111] mb-3">
                Related searches
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {RELATED_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      updateFilters({ searchQuery: term });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[4px] border border-[#D5D9D9] bg-white hover:bg-[#F7F8F8] text-left text-[13px] font-medium text-[#007185] hover:text-[#C7511F] transition-colors"
                  >
                    <Search className="w-3.5 h-3.5 text-[#565959] shrink-0" />
                    <span className="truncate">{term}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Need Help Strip */}
            <div className="border-t border-[#EAEAEA] pt-4 pb-2 text-[13px]">
              <h3 className="text-[16px] font-bold text-[#0F1111] mb-1">
                Need help?
              </h3>
              <p className="text-[#0F1111]">
                <button
                  type="button"
                  onClick={() => handleQuickNavFilter('customer-service')}
                  className="text-[#007185] hover:text-[#C7511F] hover:underline"
                >
                  Visit the help section
                </button>{' '}
                or{' '}
                <button
                  type="button"
                  onClick={() => setIsLocationOpen(true)}
                  className="text-[#007185] hover:text-[#C7511F] hover:underline"
                >
                  check Singapore delivery postal codes
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Authentic Amazon.sg Footer */}
      <Footer onQuickAction={handleQuickNavFilter} />

      {/* Mobile Refinement Drawer */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-label="Filter results"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="w-[300px] max-w-[85vw] bg-white h-full flex flex-col shadow-[8px_0_24px_rgba(0,0,0,0.22)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#131921] text-white px-4 py-3 flex items-center justify-between">
              <h2 className="text-[15px] font-bold">Filter Results</h2>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                aria-label="Close filters"
                className="p-1 rounded hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto amazon-scroll p-4">
              <FilterSidebar
                filters={filters}
                onUpdateFilters={updateFilters}
                onClearAll={resetAllFilters}
                hasActiveFilters={hasActiveRefinements}
                brandCounts={brandCounts}
              />
            </div>
            <div className="p-3 border-t border-[#EAEAEA] bg-[#F7F8F8]">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[13px] font-semibold text-[#0F1111]"
              >
                Show {filteredProducts.length} results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Quick-View Modal */}
      <ProductDetailModal
        product={activeProduct}
        selectedColour={
          activeProduct
            ? selectedColours[activeProduct.id] ??
              activeProduct.colours[0]?.name ??
              'Default'
            : ''
        }
        voucherApplied={activeProduct ? !!appliedVouchers[activeProduct.id] : false}
        isSaved={activeProduct ? savedProductIds.includes(activeProduct.id) : false}
        deliveryLocation={deliveryLocation}
        onClose={() => setActiveProductId(null)}
        onSelectColour={(colour) => {
          if (!activeProduct) return;
          setSelectedColours((prev) => ({
            ...prev,
            [activeProduct.id]: colour,
          }));
        }}
        onToggleVoucher={() => {
          if (!activeProduct) return;
          setAppliedVouchers((prev) => ({
            ...prev,
            [activeProduct.id]: !prev[activeProduct.id],
          }));
        }}
        onToggleSave={() => {
          if (!activeProduct) return;
          handleToggleSave(activeProduct.id);
        }}
        onAddToCart={(qty) => {
          if (!activeProduct) return;
          handleAddToCart(activeProduct, qty);
        }}
        onBuyNow={(qty) => {
          if (!activeProduct) return;
          const colour =
            selectedColours[activeProduct.id] ??
            activeProduct.colours[0]?.name ??
            'Default';
          const voucherApplied = !!appliedVouchers[activeProduct.id];
          const unitDiscount =
            voucherApplied && activeProduct.voucher
              ? activeProduct.voucher.type === 'percent'
                ? activeProduct.price * (activeProduct.voucher.value / 100)
                : activeProduct.voucher.value
              : 0;
          const finalUnit = Math.max(0, activeProduct.price - unitDiscount);
          const rand = Math.floor(1000000 + Math.random() * 9000000);
          setActiveProductId(null);
          setOneClickOrder({
            orderNumber: `408-${rand}-1902641`,
            product: activeProduct,
            colour,
            quantity: qty,
            unitPrice: finalUnit,
            voucherSavings: unitDiscount * qty,
            total: finalUnit * qty,
          });
        }}
        onFilterBrand={(brand) => updateFilters({ brands: [brand] })}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        savedProductIds={savedProductIds}
        products={PRODUCTS}
        deliveryLocation={deliveryLocation}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onSaveForLater={handleSaveForLater}
        onMoveSavedToCart={handleMoveSavedToCart}
        onRemoveSaved={(id) =>
          setSavedProductIds((prev) => prev.filter((x) => x !== id))
        }
        onClearCartAfterCheckout={() => setCartItems([])}
      />

      {/* Singapore Location / Postal Code Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        currentLocation={deliveryLocation}
        onClose={() => setIsLocationOpen(false)}
        onSelectLocation={(loc) => {
          setDeliveryLocation(loc);
          showToast(
            `Delivery location updated to ${loc.label}${loc.postalCode ? ` ${loc.postalCode}` : ''}`
          );
        }}
      />

      {/* Left Slide-out All Categories Drawer */}
      <AllMenuDrawer
        isOpen={isAllMenuOpen}
        onClose={() => setIsAllMenuOpen(false)}
        onSelectFilter={handleQuickNavFilter}
      />

      {/* 1-Click Instant Order Confirmation Modal */}
      <OneClickModal
        order={oneClickOrder}
        deliveryLocation={deliveryLocation}
        onClose={() => setOneClickOrder(null)}
        onCancelOrder={() => {
          const canceledBrand = oneClickOrder?.product.brand ?? 'item';
          setOneClickOrder(null);
          showToast(`1-Click order for ${canceledBrand} cancelled`);
        }}
      />

      {/* Non-intrusive Cart / Action Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#131921] text-white px-4 py-3 rounded-[6px] shadow-[0_8px_24px_rgba(0,0,0,0.28)] border border-white/10 flex items-center gap-3 text-[13px] max-w-[380px]">
          <CheckCircle2 className="w-4 h-4 text-[#7FDA69] shrink-0" />
          <span className="flex-1 leading-snug">{toast.message}</span>
          {toast.showCartAction && (
            <button
              type="button"
              onClick={() => {
                setToast(null);
                setIsCartOpen(true);
              }}
              className="text-[#FF9900] hover:underline font-semibold whitespace-nowrap shrink-0"
            >
              View Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
}
