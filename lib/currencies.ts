import * as allCurrencies from "dinero.js";
import type { DineroCurrency } from "dinero.js";

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
}

// Map of currency codes to display info
// We include the most commonly used currencies with proper names/symbols
export const currencies: CurrencyInfo[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "QAR", name: "Qatari Riyal", symbol: "﷼" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك" },
  { code: "BHD", name: "Bahraini Dinar", symbol: "BD" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JD" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "MAD" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "TWD", name: "Taiwan Dollar", symbol: "NT$" },
  { code: "ARS", name: "Argentine Peso", symbol: "AR$" },
  { code: "CLP", name: "Chilean Peso", symbol: "CL$" },
  { code: "COP", name: "Colombian Peso", symbol: "CO$" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$U" },
  { code: "CRC", name: "Costa Rican Colon", symbol: "₡" },
  { code: "DOP", name: "Dominican Peso", symbol: "RD$" },
  { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q" },
  { code: "HNL", name: "Honduran Lempira", symbol: "L" },
  { code: "NIO", name: "Nicaraguan Cordoba", symbol: "C$" },
  { code: "PAB", name: "Panamanian Balboa", symbol: "B/." },
  { code: "PYG", name: "Paraguayan Guarani", symbol: "₲" },
  { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs." },
  { code: "ISK", name: "Icelandic Krona", symbol: "kr" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
  { code: "RSD", name: "Serbian Dinar", symbol: "din" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "сўм" },
  { code: "MNT", name: "Mongolian Tugrik", symbol: "₮" },
  { code: "KGS", name: "Kyrgyzstani Som", symbol: "сом" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "SM" },
  { code: "TMT", name: "Turkmenistani Manat", symbol: "T" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
  { code: "IQD", name: "Iraqi Dinar", symbol: "ع.د" },
  { code: "SYP", name: "Syrian Pound", symbol: "£S" },
  { code: "LBP", name: "Lebanese Pound", symbol: "L£" },
  { code: "FJD", name: "Fijian Dollar", symbol: "FJ$" },
  { code: "PGK", name: "Papua New Guinean Kina", symbol: "K" },
  { code: "WST", name: "Samoan Tala", symbol: "WS$" },
  { code: "TOP", name: "Tongan Paanga", symbol: "T$" },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "VT" },
  { code: "SBD", name: "Solomon Islands Dollar", symbol: "SI$" },
  { code: "XAF", name: "Central African CFA Franc", symbol: "FCFA" },
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA" },
  { code: "XCD", name: "East Caribbean Dollar", symbol: "EC$" },
  { code: "XPF", name: "CFP Franc", symbol: "₣" },
  { code: "TTD", name: "Trinidad and Tobago Dollar", symbol: "TT$" },
  { code: "JMD", name: "Jamaican Dollar", symbol: "J$" },
  { code: "BBD", name: "Barbadian Dollar", symbol: "Bds$" },
  { code: "BSD", name: "Bahamian Dollar", symbol: "B$" },
  { code: "BZD", name: "Belize Dollar", symbol: "BZ$" },
  { code: "GYD", name: "Guyanese Dollar", symbol: "GY$" },
  { code: "SRD", name: "Surinamese Dollar", symbol: "SRD" },
  { code: "AWG", name: "Aruban Florin", symbol: "Afl" },
  { code: "BMD", name: "Bermudian Dollar", symbol: "BD$" },
  { code: "KYD", name: "Cayman Islands Dollar", symbol: "CI$" },
  { code: "CUP", name: "Cuban Peso", symbol: "₱" },
  { code: "HTG", name: "Haitian Gourde", symbol: "G" },
  { code: "SVC", name: "Salvadoran Colon", symbol: "₡" },
  { code: "MDL", name: "Moldovan Leu", symbol: "L" },
  { code: "MKD", name: "Macedonian Denar", symbol: "ден" },
  { code: "ALL", name: "Albanian Lek", symbol: "Lek" },
  { code: "BAM", name: "Bosnia-Herzegovina Mark", symbol: "KM" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br" },
  { code: "GIP", name: "Gibraltar Pound", symbol: "£" },
  { code: "FKP", name: "Falkland Islands Pound", symbol: "FK£" },
  { code: "SHP", name: "Saint Helena Pound", symbol: "£" },
  { code: "SCR", name: "Seychellois Rupee", symbol: "₨" },
  { code: "MUR", name: "Mauritian Rupee", symbol: "₨" },
  { code: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛" },
  { code: "LAK", name: "Lao Kip", symbol: "₭" },
  { code: "BND", name: "Brunei Dollar", symbol: "B$" },
  { code: "MOP", name: "Macanese Pataca", symbol: "MOP$" },
  { code: "KPW", name: "North Korean Won", symbol: "₩" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
  { code: "SOS", name: "Somali Shilling", symbol: "Sh" },
  { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj" },
  { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk" },
  { code: "SDG", name: "Sudanese Pound", symbol: "£Sd" },
  { code: "SSP", name: "South Sudanese Pound", symbol: "SSP" },
  { code: "RWF", name: "Rwandan Franc", symbol: "RF" },
  { code: "BIF", name: "Burundian Franc", symbol: "FBu" },
  { code: "CDF", name: "Congolese Franc", symbol: "FC" },
  { code: "KMF", name: "Comorian Franc", symbol: "CF" },
  { code: "MGA", name: "Malagasy Ariary", symbol: "Ar" },
  { code: "MWK", name: "Malawian Kwacha", symbol: "MK" },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT" },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK" },
  { code: "NAD", name: "Namibian Dollar", symbol: "N$" },
  { code: "BWP", name: "Botswana Pula", symbol: "P" },
  { code: "SZL", name: "Swazi Lilangeni", symbol: "E" },
  { code: "LSL", name: "Lesotho Loti", symbol: "L" },
  { code: "LRD", name: "Liberian Dollar", symbol: "L$" },
  { code: "SLE", name: "Sierra Leonean Leone", symbol: "Le" },
  { code: "GMD", name: "Gambian Dalasi", symbol: "D" },
  { code: "GNF", name: "Guinean Franc", symbol: "FG" },
  { code: "CVE", name: "Cape Verdean Escudo", symbol: "Esc" },
  { code: "STN", name: "Sao Tome Dobra", symbol: "Db" },
  { code: "AOA", name: "Angolan Kwanza", symbol: "Kz" },
  { code: "MRU", name: "Mauritanian Ouguiya", symbol: "UM" },
  { code: "TND", name: "Tunisian Dinar", symbol: "DT" },
  { code: "LYD", name: "Libyan Dinar", symbol: "LD" },
  { code: "DZD", name: "Algerian Dinar", symbol: "DA" },
  { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu." },
  { code: "VES", name: "Venezuelan Bolivar", symbol: "Bs.S" },
];

// Lookup the dinero.js currency object by code
const currencyMap: Record<string, DineroCurrency<number>> = {};
for (const [key, value] of Object.entries(allCurrencies)) {
  if (
    value &&
    typeof value === "object" &&
    "code" in value &&
    "base" in value &&
    "exponent" in value
  ) {
    currencyMap[key] = value as DineroCurrency<number>;
  }
}

export function getDineroCurrency(code: string): DineroCurrency<number> {
  const currency = currencyMap[code];
  if (!currency) {
    // Fallback to USD-like structure
    return { code, base: 10, exponent: 2 };
  }
  return currency;
}

export function formatAmount(amount: number, currencyCode: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    }).format(amount);
  } catch {
    // If the currency code isn't recognized by Intl, fall back
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
}

export function getCurrencyExponent(currencyCode: string): number {
  return getDineroCurrency(currencyCode).exponent;
}
