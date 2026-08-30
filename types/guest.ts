// types/guest.ts
export interface Guest {
  id: string;
  name: string;
  slug: string;
  group_name: string;
  total_invited: number;
  unique_code: string;
  created_at: string;
}
