import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  currentLocation: { label: string; postalCode: string };
  onClose: () => void;
  onSelectLocation: (loc: { label: string; postalCode: string }) => void;
}

const SINGAPORE_PRESETS = [
  { label: 'Singapore', postalCode: '' },
  { label: 'Orchard', postalCode: '238839' },
  { label: 'Marina Bay', postalCode: '018956' },
  { label: 'Tampines', postalCode: '529510' },
  { label: 'One-North', postalCode: '138588' },
];

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  currentLocation,
  onClose,
  onSelectLocation,
}) => {
  const [postalInput, setPostalInput] = useState(currentLocation.postalCode);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleApplyPostal = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = postalInput.trim();
    if (!/^\d{6}$/.test(cleaned)) {
      setError('Please enter a valid 6-digit Singapore postal code.');
      return;
    }
    setError('');
    onSelectLocation({ label: 'Singapore', postalCode: cleaned });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your delivery location"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[380px] bg-white rounded-[8px] overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#F0F2F2] border-b border-[#D5D9D9] px-5 py-3.5 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-[#0F1111]">
            Choose your location
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close location modal"
            className="p-1 rounded hover:bg-[#E3E6E6] text-[#0F1111]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-[12px] text-[#565959] leading-relaxed">
            Delivery options and Singapore Prime speeds may vary for different
            postal districts.
          </p>

          <form onSubmit={handleApplyPostal} className="space-y-2">
            <label
              htmlFor="sg-postal"
              className="block text-[12px] font-semibold text-[#0F1111]"
            >
              Enter a Singapore postal code
            </label>
            <div className="flex gap-2">
              <input
                id="sg-postal"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={postalInput}
                onChange={(e) => {
                  setPostalInput(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="e.g. 238839"
                className="flex-1 h-[34px] px-3 text-[13px] tabular-nums border border-[#888C8C] rounded-[4px] focus:outline-none focus:border-[#007185] focus:ring-2 focus:ring-[#007185]/20"
              />
              <button
                type="submit"
                className="px-4 h-[34px] text-[13px] font-medium bg-white hover:bg-[#F7FAFA] border border-[#D5D9D9] rounded-[8px] shadow-[0_1px_2px_rgba(15,17,17,0.1)]"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-[12px] text-[#C40000]">{error}</p>}
          </form>

          <div className="border-t border-[#EAEAEA] pt-3">
            <p className="text-[11px] font-semibold text-[#565959] mb-2">
              Quick select Singapore district
            </p>
            <div className="space-y-1.5">
              {SINGAPORE_PRESETS.map((preset) => {
                const active =
                  currentLocation.label === preset.label &&
                  currentLocation.postalCode === preset.postalCode;
                return (
                  <button
                    key={`${preset.label}-${preset.postalCode}`}
                    type="button"
                    onClick={() => {
                      onSelectLocation(preset);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] border text-[13px] transition-colors ${
                      active
                        ? 'border-[#007185] bg-[#EDFDFF] font-semibold text-[#0F1111]'
                        : 'border-[#E3E6E6] hover:bg-[#F7F8F8] text-[#0F1111]'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#565959]" />
                      {preset.label}
                    </span>
                    <span className="text-[12px] text-[#565959] tabular-nums">
                      {preset.postalCode || 'Islandwide'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
