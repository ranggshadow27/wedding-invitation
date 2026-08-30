// components/dashboard/InvitationModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Guest } from "@/types/guest";
import {
  INVITATION_TEMPLATES,
  getTimeGreeting,
} from "@/data/invitationTemplates";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Check, MessageCircle } from "lucide-react";

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: Guest | null;
}

export default function InvitationModal({
  isOpen,
  onClose,
  guest,
}: InvitationModalProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState("formal");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMessage = (templateContent: string, currentGuest: Guest) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const inviteUrl = `${origin}/invite/${currentGuest.unique_code}`;
    const timeGreeting = getTimeGreeting();

    return templateContent
      .replace(/{nama}/g, currentGuest.name)
      .replace(/{link}/g, inviteUrl)
      .replace(/{waktu}/g, timeGreeting)
      .replace(/{pax}/g, String(currentGuest.total_invited || 1));
  };

  useEffect(() => {
    if (guest && isOpen) {
      const template = INVITATION_TEMPLATES.find(
        (t) => t.id === selectedTemplateId,
      );
      if (template) {
        setMessage(generateMessage(template.content, guest));
      }
    }
  }, [guest, selectedTemplateId, isOpen]);

  const handleTemplateChange = (templateId: string | null) => {
    if (!templateId) return; // Abaikan jika bernilai null

    setSelectedTemplateId(templateId);
    if (guest) {
      const template = INVITATION_TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        setMessage(generateMessage(template.content, guest));
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleOpenWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!guest) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col overflow-y-auto font-sans p-4 sm:p-6">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-lg sm:text-xl font-bold text-foreground">
            Generate Undangan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2 flex-1 overflow-y-auto pr-1">
          <div className="space-y-2">
            <Label htmlFor="template-select" className="text-xs sm:text-sm">
              Pilih Variasi Kata-kata
            </Label>
            <Select
              value={selectedTemplateId}
              onValueChange={handleTemplateChange}
            >
              <SelectTrigger
                id="template-select"
                className="w-full text-xs sm:text-sm"
              >
                <SelectValue placeholder="Pilih Template" />
              </SelectTrigger>
              <SelectContent>
                {INVITATION_TEMPLATES.map((tmpl) => (
                  <SelectItem
                    key={tmpl.id}
                    value={tmpl.id}
                    className="text-xs sm:text-sm"
                  >
                    {tmpl.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message-preview" className="text-xs sm:text-sm">
              Pratinjau Pesan
            </Label>
            <Textarea
              id="message-preview"
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="font-sans text-xs sm:text-sm leading-relaxed bg-background min-h-45 sm:min-h-55 resize-y"
            />
          </div>
        </div>

        <DialogFooter className="shrink-0 flex-col sm:flex-row gap-2 pt-4 border-t mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCopy}
            className={`w-full sm:w-auto h-9 text-xs sm:text-sm transition-colors duration-200 ${
              copied ? "text-emerald-600 border-emerald-600/50" : ""
            }`}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-3.5 w-3.5 text-emerald-600 animate-in zoom-in-50 duration-200" />
                Teks Berhasil Disalin!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-3.5 w-3.5" />
                Salin Teks
              </>
            )}
          </Button>

          <Button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-auto h-9 text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <MessageCircle className="mr-2 h-3.5 w-3.5" />
            Buka WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
