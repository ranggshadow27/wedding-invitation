// components/wedding/WeddingGift.tsx
import { CurrencyBtcIcon } from "@phosphor-icons/react";
import { Copy, Gift } from "lucide-react";

const gifts = [
  {
    id: 1,
    name: "Bitcoin",
    icon: "₿",
    account: "bc1qxy2kdyk9...example",
    owner: "Aisyah Putri & Ahmad Rafi",
  },
  {
    id: 2,
    name: "Ethereum",
    icon: "⟠",
    account: "0x742d35Cc...example",
    owner: "Aisyah Putri & Ahmad Rafi",
  },
  {
    id: 3,
    name: "PayPal",
    icon: "💰",
    account: "paypal.me/yourname",
    owner: "Aisyah Putri & Ahmad Rafi",
  },
  {
    id: 4,
    name: "Bank Transfer",
    icon: "🏦",
    account: "1234 5678 9012 3456",
    owner: "Aisyah Putri & Ahmad Rafi",
  },
];

export default function WeddingGift() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Nomor rekening berhasil disalin!");
  };

  return (
    <div className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-['Allura'] text-rose-700 mb-6">
          Wedding Gift
        </h2>

        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-16">
          Kehadiran dan doa Anda sudah lebih dari cukup bagi kami. Namun jika
          Bapak/Ibu ingin memberikan tanda kasih sayang, kami sangat menghargai.
        </p>

        {/* Gift Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-all"
            >
              <div className="text-5xl mb-6">
                <CurrencyBtcIcon size={32} weight="duotone" />
              </div>
              <h3 className="text-2xl font-semibold mb-1">{gift.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{gift.owner}</p>

              <div className="bg-white rounded-2xl p-4 text-left font-mono text-sm flex items-center justify-between group">
                <span className="font-medium">{gift.account}</span>
                <button
                  onClick={() => copyToClipboard(gift.account)}
                  className="text-rose-600 hover:text-rose-700 p-2 rounded-xl hover:bg-rose-50 transition-colors"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xl text-gray-600 font-light">
          Terima kasih atas perhatian dan doanya 🤍
        </p>
      </div>
    </div>
  );
}
