import React, { useState } from 'react';
import {
  Cancel01Icon,
  CheckmarkCircle02Icon,
  WhatsappIcon,
  File01Icon,
  ArrowRight01Icon,
  Shield01Icon
} from 'hugeicons-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillPackage?: string;
  preselectedPackage?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  prefillPackage,
  preselectedPackage
}) => {
  const activePackage = preselectedPackage || prefillPackage;
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('lagos-island');
  const [propertyType, setPropertyType] = useState('duplex');
  const [acCount, setAcCount] = useState('2');
  const [borehole, setBorehole] = useState('borehole-1hp');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showFormalLineItems, setShowFormalLineItems] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Generate dynamic line-item estimation based on inputs
  const isLarge = acCount === '3-4' || acCount === '5+' || propertyType === 'commercial';
  const isSmall = acCount === '1' && propertyType === 'bungalow';
  
  const estimatedSystem = isLarge
    ? 'Large home 15kVA system'
    : isSmall
    ? 'Small flat 3.5kVA setup'
    : 'Duplex 10kVA setup';

  const estimatedCapex = isLarge ? '₦14,900,000' : isSmall ? '₦4,250,000' : '₦8,850,000';
  const monthlySavings = isLarge ? '₦450,000 – ₦650,000' : isSmall ? '₦140,000 – ₦190,000' : '₦260,000 – ₦340,000';

  const generateWhatsAppMessage = () => {
    const text = `Hello SunGrid, I would like to book a site inspection:
- Name: ${fullName || 'Homeowner'}
- Phone: ${phone || 'N/A'}
- City / Area: ${city}
- Property: ${propertyType}
- Overnight ACs: ${acCount}
- Borehole Pump: ${borehole}
- Recommended System: ${activePackage || estimatedSystem}
- Notes: ${notes || 'None'}
Please arrange for a technician to check our breaker panel and send an itemized quote.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md transition-opacity duration-300 p-3 sm:p-6 flex justify-center items-start">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 my-4 sm:my-8 modal-spring-in flex flex-col">
        {/* Modal Header - Always Visible at the Top */}
        <div className="bg-[#12161a] text-white p-5 sm:p-7 flex items-start justify-between relative overflow-hidden shrink-0 border-b border-neutral-800">
          <div className="relative z-10 pr-4">
            <h3 className="font-headline-lg text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Request an on-site electrical inspection
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 mt-1 max-w-md leading-relaxed">
              An electrician will review your appliances, measure startup power draw, and recommend the right system size.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 relative z-10 active:scale-95 touch-manipulation"
            aria-label="Close modal"
          >
            <Cancel01Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckmarkCircle02Icon className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="font-headline-md text-2xl font-bold text-neutral-900">
                  Inspection request received
                </h4>
                <p className="text-base text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName || 'there'}</strong>. A technician covering the <strong>{city}</strong> area will contact you by phone or WhatsApp within 45 minutes.
                </p>
              </div>

              {/* Fast track WhatsApp button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/2348007864743?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#10b981] hover:bg-emerald-600 text-white font-semibold text-base transition-all shadow-md min-h-[50px] touch-manipulation"
                >
                  <WhatsappIcon className="w-5 h-5" />
                  <span>Message us directly on WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-base font-semibold transition-colors min-h-[50px] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-800 mb-1.5">
                    Full name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Babatunde Sowande"
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-800 mb-1.5">
                    Phone number (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0803 000 0000"
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Region & Property Archetype */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-800 mb-1.5">
                    City or neighborhood *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="Lagos Island (VI, Ikoyi, Lekki, Ajah)">Lagos Island (VI, Ikoyi, Lekki, Ajah)</option>
                    <option value="Lagos Mainland (Ikeja, Magodo, Surulere)">Lagos Mainland (Ikeja, Magodo, Surulere)</option>
                    <option value="Abuja FCT (Maitama, Asokoro, Guzape, Jabi)">Abuja FCT (Maitama, Asokoro, Guzape, Jabi)</option>
                    <option value="Port Harcourt (Old GRA, Trans-Amadi, Peter Odili)">Port Harcourt (Old GRA, Trans-Amadi, Peter Odili)</option>
                    <option value="Ibadan (Bodija, Oluyole, Jericho)">Ibadan (Bodija, Oluyole, Jericho)</option>
                    <option value="Other Nigerian State">Other Nigerian state</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-800 mb-1.5">
                    Building type *
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="duplex">3 to 5 bedroom duplex</option>
                    <option value="terrace">Terrace or semi-detached house</option>
                    <option value="bungalow">2 to 3 bedroom bungalow or flat</option>
                    <option value="commercial">Office, clinic, or business premises</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Heavy Loads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-800 mb-1.5">
                    Air conditioners running at night
                  </label>
                  <select
                    value={acCount}
                    onChange={(e) => setAcCount(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="1">1 inverter AC (master bedroom)</option>
                    <option value="2">2 inverter ACs</option>
                    <option value="3-4">3 to 4 ACs</option>
                    <option value="5+">5 or more ACs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-800 mb-1.5">
                    Water pump
                  </label>
                  <select
                    value={borehole}
                    onChange={(e) => setBorehole(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="borehole-1hp">1.0HP to 1.5HP borehole pump</option>
                    <option value="borehole-2hp">2.0HP deep borehole pump</option>
                    <option value="booster-only">Pressure booster pump only</option>
                    <option value="none">No pump (central water supply)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-neutral-800 mb-1.5">
                  Any specific site details (optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Roof is east-facing with some shade, or voltage spikes are common on our street."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                />
              </div>

              {/* Estimated Sizing Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-100/90 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mech-settle">
                <div>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
                    Estimated system match
                  </span>
                  <p className="font-headline-sm text-base sm:text-xl font-bold text-neutral-900 mt-0.5">
                    {prefillPackage || estimatedSystem}
                  </p>
                  <p className="text-sm sm:text-base text-neutral-700 mt-0.5">
                    Estimated monthly generator fuel saved: <strong className="text-neutral-900 tabular-nums">{monthlySavings}</strong>
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-sm text-neutral-500 block">Estimated complete price:</span>
                  <span className="text-xl sm:text-2xl font-bold text-neutral-900 tabular-nums">{estimatedCapex}</span>
                </div>
              </div>

              {/* Line items toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowFormalLineItems(!showFormalLineItems)}
                  className="text-sm sm:text-base font-semibold text-primary hover:underline flex items-center gap-1.5 cursor-pointer py-1"
                >
                  <File01Icon className="w-4 h-4" />
                  <span>{showFormalLineItems ? 'Hide equipment details' : 'Show included equipment and installation details'}</span>
                </button>

                {showFormalLineItems && (
                  <div className="mt-3 p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 text-sm sm:text-base text-neutral-700 space-y-2.5 animate-fadeIn">
                    <div className="flex justify-between border-b border-neutral-100 pb-1.5 font-bold text-neutral-900 text-sm sm:text-base">
                      <span>Component</span>
                      <span>What is included</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-semibold text-neutral-800">Solar panels:</span>
                      <span className="text-right">Double-glass monocrystalline panels</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-semibold text-neutral-800">Lithium battery:</span>
                      <span className="text-right">Lithium iron phosphate (LiFePO4) storage (6,000 cycles)</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-semibold text-neutral-800">Cabling and trunking:</span>
                      <span className="text-right">Pure electrolytic copper wire in galvanized metal trunking</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-semibold text-neutral-800">Grounding array:</span>
                      <span className="text-right">3-meter copper-bonded rod with bentonite earth enhancement</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-semibold text-neutral-800">Delivery and installation:</span>
                      <span className="text-right">Doorstep delivery, full installation labor, and 24-hour equipment replacement warranty</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary-container text-white font-semibold text-base transition-all shadow-[0_4px_20px_rgba(167,52,0,0.3)] flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.98] min-h-[52px] touch-manipulation"
                >
                  <span>Request on-site inspection</span>
                  <ArrowRight01Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={`https://wa.me/2348007864743?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-neutral-700 hover:text-primary flex items-center gap-2 transition-colors py-2 touch-manipulation"
                >
                  <WhatsappIcon className="w-5 h-5 text-emerald-600" />
                  <span>Prefer WhatsApp? Message us here</span>
                </a>
              </div>

              <div className="flex items-center gap-2.5 pt-3 text-xs sm:text-sm text-neutral-600 border-t border-neutral-100">
                <Shield01Icon className="w-4 h-4 text-primary shrink-0" />
                <span>Fixed quotes are valid for 30 days following an on-site inspection.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
