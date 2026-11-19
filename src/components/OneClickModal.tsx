import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  MapPin,
  CreditCard,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { Product } from '../data/products';
import { PrimeBadge } from './AmazonIcons';

export interface OneClickOrder {
  orderNumber: string;
  product: Product;
  colour: string;
  quantity: number;
  unitPrice: number;
  voucherSavings: number;
  total: number;
}

interface OneClickModalProps {
  order: OneClickOrder | null;
  deliveryLocation: { label: string; postalCode: string };
  onClose: () => void;
  onCancelOrder: () => void;
}

export const OneClickModal: React.FC<OneClickModalProps> = ({
  order,
  deliveryLocation,
  onClose,
  onCancelOrder,
}) => {
  useEffect(() => {
    if (!order) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [order, onClose]);

  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="1-Click order confirmation"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] bg-white rounded-[8px] overflow-hidden shadow-[0_16px_44px_rgba(0,0,0,0.28)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Green Confirmation Header */}
        <div className="bg-[#F2FBF8] border-b border-[#CDE8DF] px-5 py-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-6 h-6 text-[#067D62] shrink-0 mt-0.5" />
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#067D62] mb-0.5">
                <Zap className="w-3 h-3 fill-[#067D62]" />
                <span>1-Click Order Placed</span>
              </div>
              <h2 className="text-[17px] font-bold text-[#0F1111] leading-snug">
                Thank you, your order has been placed.
              </h2>
              <p className="text-[12px] text-[#565959] mt-0.5 tabular-nums">
                Order #{order.orderNumber}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close confirmation"
            className="p-1 rounded hover:bg-[#E1F3EC] text-[#0F1111] shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item Summary */}
        <div className="p-5 space-y-4">
          <div className="flex gap-3.5 pb-4 border-b border-[#EAEAEA]">
            <div className="w-20 h-20 bg-[#F7F7F7] rounded-[6px] border border-[#EAEAEA] p-1.5 flex items-center justify-center shrink-0">
              <img
                src={order.product.image}
                alt={order.product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-[#0F1111] line-clamp-2 leading-snug">
                {order.product.title}
              </p>
              <p className="text-[12px] text-[#565959] mt-1">
                Colour: <strong className="text-[#0F1111]">{order.colour}</strong>
                <span className="mx-1.5">·</span>
                Qty: <strong className="text-[#0F1111] tabular-nums">{order.quantity}</strong>
              </p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-[16px] font-bold text-[#0F1111] tabular-nums">
                  S${order.total.toFixed(2)}
                </span>
                {order.voucherSavings > 0 && (
                  <span className="text-[11px] font-semibold text-[#067D62] tabular-nums">
                    (Saved S${order.voucherSavings.toFixed(2)} with voucher)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Shipping & Payment Details */}
          <div className="space-y-2.5 text-[13px] text-[#0F1111]">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#565959] mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">
                  Delivering to {deliveryLocation.label}{' '}
                  {deliveryLocation.postalCode || '(Islandwide)'}
                </div>
                <div className="text-[12px] text-[#007600] font-semibold flex items-center gap-1.5 mt-0.5 flex-wrap">
                  {order.product.isPrime && <PrimeBadge />}
                  <span>Estimated arrival: {order.product.deliveryDateText}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-[12px] text-[#565959]">
              <CreditCard className="w-4 h-4 shrink-0" />
              <span>Paid with default 1-Click Singapore payment method (SGD, GST included)</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[13px] font-semibold text-[#0F1111] transition-colors"
            >
              Continue shopping
            </button>
            <button
              type="button"
              onClick={onCancelOrder}
              className="w-full py-2 px-4 rounded-full bg-white hover:bg-[#F7FAFA] border border-[#D5D9D9] text-[13px] font-medium text-[#0F1111] transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#565959]" />
              <span>Cancel 1-Click order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
