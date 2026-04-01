"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Select, { StylesConfig } from "react-select";
import { Repeat, X, Banknote, Search } from "lucide-react";

// 🌍 ලෝකයේ ප්‍රධාන මුදල් ඒකක ලැයිස්තුව (ISO Codes)
// ඔබට අවශ්‍ය ඕනෑම රටක් මෙතැනට එක් කළ හැක
const allCurrencies = [
  { value: "USD", label: "🇺🇸 USD - US Dollar" },
  { value: "LKR", label: "🇱🇰 LKR - Sri Lankan Rupee" },
  { value: "AED", label: "🇦🇪 AED - UAE Dirham" },
  { value: "AFN", label: "🇦🇫 AFN - Afghan Afghani" },
  { value: "ALL", label: "🇦🇱 ALL - Albanian Lek" },
  { value: "AMD", label: "🇦🇲 AMD - Armenian Dram" },
  { value: "ANG", label: "🇳🇱 ANG - Dutch Guilder" },
  { value: "AOA", label: "🇦🇴 AOA - Angolan Kwanza" },
  { value: "ARS", label: "🇦🇷 ARS - Argentine Peso" },
  { value: "AUD", label: "🇦🇺 AUD - Australian Dollar" },
  { value: "AWG", label: "🇦🇼 AWG - Aruban Florin" },
  { value: "AZN", label: "🇦🇿 AZN - Azerbaijani Manat" },
  { value: "BAM", label: "🇧🇦 BAM - Bosnia-Herzegovina Mark" },
  { value: "BBD", label: "🇧🇧 BBD - Barbadian Dollar" },
  { value: "BDT", label: "🇧🇩 BDT - Bangladeshi Taka" },
  { value: "BGN", label: "🇧🇬 BGN - Bulgarian Lev" },
  { value: "BHD", label: "🇧🇭 BHD - Bahraini Dinar" },
  { value: "BIF", label: "🇧🇮 BIF - Burundian Franc" },
  { value: "BMD", label: "🇧🇲 BMD - Bermudian Dollar" },
  { value: "BND", label: "🇧🇳 BND - Brunei Dollar" },
  { value: "BOB", label: "🇧🇴 BOB - Bolivian Boliviano" },
  { value: "BRL", label: "🇧🇷 BRL - Brazilian Real" },
  { value: "BSD", label: "🇧🇸 BSD - Bahamian Dollar" },
  { value: "BTN", label: "🇧🇹 BTN - Bhutanese Ngultrum" },
  { value: "BWP", label: "🇧🇼 BWP - Botswana Pula" },
  { value: "BYN", label: "🇧ය BYN - Belarusian Ruble" },
  { value: "BZD", label: "🇧🇿 BZD - Belize Dollar" },
  { value: "CAD", label: "🇨🇦 CAD - Canadian Dollar" },
  { value: "CDF", label: "🇨🇩 CDF - Congolese Franc" },
  { value: "CHF", label: "🇨🇭 CHF - Swiss Franc" },
  { value: "CLP", label: "🇨🇱 CLP - Chilean Peso" },
  { value: "CNY", label: "🇨🇳 CNY - Chinese Yuan" },
  { value: "COP", label: "🇨🇴 COP - Colombian Peso" },
  { value: "CRC", label: "🇨🇷 CRC - Costa Rican Colón" },
  { value: "CUP", label: "🇨🇺 CUP - Cuban Peso" },
  { value: "CVE", label: "🇨🇻 CVE - Cape Verdean Escudo" },
  { value: "CZK", label: "🇨🇿 CZK - Czech Koruna" },
  { value: "DJF", label: "🇩🇯 DJF - Djiboutian Franc" },
  { value: "DKK", label: "🇩🇰 DKK - Danish Krone" },
  { value: "DOP", label: "🇩🇴 DOP - Dominican Peso" },
  { value: "DZD", label: "🇩🇿 DZD - Algerian Dinar" },
  { value: "EGP", label: "🇪🇬 EGP - Egyptian Pound" },
  { value: "ERN", label: "🇪🇷 ERN - Eritrean Nakfa" },
  { value: "ETB", label: "🇪🇹 ETB - Ethiopian Birr" },
  { value: "EUR", label: "🇪🇺 EUR - Euro" },
  { value: "FJD", label: "🇫🇯 FJD - Fijian Dollar" },
  { value: "FKP", label: "🇫🇰 FKP - Falkland Islands Pound" },
  { value: "GBP", label: "🇬🇧 GBP - British Pound" },
  { value: "GEL", label: "🇬🇪 GEL - Georgian Lari" },
  { value: "GHS", label: "🇬🇭 GHS - Ghanaian Cedi" },
  { value: "GIP", label: "🇬🇮 GIP - Gibraltar Pound" },
  { value: "GMD", label: "🇬🇲 GMD - Gambian Dalasi" },
  { value: "GNF", label: "🇬🇳 GNF - Guinean Franc" },
  { value: "GTQ", label: "🇬🇹 GTQ - Guatemalan Quetzal" },
  { value: "GYD", label: "🇬🇾 GYD - Guyanaese Dollar" },
  { value: "HKD", label: "🇭🇰 HKD - Hong Kong Dollar" },
  { value: "HNL", label: "🇭🇳 HNL - Honduran Lempira" },
  { value: "HUF", label: "🇭🇺 HUF - Hungarian Forint" },
  { value: "IDR", label: "🇮🇩 IDR - Indonesian Rupiah" },
  { value: "ILS", label: "🇮🇱 ILS - Israeli New Shekel" },
  { value: "INR", label: "🇮🇳 INR - Indian Rupee" },
  { value: "IQD", label: "🇮🇶 IQD - Iraqi Dinar" },
  { value: "IRR", label: "🇮🇷 IRR - Iranian Rial" },
  { value: "ISK", label: "🇮🇸 ISK - Icelandic Króna" },
  { value: "JMD", label: "🇯🇲 JMD - Jamaican Dollar" },
  { value: "JOD", label: "🇯🇴 JOD - Jordanian Dinar" },
  { value: "JPY", label: "🇯🇵 JPY - Japanese Yen" },
  { value: "KES", label: "🇰🇪 KES - Kenyan Shilling" },
  { value: "KGS", label: "🇰🇬 KGS - Kyrgystani Som" },
  { value: "KHR", label: "🇰🇭 KHR - Cambodian Riel" },
  { value: "KMF", label: "🇰🇲 KMF - Comorian Franc" },
  { value: "KRW", label: "🇰🇷 KRW - South Korean Won" },
  { value: "KWD", label: "🇰🇼 KWD - Kuwaiti Dinar" },
  { value: "KYD", label: "🇰🇾 KYD - Cayman Islands Dollar" },
  { value: "KZT", label: "🇰🇿 KZT - Kazakhstani Tenge" },
  { value: "LAK", label: "🇱🇦 LAK - Laotian Kip" },
  { value: "LBP", label: "🇱🇧 LBP - Lebanese Pound" },
  { value: "LRD", label: "🇱🇷 LRD - Liberian Dollar" },
  { value: "LSL", label: "🇱🇸 LSL - Lesotho Loti" },
  { value: "LYD", label: "🇱🇾 LYD - Libyan Dinar" },
  { value: "MAD", label: "🇲🇦 MAD - Moroccan Dirham" },
  { value: "MDL", label: "🇲🇩 MDL - Moldovan Leu" },
  { value: "MGA", label: "🇲🇬 MGA - Malagasy Ariary" },
  { value: "MKD", label: "🇲🇰 MKD - Macedonian Denar" },
  { value: "MMK", label: "🇲🇲 MMK - Myanmar Kyat" },
  { value: "MNT", label: "🇲🇳 MNT - Mongolian Tugrik" },
  { value: "MOP", label: "🇲🇴 MOP - Macanese Pataca" },
  { value: "MRU", label: "🇲🇷 MRU - Mauritanian Ouguiya" },
  { value: "MUR", label: "🇲🇺 MUR - Mauritian Rupee" },
  { value: "MVR", label: "🇲🇻 MVR - Maldivian Rufiyaa" },
  { value: "MWK", label: "🇲🇼 MWK - Malawian Kwacha" },
  { value: "MXN", label: "🇲🇽 MXN - Mexican Peso" },
  { value: "MYR", label: "🇲🇾 MYR - Malaysian Ringgit" },
  { value: "MZN", label: "🇲🇿 MZN - Mozambican Metical" },
  { value: "NAD", label: "🇳🇦 NAD - Namibian Dollar" },
  { value: "NGN", label: "🇳🇬 NGN - Nigerian Naira" },
  { value: "NIO", label: "🇳🇮 NIO - Nicaraguan Córdoba" },
  { value: "NOK", label: "🇳🇴 NOK - Norwegian Krone" },
  { value: "NPR", label: "🇳🇵 NPR - Nepalese Rupee" },
  { value: "NZD", label: "🇳🇿 NZD - New Zealand Dollar" },
  { value: "OMR", label: "🇴🇲 OMR - Omani Rial" },
  { value: "PAB", label: "🇵🇦 PAB - Panamanian Balboa" },
  { value: "PEN", label: "🇵🇪 PEN - Peruvian Sol" },
  { value: "PGK", label: "🇵🇬 PGK - Papua New Guinean Kina" },
  { value: "PHP", label: "🇵🇭 PHP - Philippine Peso" },
  { value: "PKR", label: "🇵🇰 PKR - Pakistani Rupee" },
  { value: "PLN", label: "🇵🇱 PLN - Polish Zloty" },
  { value: "PYG", label: "🇵🇾 PYG - Paraguayan Guarani" },
  { value: "QAR", label: "🇶🇦 QAR - Qatari Rial" },
  { value: "RON", label: "🇷🇴 RON - Romanian Leu" },
  { value: "RSD", label: "🇷🇸 RSD - Serbian Dinar" },
  { value: "RUB", label: "🇷🇺 RUB - Russian Ruble" },
  { value: "RWF", label: "🇷🇼 RWF - Rwandan Franc" },
  { value: "SAR", label: "🇸🇦 SAR - Saudi Riyal" },
  { value: "SBD", label: "🇸🇧 SBD - Solomon Islands Dollar" },
  { value: "SCR", label: "🇸🇨 SCR - Seychellois Rupee" },
  { value: "SDG", label: "🇸🇩 SDG - Sudanese Pound" },
  { value: "SEK", label: "🇸🇪 SEK - Swedish Krona" },
  { value: "SGD", label: "🇸🇬 SGD - Singapore Dollar" },
  { value: "SHP", label: "🇸🇭 SHP - Saint Helena Pound" },
  { value: "SOS", label: "🇸🇴 SOS - Somali Shilling" },
  { value: "SRD", label: "🇸🇷 SRD - Surinamese Dollar" },
  { value: "SSP", label: "🇸🇸 SSP - South Sudanese Pound" },
  { value: "STN", label: "🇸🇹 STN - São Tomé Dobra" },
  { value: "SYP", label: "🇸🇾 SYP - Syrian Pound" },
  { value: "SZL", label: "🇸🇿 SZL - Swazi Lilangeni" },
  { value: "THB", label: "🇹🇭 THB - Thai Baht" },
  { value: "TJS", label: "🇹🇯 TJS - Tajikistani Somoni" },
  { value: "TMT", label: "🇹🇲 TMT - Turkmenistani Manat" },
  { value: "TND", label: "🇹🇳 TND - Tunisian Dinar" },
  { value: "TOP", label: "🇹🇴 TOP - Tongan Paʻanga" },
  { value: "TRY", label: "🇹🇷 TRY - Turkish Lira" },
  { value: "TTD", label: "🇹🇹 TTD - Trinidad and Tobago Dollar" },
  { value: "TWD", label: "🇹🇼 TWD - New Taiwan Dollar" },
  { value: "TZS", label: "🇹🇿 TZS - Tanzanian Shilling" },
  { value: "UAH", label: "🇺🇦 UAH - Ukrainian Hryvnia" },
  { value: "UGX", label: "🇺🇬 UGX - Ugandan Shilling" },
  { value: "UYU", label: "🇺🇾 UYU - Uruguayan Peso" },
  { value: "UZS", label: "🇺🇿 UZS - Uzbekistan Som" },
  { value: "VES", label: "🇻🇪 VES - Venezuelan Bolívar" },
  { value: "VND", label: "🇻🇳 VND - Vietnamese Dong" },
  { value: "VUV", label: "🇻🇺 VUV - Vanuatu Vatu" },
  { value: "WST", label: "🇼🇸 WST - Samoan Tala" },
  { value: "XAF", label: "🇨🇫 XAF - Central African CFA Franc" },
  { value: "XCD", label: "🇰🇳 XCD - East Caribbean Dollar" },
  { value: "XOF", label: "🇸🇳 XOF - West African CFA Franc" },
  { value: "XPF", label: "🇵🇫 XPF - CFP Franc" },
  { value: "YER", label: "🇾🇪 YER - Yemeni Rial" },
  { value: "ZAR", label: "🇿🇦 ZAR - South African Rand" },
  { value: "ZMW", label: "🇿🇲 ZMW - Zambian Kwacha" }
];
const customStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    background: "#FAF8F4",
    border: "0.5px solid rgba(26,23,20,0.1)",
    borderRadius: "2px",
    fontSize: "13px",
    minHeight: "45px",
    boxShadow: "none",
    "&:hover": { borderColor: "#B5541A" },
  }),
  menu: (base) => ({
    ...base,
    background: "#FAF8F4",
    zIndex: 9999,
    borderRadius: "2px",
    border: "0.5px solid rgba(26,23,20,0.1)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#F2E8E0" : "transparent",
    color: "#1A1714",
    fontSize: "12px",
    cursor: "pointer",
    padding: "10px 15px",
  }),
};

export default function FloatingCurrency() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("LKR");
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const convert = useCallback(async () => {
    if (amount <= 0) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/currency?from=${from}&to=${to}&amount=${amount}`);
      const data = await res.json();
      if (data.result) {
        setResult(data.result);
        setRate(data.rate);
      }
    } catch (err) {
      console.error("Conversion error:", err);
    } finally {
      setLoading(false);
    }
  }, [amount, from, to]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(convert, 500);
    return () => clearTimeout(timer);
  }, [convert, open]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        .curr-display { font-family: 'Cormorant Garamond', serif; }
        .curr-body { font-family: 'Outfit', sans-serif; }
      `}} />

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-linear-to-br from-[#B5541A] to-[#8a3f12] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-2 border-white/20 group"
      >
        {open ? <X className="w-6 h-6" /> : <Banknote className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
      </button>

      {/* Converter Panel */}
      {open && (
        <div className="curr-body fixed bottom-40 right-6 w-85 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] rounded-sm border border-black/5 p-7 z-50 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="curr-display italic text-2xl text-[#1A1714] leading-none">Global <span className="font-semibold not-italic text-[#B5541A]">Rates</span></h3>
              <p className="text-[8px] uppercase tracking-[0.3em] text-gray-400 font-black mt-2">Instant Currency Converter</p>
            </div>
            <Search className="w-4 h-4 text-gray-200" />
          </div>

          <div className="space-y-6">
            {/* Amount Input */}
            <div className="relative">
              <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Amount to convert</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-[#FAF8F4] border border-black/5 p-4 rounded-xs curr-display text-3xl focus:outline-none focus:border-[#B5541A]/40 transition-colors pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#B5541A]">{from}</span>
              </div>
            </div>

            {/* Selectors */}
            <div className="space-y-3">
              <Select
                styles={customStyles}
                options={allCurrencies}
                value={allCurrencies.find((c) => c.value === from)}
                onChange={(e: any) => setFrom(e.value)}
                placeholder="From..."
              />

              <div className="flex justify-center -my-2 relative z-10">
                <button 
                  onClick={swap}
                  className="bg-white shadow-md p-2 rounded-full hover:rotate-180 transition-all duration-500 border border-gray-100 group"
                >
                  <Repeat className="w-3.5 h-3.5 text-[#B5541A] group-hover:scale-110" />
                </button>
              </div>

              <Select
                styles={customStyles}
                options={allCurrencies}
                value={allCurrencies.find((c) => c.value === to)}
                onChange={(e: any) => setTo(e.value)}
                placeholder="To..."
              />
            </div>

            {/* Result Area */}
            <div className="mt-8 p-6 bg-[#FAF8F4] border border-black/5 rounded-xs text-center min-h-27.5 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#B5541A]/20"></div>
              
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#B5541A] rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-[#B5541A] rounded-full animate-pulse delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-[#B5541A] rounded-full animate-pulse delay-150"></div>
                </div>
              ) : result !== null ? (
                <div className="animate-in fade-in duration-700">
                  <div className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-3">Converted Amount</div>
                  <div className="curr-display text-4xl font-semibold text-[#1A1714] tracking-tighter">
                    {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px] font-bold text-[#B5541A] mt-1">{to}</div>
                  
                  {rate && (
                    <div className="mt-4 pt-4 border-t border-black/5 text-[9px] text-gray-400 font-medium tracking-wider">
                      1 {from} = {rate.toFixed(4)} {to}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-[10px] text-gray-300 italic tracking-widest">Calculating...</p>
              )}
            </div>
          </div>
          
          <p className="mt-8 text-center text-[8px] text-gray-400 uppercase tracking-[0.3em] font-medium opacity-60">
            Powered by ExchangeRate-API
          </p>
        </div>
      )}
    </>
  );
}