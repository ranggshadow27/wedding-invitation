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
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  guestToEdit?: Guest | null;
  existingGroups?: string[];
}

export default function GuestModal({
  isOpen,
  onClose,
  onSuccess,
  guestToEdit,
  existingGroups = [],
}: GuestModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [groupName, setGroupName] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const [totalInvited, setTotalInvited] = useState<number>(0);
  const [isShared, setIsShared] = useState(false);
  const [loading, setLoading] = useState(false);

  // State Combobox / Popover Group
  const [openGroupPopover, setOpenGroupPopover] = useState(false);
  const [groupSearchValue, setGroupSearchValue] = useState("");
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);

  const supabase = createClient();

  useEffect(() => {
    if (existingGroups.length > 0) {
      setAvailableGroups(existingGroups);
    } else if (isOpen) {
      const fetchGroups = async () => {
        const { data } = await supabase.from("guests").select("group_name");
        if (data) {
          const unique = Array.from(
            new Set(data.map((g) => g.group_name).filter(Boolean)),
          ) as string[];
          setAvailableGroups(unique);
        }
      };
      fetchGroups();
    }
  }, [isOpen, existingGroups, supabase]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const generateCustomUniqueCode = (slugText: string, group: string) => {
    const cleanGroup = (group.trim() || "UMUM")
      .toUpperCase()
      .replace(/[^\w]/g, "");

    const wordsFromSlug = slugText
      .trim()
      .split(/[-_]+/)
      .filter(Boolean)
      .slice(0, 3)
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      );

    const formattedSlugPart = wordsFromSlug.join("_");

    return formattedSlugPart
      ? `${cleanGroup}-${formattedSlugPart}`
      : cleanGroup;
  };

  useEffect(() => {
    if (guestToEdit) {
      setName(guestToEdit.name);
      setSlug(guestToEdit.slug || generateSlug(guestToEdit.name));
      setGroupName(guestToEdit.group_name || "");
      setUniqueCode(guestToEdit.unique_code);
      setTotalInvited(guestToEdit.total_invited ?? 0);
      setIsShared(Boolean(guestToEdit.is_shared));
    } else {
      setName("");
      setSlug("");
      setGroupName("");
      setUniqueCode("");
      setTotalInvited(0);
      setIsShared(false);
    }
  }, [guestToEdit, isOpen]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!guestToEdit) {
      const newSlug = generateSlug(val);
      setSlug(newSlug);
      setUniqueCode(generateCustomUniqueCode(newSlug, groupName));
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(val);
    if (!guestToEdit) {
      setUniqueCode(generateCustomUniqueCode(val, groupName));
    }
  };

  const handleGroupChange = (val: string) => {
    setGroupName(val);
    if (!guestToEdit) {
      setUniqueCode(generateCustomUniqueCode(slug, val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalSlug = slug.trim() || generateSlug(name);
    const finalUniqueCode =
      uniqueCode.trim() || generateCustomUniqueCode(finalSlug, groupName);

    let error;

    if (guestToEdit) {
      const payloadUpdate = {
        name,
        slug: finalSlug,
        group_name: groupName.trim(),
        total_invited: Number(totalInvited),
        unique_code: finalUniqueCode,
        is_shared: isShared,
      };

      const { error: err } = await supabase
        .from("guests")
        .update(payloadUpdate)
        .eq("id", guestToEdit.id);
      error = err;
    } else {
      const payloadInsert = {
        name,
        slug: finalSlug,
        group_name: groupName.trim(),
        total_invited: Number(totalInvited),
        unique_code: finalUniqueCode,
        is_shared: isShared,
        created_at: new Date().toISOString(),
      };

      const { error: err } = await supabase
        .from("guests")
        .insert([payloadInsert]);
      error = err;
    }

    setLoading(false);

    if (error) {
      toast.add({
        type: "error",
        description: `Gagal menyimpan data: ${error.message}`,
      });
    } else {
      toast.add({
        type: "success",
        description: guestToEdit
          ? "Data tamu berhasil diperbarui."
          : "Tamu baru berhasil ditambahkan.",
      });
      onSuccess();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md font-sans">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">
            {guestToEdit ? "Edit Data Tamu" : "Tambah Tamu Baru"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
          {/* Input Nama Tamu */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Nama Tamu</Label>
            <Input
              id="name"
              placeholder="Masukan Nama Tamu"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </div>

          {/* Input Slug */}
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug (Auto Generated)</Label>
            <Input
              id="slug"
              placeholder="nama-tamu"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              required
            />
          </div>

          {/* Combobox Dropdown + Text Input Kelompok */}
          <div className="space-y-1.5 flex flex-col">
            <Label htmlFor="group_name">Kelompok / Grup</Label>
            <Popover open={openGroupPopover} onOpenChange={setOpenGroupPopover}>
              <PopoverTrigger
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-between font-normal text-left",
                )}
              >
                {groupName ? groupName : "Pilih atau ketik kelompok baru..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </PopoverTrigger>
              <PopoverContent
                className="w-(--radix-popover-trigger-width) p-0"
                align="start"
              >
                <Command>
                  <CommandInput
                    placeholder="Cari atau ketik kelompok baru..."
                    value={groupSearchValue}
                    onValueChange={(val) => {
                      setGroupSearchValue(val);
                      handleGroupChange(val);
                    }}
                  />
                  <CommandList>
                    <CommandEmpty className="p-2 text-xs text-muted-foreground">
                      {groupSearchValue ? (
                        <div
                          className="flex items-center gap-1 cursor-pointer p-1.5 rounded hover:bg-accent text-foreground font-medium"
                          onClick={() => {
                            handleGroupChange(groupSearchValue);
                            setOpenGroupPopover(false);
                          }}
                        >
                          <Plus className="h-3.5 w-3.5 text-rose-600" />
                          Gunakan "{groupSearchValue}"
                        </div>
                      ) : (
                        "Ketik untuk membuat kelompok baru."
                      )}
                    </CommandEmpty>
                    <CommandGroup heading="Kelompok Tersedia">
                      {availableGroups.map((group) => (
                        <CommandItem
                          key={group}
                          value={group}
                          onSelect={(currentValue) => {
                            handleGroupChange(currentValue);
                            setOpenGroupPopover(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              groupName.toLowerCase() === group.toLowerCase()
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          {group}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Input Kode Unik (Read Only) */}
          <div className="space-y-1.5">
            <Label htmlFor="unique_code">Kode Unik (Read-Only)</Label>
            <Input
              id="unique_code"
              value={uniqueCode}
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed font-mono text-xs"
            />
          </div>

          {/* Input Jumlah Undangan (Min 0, Max 2, Default 0) */}
          <div className="space-y-1.5">
            <Label htmlFor="total_invited">Jumlah Undangan (Pax)</Label>
            <Input
              id="total_invited"
              type="number"
              min="0"
              max="2"
              value={totalInvited}
              onChange={(e) => setTotalInvited(Number(e.target.value))}
              required
            />
          </div>

          {/* Toggle Status Is Shared / Mark as Done */}
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-xs bg-card">
            <div className="space-y-0.5">
              <Label
                htmlFor="is_shared"
                className="text-sm font-medium cursor-pointer"
              >
                Status Terkirim (Mark as Done)
              </Label>
              <p className="text-xs text-muted-foreground">
                Tandai jika undangan sudah berhasil dibagikan ke tamu ini.
              </p>
            </div>
            <Switch
              id="is_shared"
              checked={isShared}
              onCheckedChange={setIsShared}
            />
          </div>

          <DialogFooter className="pt-3">
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
