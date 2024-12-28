export interface User {
  name: string;
  email: string;
  profileImageUrl?: string;
  token: string;
  data: { lat: number; lng: number }[];
}
