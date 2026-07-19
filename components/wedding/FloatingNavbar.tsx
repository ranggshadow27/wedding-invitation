// components/wedding/FloatingNavbar.tsx
"use client";

import { useState } from "react";
import { Compass, GiftIcon, Home, Image, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatTeardropTextIcon,
  DotsThreeIcon,
  Gift,
  House,
  ImagesSquareIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: <House size={16} weight="duotone" /> },
    {
      id: "gallery",
      label: "Gallery",
      icon: <ImagesSquareIcon size={16} weight="duotone" />,
    },
    {
      id: "rsvp",
      label: "RSVP",
      icon: <ChatTeardropTextIcon size={16} weight="duotone" />,
    },
    {
      id: "gift",
      label: "Gift",
      icon: <Gift size={16} weight="duotone" />,
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Tutup menu setelah diklik
  };

  return (
    // Posisinya diatur di bottom-22 agar berada tepat di atas Floating Audio (bottom-6)
    <div className="fixed bottom-22 right-6 z-50 flex flex-col items-end gap-2">
      {/* Menu Item yang Muncul saat Tombol Navigasi diklik */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-2 mb-1">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-end w-25 gap-2 bg-white/40 cursor-pointer hover:bg-white text-gray-800 pl-3 pr-4 py-2 rounded-full shadow-md text-xs font-semibold font-['Montserrat'] backdrop-blur-xs border border-white/10"
                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.8 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Tombol Pemicu Utama (Trigger Button) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full cursor-pointer bg-white/40 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg focus:outline-none backdrop-blur-sm border border-white/10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <XIcon className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="compass"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ListIcon className="w-6 h-6 text-gray-800/60" weight="duotone" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
