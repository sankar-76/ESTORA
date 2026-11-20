import { getLocalStorage, setLocalStorage } from '../utils/storage';
import { useState } from 'react';
import { Icon } from '../components/Icon';

export const ContactPage = ({ navigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Portfolio Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');

    const contactRecord = {
      id: Date.now(),
      fullName,
      email,
      phone,
      subject,
      message,
      submittedAt: new Date().toISOString()
    };

    const existingContacts = getLocalStorage('estora_contact_messages', []);
    setLocalStorage('estora_contact_messages', [contactRecord, ...existingContacts]);

    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in space-y-12">
      <div className="border-b border-[#E2DDD3] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold">
          PRIVATE ADVISORY CONTACT
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#181817]">
          Connect With ESTORA
        </h1>
        <p className="text-xs sm:text-sm text-[#76736E] max-w-xl font-light">
          Whether inquiring about private acquisition, commercial lease, or submitting an architectural estate for inclusion.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* CONTACT INFO */}
        <div className="lg:col-span-5 space-y-8 bg-[#FCFBF9] border border-[#E2DDD3] p-8">
          <h3 className="font-serif text-2xl text-[#181817]">Global Headquarters</h3>

          <div className="space-y-6 text-xs text-[#76736E]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#9A7B56] font-semibold block mb-1">Goa Studio</span>
              <p className="text-[#181817] font-medium">Anjuna Coastal Road, Villa 4, Goa 403509</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#9A7B56] font-semibold block mb-1">Mumbai Advisory</span>
              <p className="text-[#181817] font-medium">Worli Sea Face Tower, Level 24, Mumbai 400018</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#9A7B56] font-semibold block mb-1">Dubai Pavilion</span>
              <p className="text-[#181817] font-medium">Boulevard Plaza Tower 1, Downtown Dubai</p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E2DDD3] text-xs text-[#76736E] space-y-2">
            <p className="font-semibold text-[#181817] uppercase tracking-wider">Demonstration Contact Details</p>
            <p>Direct inquiries: advisory@estora-estate-demo.com</p>
            <p>Telephone: +91 22 8888 7777 (Demo)</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="lg:col-span-7 bg-[#FCFBF9] border border-[#E2DDD3] p-8">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 bg-[#9A7B56] text-white rounded-full flex items-center justify-center mx-auto">
                <Icon name="check" className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#181817]">Message Received</h3>
              <p className="text-xs text-[#76736E] max-w-md mx-auto">
                Thank you for your message. Your inquiry has been saved locally for demonstration purposes.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-[#181817] text-white text-xs uppercase tracking-widest"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <h3 className="font-serif text-2xl text-[#181817]">Send a Private Inquiry</h3>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#76736E]">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
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
                    placeholder="email@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-[#F7F5F0] border border-[#E2DDD3] text-[#181817]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-[#76736E]">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-[#F7F5F0] border border-[#E2DDD3] text-[#181817]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#76736E]">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 bg-[#F7F5F0] border border-[#E2DDD3] text-[#181817]"
                >
                  <option value="General Portfolio Inquiry">General Portfolio Inquiry</option>
                  <option value="Private Estate Acquisition">Private Estate Acquisition</option>
                  <option value="Commercial Leasing">Commercial Leasing</option>
                  <option value="Architectural Listing Submission">Architectural Listing Submission</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#76736E]">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your property interest or inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-[#F7F5F0] border border-[#E2DDD3] text-[#181817]"
                />
              </div>

              {error && <p className="text-rose-600 text-[11px]">{error}</p>}

              <button
                type="submit"
                className="w-full py-4 bg-[#181817] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#9A7B56] transition-colors"
              >
                Submit Advisory Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
