// data/invitationTemplates.ts

export interface Template {
  id: string;
  label: string;
  content: string;
}

// Helper untuk menentukan salam waktu lokal
export const getTimeGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 3 && hour < 11) return "Pagi";
  if (hour >= 11 && hour < 15) return "Siang";
  if (hour >= 15 && hour < 18) return "Sore";
  return "Malam";
};

export const INVITATION_TEMPLATES: Template[] = [
  {
    id: "formal",
    label: "Formal / Orang Tua & VIP",
    content: `Kepada Yth.
Bapak/Ibu/Saudara/i {nama}
di Tempat

Assalamu’alaikum Wr. Wb. / Selamat {waktu},

Tanpa mengurangi rasa hormat, berhubung keterbatasan jarak dan waktu, melalui pesan ini kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk dapat hadir dan memberikan doa restu pada acara pernikahan kami.

💍 *The Wedding of Annisa & Rangga*
Detail informasi mengenai lokasi dan jadwal acara dapat diakses melalui tautan undangan digital berikut:

🔗 Link Undangan : 
*{link}*

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.

Mohon maaf atas keterbatasan penyampaian undangan ini. Terima kasih.

Wassalamu’alaikum Wr. Wb.`,
  },
  {
    id: "casual",
    label: "Santai / Teman & Sahabat",
    content: `Halo {nama}! 👋

Selamat {waktu}! Semoga sehat bahagia selalu ya.

Hari pernikahan kami akan segera tiba, oleh karenanya kami ingin mengundang untuk datang dan merayakan hari bahagia kami! 🎉

💍 *The Wedding of Annisa & Rangga*
Untuk info detail acara dan lokasinya sebagai berikut,

🔗 Link Undangan : 
*{link}*

Kehadiran dan doa restumu bakal berharga banget buat kami. See you! 🙌`,
  },
  {
    id: "singkat",
    label: "Versi Singkat (Direct Link)",
    content: `Selamat {waktu} {nama}, kami mengundang Anda untuk hadir di acara pernikahan kami. Informasi lengkap dan konfirmasi RSVP dapat dilihat pada tautan berikut:

💍 *The Wedding of Annisa & Rangga*

{link}

Terima kasih!`,
  },
];
