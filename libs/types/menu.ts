export interface MenuItem {
  name: string;
  href?: string;
  children?: MenuItem[];
}

export interface Category {
  id: string;
  label?: string;
}
