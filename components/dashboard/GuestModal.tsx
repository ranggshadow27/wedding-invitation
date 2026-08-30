// components/dashboard/GuestModal.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Guest } from "@/types/guest";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  guestToEdit?: Guest | null;
}

export default function GuestModal({
  isOpen,
  onClose,
  onSuccess,
  guestToEdit,
}: GuestModalProps) {
  const [name, setName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [totalInvited, setTotalInvited] = useState(1);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (guestToEdit) {
      setName(guestToEdit.name);
      setGroupName(guestToEdit.group_name || "");
      setTotalInvited(guestToEdit.total_invited || 1);
    } else {
      setName("");
      setGroupName("");
      setTotalInvited(1);
    }
  }, [guestToEdit, isOpen]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = generateSlug(name);
    // Membuat kode unik singkat jika tambah tamu baru
    const uniqueCode = guestToEdit
      ? guestToEdit.unique_code
      : `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      name,
      slug,
      group_name: groupName,
      total_invited: Number(totalInvited),
      unique_code: uniqueCode,
    };

    let error;

    if (guestToEdit) {
      const { error: err } = await supabase
        .from("guest")
        .update(payload)
        .eq("id", guestToEdit.id);
      error = err;
    } else {
      const { error: err } = await supabase.from("guest").insert([payload]);
      error = err;
    }

    setLoading(false);

    if (error) {
      alert("Gagal menyimpan data: " + error.message);
    } else {
      onSuccess();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {guestToEdit ? "Edit Data Tamu" : "Tambah Tamu Baru"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Tamu</Label>
            <Input
              id="name"
              placeholder="Contoh: Budi Santoso & Partner"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="group_name">Kelompok / Grup</Label>
            <Input
              id="group_name"
              placeholder="Contoh: Teman SMA / VIP / Keluarga"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="total_invited">Jumlah Undangan (Pax)</Label>
            <Input
              id="total_invited"
              type="number"
              min="1"
              value={totalInvited}
              onChange={(e) => setTotalInvited(Number(e.target.value))}
              required
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
