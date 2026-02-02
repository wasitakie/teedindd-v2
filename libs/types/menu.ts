export interface MenuItem {
  name: string;
  href?: string;
  children?: MenuItem[];
}

export interface Category_type {
  id: string;
  label?: string;
}

export interface Category {
  id: string;
  label?: string;
}

export interface listing {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  category_sell: string;
  category_rent: string;
  post_number: string;
  province: string;
  distarict: string;
  sub_distarict: string;
  images: string;
  price: number;
}
