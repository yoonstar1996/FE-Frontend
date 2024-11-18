export interface Image {
  id: number;
  alternative_slugs: {
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
    ja: string;
    ko: string;
    pt: string;
  };
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  alt_description: string;
  description: string | null;
  created_at: string;
  likes: string;
  liked_by_user: boolean;
  user: {
    id: string;
    updated_at: string;
    username?: string;
    name: string;
    first_name: string;
    profile_image: {
      large: string;
      medium: string;
      small: string;
    };
    location: string;
  };
}
