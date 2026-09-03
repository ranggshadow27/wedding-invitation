// components/dashboard/InvitationModal.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Check } from "lucide-react";

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: Guest | null;
  onSuccess?: () => void;
  onSharedChange?: (guestId: string, newStatus: boolean) => void; // <-- Tambahkan prop ini
}

export default function InvitationModal({
  isOpen,
  onClose,
  guest,
  onSuccess,
  onSharedChange,
}: InvitationModalProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState("formal");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [updating, setUpdating] = useState(false);

  const supabase = createClient();

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
      setIsShared(Boolean(guest.is_shared));
      const template = INVITATION_TEMPLATES.find(
        (t) => t.id === selectedTemplateId,
      );
      if (template) {
        setMessage(generateMessage(template.content, guest));
      }
    }
  }, [guest, guest?.is_shared, selectedTemplateId, isOpen]);

  const handleTemplateChange = (templateId: string | null) => {
    if (!templateId) return;

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
    toast.add({
      type: "success",
      description: "Teks undangan berhasil disalin!",
    });

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Update status is_shared langsung ke Supabase
  const handleToggleShared = async (checked: boolean) => {
    if (!guest) return;
    setUpdating(true);
    setIsShared(checked);

    // 1. Langsung update state di parent (Page) secara realtime
    if (onSharedChange) {
      onSharedChange(guest.id, checked);
    }

    // 2. Kirim update ke Supabase
    const { error } = await supabase
      .from("guests")
      .update({ is_shared: checked })
      .eq("id", guest.id);

    setUpdating(false);

    if (error) {
      // Revert state jika server gagal menyimpan
      setIsShared(!checked);
      if (onSharedChange) {
        onSharedChange(guest.id, !checked);
      }
      toast.add({
        type: "error",
        description: `Gagal memperbarui status: ${error.message}`,
      });
    } else {
      toast.add({
        type: "success",
        description: checked
          ? "Status berhasil diubah menjadi Terkirim (Done)."
          : "Status dikembalikan ke Belum Terkirim.",
      });
      if (onSuccess) onSuccess();
    }
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
          {/* Dropdown Select Template */}
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

          {/* Textarea Preview Pesan */}
          <div className="space-y-2">
            <Label htmlFor="message-preview" className="text-xs sm:text-sm">
              Pratinjau Pesan
            </Label>
            <Textarea
              id="message-preview"
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="font-sans text-xs sm:text-sm leading-relaxed bg-background min-h-45 sm:min-h-50 resize-y"
            />
          </div>

          {/* Toggle Box Mark as Done (Persis dengan di GuestModal) */}
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-xs bg-card">
            <div className="space-y-0.5">
              <Label
                htmlFor="modal_is_shared"
                className="text-xs sm:text-sm font-medium cursor-pointer"
              >
                Status Terkirim (Mark as Done)
              </Label>
              <p className="text-[11px] sm:text-xs text-muted-foreground">
                Tandai jika teks undangan ini sudah dikirimkan ke tamu.
              </p>
            </div>
            <Switch
              id="modal_is_shared"
              checked={isShared}
              disabled={updating}
              onCheckedChange={handleToggleShared}
            />
          </div>
        </div>

        {/* Footer Modal */}
        <DialogFooter className="shrink-0 flex-col-reverse sm:flex-row gap-2 pt-4 border-t mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto h-9 text-xs sm:text-sm"
          >
            Tutup
          </Button>

          <Button
            type="button"
            onClick={handleCopy}
            className={`w-full sm:w-auto h-9 text-xs sm:text-sm transition-colors duration-200 ${
              copied ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""
            }`}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-3.5 w-3.5 animate-in zoom-in-50 duration-200" />
                Teks Berhasil Disalin!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-3.5 w-3.5" />
                Salin Teks
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
