import { getLocalStorage, setLocalStorage } from '../utils/storage';
import { useState } from 'react';
import { Icon } from '../components/Icon';
import { SAMPLE_PROPERTIES } from '../data/properties';

export const ScheduleViewingPage = ({ navigate }) => {
  const hashString = window.location.hash.split('?')[1] || '';
  const searchParams = new URLSearchParams(hashString);
  const prefilledPropId = searchParams.get('propertyId');

  const [step, setStep] = useState(1);
  const [selectedPropertyId, setSelectedPropertyId] = useState(prefilledPropId || SAMPLE_PROPERTIES[0].id);
  const [viewDate, setViewDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [refId, setRefId] = useState('');
  const [error, setError] = useState('');

  const selectedProperty = SAMPLE_PROPERTIES.find((p) => p.id === selectedPropertyId) || SAMPLE_PROPERTIES[0];

  // Disable past dates
  const todayStr = new Date().toISOString().split('T')[0];

  const handleStep3Next = (e) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setError('Please complete all required contact fields.');
      return;
    }
    setError('');
    setStep(4);
  };

  const handleFinalSubmit = () => {
    const generatedRef = `EST-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(generatedRef);

    const bookingData = {
      refId: generatedRef,
      propertyId: selectedProperty.id,
      propertyName: selectedProperty.name,
      viewDate,
      timeSlot,
      fullName,
      email,
      phone,
      notes,
      createdAt: new Date().toISOString()
    };

    const existingInquiries = getLocalStorage('estora_viewing_inquiries', []);
    setLocalStorage('estora_viewing_inquiries', [bookingData, ...existingInquiries]);

    setStep(5);
  };

  return (
    <div className="pt-28 pb-24 max-w-4xl mx-auto px-6 animate-fade-in space-y-10">
      {/* HEADER */}
      <div className="border-b border-[#E2DDD3] pb-6 space-y-2 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold">
          PRIVATE ARCHITECTURAL TOUR
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#181817]">
          Schedule a Private Viewing
        </h1>
        <p className="text-xs text-[#76736E] font-light max-w-lg mx-auto">
          Experience your prospective residence through an exclusive guided walk-through arranged by our advisory team.
        </p>
      </div>

      {/* STEP INDICATOR */}
      {step < 5 && (
        <div className="flex items-center justify-between border-b border-[#E2DDD3] pb-4 text-xs font-medium">
          {[
            { num: 1, label: "Residence" },
            { num: 2, label: "Date & Time" },
            { num: 3, label: "Contact" },
            { num: 4, label: "Review" }
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center space-x-2 ${
                step >= s.num ? "text-[#9A7B56]" : "text-[#76736E] opacity-50"
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                step >= s.num ? "bg-[#9A7B56] text-white" : "border border-[#E2DDD3]"
              }`}>
                {s.num}
              </span>
              <span className="hidden sm:inline uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* STEP 1: SELECT PROPERTY */}
      {step === 1 && (
        <div className="bg-[#FCFBF9] border border-[#E2DDD3] p-8 space-y-6">
          <h3 className="font-serif text-2xl text-[#181817]">Step 1: Confirm Selected Residence</h3>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-[#76736E]">Select Property from Portfolio</label>
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="w-full p-4 bg-[#F7F5F0] border border-[#E2DDD3] text-sm text-[#181817] font-serif"
            >
              {SAMPLE_PROPERTIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.location} ({p.priceFormatted})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 bg-[#F7F5F0] border border-[#E2DDD3] items-center">
            <div className="md:col-span-4 aspect-[4/3] overflow-hidden">
              <img src={selectedProperty.heroImage} alt={selectedProperty.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:col-span-8 space-y-2">
              <h4 className="font-serif text-xl font-medium text-[#181817]">{selectedProperty.name}</h4>
              <p className="text-xs text-[#76736E]">{selectedProperty.location}</p>
              <p className="font-serif text-lg font-bold text-[#9A7B56]">{selectedProperty.priceFormatted}</p>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-4 bg-[#181817] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#9A7B56] transition-colors"
          >
            Continue to Date & Time Selection
          </button>
        </div>
      )}

      {/* STEP 2: DATE & TIME */}
      {step === 2 && (
        <div className="bg-[#FCFBF9] border border-[#E2DDD3] p-8 space-y-6">
          <h3 className="font-serif text-2xl text-[#181817]">Step 2: Preferred Date & Time Slot</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#76736E]">Preferred Viewing Date</label>
              <input
                type="date"
                min={todayStr}
                value={viewDate}
                onChange={(e) => setViewDate(e.target.value)}
                className="w-full p-4 bg-[#F7F5F0] border border-[#E2DDD3] text-sm text-[#181817]"
              />
              <p className="text-[10px] text-[#76736E]">Note: Past dates are automatically restricted.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#76736E]">Available Sample Time Slot</label>
              <div className="grid grid-cols-3 gap-3">
                {['10:00 AM', '02:30 PM', '05:00 PM'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-3 border text-xs font-semibold transition-colors ${
                      timeSlot === slot
                        ? "bg-[#9A7B56] text-white border-[#9A7B56]"
                        : "bg-[#F7F5F0] text-[#181817] border-[#E2DDD3] hover:border-[#9A7B56]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 py-4 border border-[#E2DDD3] text-[#76736E] text-xs uppercase tracking-widest"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (!viewDate) {
                  setError('Please choose a valid future viewing date.');
                  return;
                }
                setError('');
                setStep(3);
              }}
              className="w-2/3 py-4 bg-[#181817] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#9A7B56] transition-colors"
            >
              Proceed to Contact Information
            </button>
          </div>
          {error && <p className="text-rose-600 text-xs">{error}</p>}
        </div>
      )}

      {/* STEP 3: CONTACT FORM */}
      {step === 3 && (
        <form onSubmit={handleStep3Next} className="bg-[#FCFBF9] border border-[#E2DDD3] p-8 space-y-6">
          <h3 className="font-serif text-2xl text-[#181817]">Step 3: Advisory Contact Details</h3>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="uppercase tracking-wider text-[#76736E]">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Lord / Lady / Mr / Ms..."
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 bg-[#F7F5F0] border border-[#E2DDD3] text-[#181817]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#76736E]">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-[#F7F5F0] border border-[#E2DDD3] text-[#181817]"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#76736E]">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-[#F7F5F0] border border-[#E2DDD3] text-[#181817]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-[#76736E]">Specific Viewing Instructions or Requirements</label>
              <textarea
                rows={3}
                placeholder="Mention security clearance needs, private chauffeur arrangements, or architectural inquiries..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 bg-[#F7F5F0] border border-[#E2DDD3] text-[#181817]"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-1/3 py-4 border border-[#E2DDD3] text-[#76736E] text-xs uppercase tracking-widest"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-2/3 py-4 bg-[#181817] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#9A7B56] transition-colors"
            >
              Review Booking Request
            </button>
          </div>
          {error && <p className="text-rose-600 text-xs">{error}</p>}
        </form>
      )}

      {/* STEP 4: REVIEW SUMMARY */}
      {step === 4 && (
        <div className="bg-[#FCFBF9] border border-[#E2DDD3] p-8 space-y-6">
          <h3 className="font-serif text-2xl text-[#181817]">Step 4: Review Private Tour Details</h3>

          <div className="space-y-4 border-t border-b border-[#E2DDD3] py-6 text-xs text-[#181817]">
            <div className="flex justify-between">
              <span className="text-[#76736E]">Residence:</span>
              <span className="font-bold">{selectedProperty.name} ({selectedProperty.location})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#76736E]">Date & Slot:</span>
              <span className="font-bold">{viewDate} at {timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#76736E]">Full Name:</span>
              <span>{fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#76736E]">Contact Info:</span>
              <span>{email} | {phone}</span>
            </div>
            {notes && (
              <div className="flex justify-between">
                <span className="text-[#76736E]">Special Instructions:</span>
                <span className="max-w-xs text-right">{notes}</span>
              </div>
            )}
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <p className="font-semibold">Demonstration Inquiry Disclaimer</p>
            <p>
              This is a demonstration inquiry. ESTORA has not received a real viewing request, nor does this claim live agent availability.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setStep(3)}
              className="w-1/3 py-4 border border-[#E2DDD3] text-[#76736E] text-xs uppercase tracking-widest"
            >
              Modify Details
            </button>
            <button
              onClick={handleFinalSubmit}
              className="w-2/3 py-4 bg-[#9A7B56] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#836746] transition-colors shadow-md"
            >
              Confirm Tour Request
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: CONFIRMATION SCREEN */}
      {step === 5 && (
        <div className="bg-[#FCFBF9] border border-[#E2DDD3] p-10 text-center space-y-6 animate-scale-in">
          <div className="w-16 h-16 bg-[#9A7B56] text-white rounded-full flex items-center justify-center mx-auto">
            <Icon name="check" className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold block">
            VIEWING INQUIRY REGISTERED
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#181817]">
            Private Tour Requested
          </h2>

          <div className="p-6 bg-[#F7F5F0] border border-[#E2DDD3] max-w-md mx-auto text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#76736E]">Reference ID:</span>
              <span className="font-bold text-[#9A7B56]">{refId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#76736E]">Property:</span>
              <span>{selectedProperty.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#76736E]">Scheduled Date:</span>
              <span>{viewDate} ({timeSlot})</span>
            </div>
          </div>

          <p className="text-xs text-[#76736E] max-w-lg mx-auto font-light">
            Your demo booking record has been logged in LocalStorage under reference <strong className="text-[#181817]">{refId}</strong>.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/properties')}
              className="px-8 py-4 bg-[#181817] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#9A7B56] transition-colors"
            >
              Return to Portfolio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
