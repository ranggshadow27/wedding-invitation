// components/wedding/WeddingGift.tsx
import {
  Copy,
  CurrencyBtc,
  CurrencyEth,
  PaypalLogo,
  Bank,
} from "@phosphor-icons/react";
import { useState } from "react";
import { motion } from "framer-motion";

const gifts = [
  {
    id: 1,
    name: "Bitcoin",
    icon: CurrencyBtc,
    account: "1111 2222 3333 4567",
    owner: "Annisa Lutfia Putri",
  },
  {
    id: 2,
    name: "Ethereum",
    icon: CurrencyEth,
    account: "1234 5678 9012 3456",
    owner: "Annisa Lutfia Putri",
  },
  {
    id: 3,
    name: "PayPal",
    icon: PaypalLogo,
    account: "paypal.me/yourwedding",
    owner: "Rangga Tito Prayogo",
  },
  {
    id: 4,
    name: "Bank Transfer",
    icon: Bank,
    account: "1234 5678 9012 3456",
    owner: "Rangga Tito Prayogo",
  },
];

export default function WeddingGift() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="py-20 px-8 backdrop-blur-xs bg-linear-to-b from-[#CFCDC9]/10 to-[#CFCDC9]/0 font-['Montserrat']">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-['Allura'] text-[#D9D9D9] mb-6">
            Wedding Gift
          </h2>
        </motion.div>

        <motion.p
          className="text-center text-base text-[#D9D9D9] max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Kehadiran dan doa Anda sudah lebih dari cukup bagi kami. Namun jika
          ingin memberikan tanda kasih sayang, kami sangat menghargai.
        </motion.p>

        {/* Gift Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {gifts.map((gift, index) => {
            const Icon = gift.icon;
            return (
              <motion.div
                key={gift.id}
                className="border-3 border-[#D9D9D9] bg-[#D9D9D9]/20 rounded-2xl p-4 hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Icon size={25} weight="duotone" className="text-[#D9D9D9]" />
                  <h3 className="text-lg font-semibold text-[#D9D9D9]">
                    {gift.name}
                  </h3>
                </div>

                <div>
                  <div
                    onClick={() => copyToClipboard(gift.account, gift.name)}
                    className="rounded-lg pt-4 flex items-center justify-between cursor-pointer transition-all border border-transparent hover:p-4 hover:border-[#D9D9D9]/50"
                  >
                    <span className="font-mono text-xl break-all font-bold">
                      {gift.account}
                    </span>
                    <div className="text-[#D9D9D9]">
                      {copied === gift.name ? (
                        "✓"
                      ) : (
                        <Copy size={30} weight="duotone" />
                      )}
                    </div>
                  </div>

                  <p className="text-start text-sm font-mono text-[#D9D9D9]">
                    {gift.owner}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="text-base text-[#D9D9D9] border-3 border-[#D9D9D9]/50 bg-[#D9D9D9]/10 rounded-2xl p-6 font-light text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{
            y: [0, 12, 0, -4, 0], // wiggle pelan
          }}
          transition={{
            delay: 0.2,
            duration: 1.5,
            y: {
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          Terima kasih atas perhatian dan doanya 🤍
        </motion.p>
      </div>
    </div>
  );
}
