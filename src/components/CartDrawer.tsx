import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { CartItem, Product } from '../data/products';
import { PrimeBadge } from './AmazonIcons';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  savedProductIds: string[];
  products: Product[];
  deliveryLocation: { label: string; postalCode: string };
  onUpdateQty: (productId: string, colour: string, delta: number) => void;
  onRemoveItem: (productId: string, colour: string) => void;
  onSaveForLater: (productId: string, colour: string) => void;
  onMoveSavedToCart: (productId: string) => void;
  onRemoveSaved: (productId: string) => void;
  onClearCartAfterCheckout: () => void;
}

const FREE_DELIVERY_THRESHOLD = 40;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  savedProductIds,
  products,
  deliveryLocation,
  onUpdateQty,
  onRemoveItem,
  onSaveForLater,
  onMoveSavedToCart,
  onRemoveSaved,
  onClearCartAfterCheckout,
}) => {
  const [orderConfirmation, setOrderConfirmation] = useState<{
    orderNumber: string;
    total: number;
    itemCount: number;
  } | null>(null);

  if (!isOpen) return null;

  const resolvedItems = cartItems
    .map((ci) => {
      const product = products.find((p) => p.id === ci.productId);
      if (!product) return null;
      const unitDiscount =
        ci.voucherApplied && product.voucher
          ? product.voucher.type === 'percent'
            ? product.price * (product.voucher.value / 100)
            : product.voucher.value
          : 0;
      const finalUnitPrice = Math.max(0, product.price - unitDiscount);
      return { ...ci, product, unitDiscount, finalUnitPrice };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const savedProducts = savedProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const totalItems = resolvedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = resolvedItems.reduce(
    (sum, item) => sum + item.finalUnitPrice * item.quantity,
    0
  );
  const totalSavings = resolvedItems.reduce(
    (sum, item) => sum + item.unitDiscount * item.quantity,
    0
  );
  const hasPrimeItem = resolvedItems.some((item) => item.product.isPrime);
  const qualifiesFreeDelivery =
    subtotal >= FREE_DELIVERY_THRESHOLD || hasPrimeItem;
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPct = Math.min(
    100,
    (subtotal / FREE_DELIVERY_THRESHOLD) * 100
  );

  const handleCheckout = () => {
    const rand = Math.floor(1000000 + Math.random() * 9000000);
    setOrderConfirmation({
      orderNumber: `408-${rand}-8834125`,
      total: subtotal,
      itemCount: totalItems,
    });
    onClearCartAfterCheckout();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] bg-white h-full flex flex-col shadow-[-8px_0_28px_rgba(0,0,0,0.22)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-[#131921] text-white px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FF9900]" />
            <h2 className="text-[16px] font-bold">
              Shopping Cart ({totalItems})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setOrderConfirmation(null);
              onClose();
            }}
            aria-label="Close shopping cart"
            className="p-1.5 rounded-[4px] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto amazon-scroll p-5 space-y-5">
          {/* Post-Checkout Order Confirmed View */}
          {orderConfirmation ? (
            <div className="border border-[#067D62]/30 bg-[#F2FBF8] rounded-[8px] p-5 space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-[#067D62] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[16px] font-bold text-[#067D62]">
                    Order placed, thank you!
                  </h3>
                  <p className="text-[12px] text-[#0F1111] mt-1">
                    Order #{orderConfirmation.orderNumber}
                  </p>
                </div>
              </div>
              <div className="text-[13px] text-[#0F1111] space-y-1.5 border-t border-[#D5EBE3] pt-3">
                <p>
                  <strong>{orderConfirmation.itemCount} item(s)</strong> · Total:{' '}
                  <strong className="tabular-nums">
                    S${orderConfirmation.total.toFixed(2)}
                  </strong>
                </p>
                <p className="text-[#565959]">
                  Shipping to{' '}
                  <strong className="text-[#0F1111]">
                    {deliveryLocation.label} {deliveryLocation.postalCode}
                  </strong>
                </p>
                <p className="text-[#007600] font-semibold">
                  Estimated delivery: Tomorrow, 19 Nov
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOrderConfirmation(null);
                  onClose();
                }}
                className="w-full py-2 px-4 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[13px] font-medium text-[#0F1111]"
              >
                Continue shopping iPhone Duo cases
              </button>
            </div>
          ) : resolvedItems.length === 0 ? (
            <div className="text-center py-10 px-4 border border-dashed border-[#D5D9D9] rounded-[6px] bg-[#FAFAFA]">
              <ShoppingBag className="w-10 h-10 text-[#888C8C] mx-auto mb-2.5" />
              <h3 className="text-[16px] font-bold text-[#0F1111] mb-1">
                Your Amazon.sg Cart is empty
              </h3>
              <p className="text-[13px] text-[#565959] mb-4">
                Add iPhone Duo cases to enjoy FREE Singapore delivery on orders over S$40 or with Prime.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[13px] font-medium text-[#0F1111]"
              >
                Browse search results
              </button>
            </div>
          ) : (
            <>
              {/* Singapore Free Delivery Eligibility Banner */}
              <div className="bg-[#F7F8F8] border border-[#E3E6E6] rounded-[6px] p-3 text-[12px]">
                {qualifiesFreeDelivery ? (
                  <div className="flex items-start gap-2 text-[#067D62]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Your order qualifies for{' '}
                      <strong className="font-bold">FREE Delivery in Singapore</strong>.
                      Select this option at checkout.
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-[#0F1111]">
                      Add{' '}
                      <strong className="text-[#B12704] tabular-nums">
                        S${remainingForFree.toFixed(2)}
                      </strong>{' '}
                      of eligible items to qualify for <strong>FREE Delivery</strong>.
                    </p>
                    <div className="h-2 bg-[#E3E6E6] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#067D62] transition-all duration-200"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-[#EAEAEA]">
                {resolvedItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.colour}`}
                    className="py-3.5 first:pt-0 flex gap-3"
                  >
                    <div className="w-20 h-20 bg-[#F7F7F7] rounded-[4px] border border-[#EAEAEA] flex items-center justify-center p-1.5 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-medium text-[#0F1111] line-clamp-2 leading-snug">
                        {item.product.title}
                      </h4>
                      <div className="text-[11px] text-[#565959] mt-0.5">
                        Colour: <strong className="text-[#0F1111]">{item.colour}</strong>
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[15px] font-bold text-[#0F1111] tabular-nums">
                          S${(item.finalUnitPrice * item.quantity).toFixed(2)}
                        </span>
                        {item.unitDiscount > 0 && (
                          <span className="text-[11px] text-[#067D62] font-semibold">
                            Voucher -S${(item.unitDiscount * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                      {item.product.isPrime && (
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#565959]">
                          <PrimeBadge />
                          <span>{item.product.deliveryDateText}</span>
                        </div>
                      )}

                      {/* Controls */}
                      <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                        <div className="inline-flex items-center rounded-full border border-[#D5D9D9] bg-[#F0F2F2] overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(item.productId, item.colour, -1)
                            }
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#E3E6E6]"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="w-3 h-3" />
                            ) : (
                              <Minus className="w-3 h-3" />
                            )}
                          </button>
                          <span className="px-2 text-[12px] font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(item.productId, item.colour, 1)
                            }
                            aria-label="Increase quantity"
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#E3E6E6]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            onRemoveItem(item.productId, item.colour)
                          }
                          className="text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onSaveForLater(item.productId, item.colour)
                          }
                          className="text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline"
                        >
                          Save for later
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Saved For Later / Wishlist Section */}
          {savedProducts.length > 0 && (
            <div className="border-t border-[#EAEAEA] pt-4">
              <h3 className="text-[14px] font-bold text-[#0F1111] mb-3">
                Saved for later ({savedProducts.length})
              </h3>
              <div className="space-y-3">
                {savedProducts.map((sp) => (
                  <div
                    key={sp.id}
                    className="flex gap-3 p-2.5 border border-[#E7E9EC] rounded-[6px] bg-[#FAFAFA]"
                  >
                    <img
                      src={sp.image}
                      alt={sp.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-contain bg-white rounded-[4px] p-1 border border-[#EAEAEA] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-[#0F1111] line-clamp-1">
                        {sp.title}
                      </p>
                      <p className="text-[13px] font-bold text-[#0F1111] tabular-nums mt-0.5">
                        S${sp.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <button
                          type="button"
                          onClick={() => onMoveSavedToCart(sp.id)}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-[#D5D9D9] hover:bg-[#F0F2F2]"
                        >
                          Move to Cart
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveSaved(sp.id)}
                          className="text-[11px] text-[#007185] hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Sticky Checkout Footer */}
        {resolvedItems.length > 0 && !orderConfirmation && (
          <div className="border-t border-[#E3E6E6] bg-[#F7F8F8] p-5 space-y-3 shrink-0">
            {totalSavings > 0 && (
              <div className="flex items-center justify-between text-[12px] text-[#067D62] font-semibold">
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Voucher savings applied
                </span>
                <span className="tabular-nums">-S${totalSavings.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <span className="text-[15px] text-[#0F1111]">
                Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):
              </span>
              <span className="text-[20px] font-bold text-[#0F1111] tabular-nums">
                S${subtotal.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-2.5 px-4 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[14px] font-semibold text-[#0F1111] shadow-[0_1px_2px_rgba(15,17,17,0.12)] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
