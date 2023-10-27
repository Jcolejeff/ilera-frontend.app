export type planTypes = 'starter' | 'student' | 'professional' | 'master';

export type routePathTypes =
  | 'about'
  | 'blogs'
  | 'faqs'
  | ''
  | 'login'
  | 'create-account'
  | 'select-plan'
  | 'pricing'
  | 'assets-templates'
  | 'bootcamps'
  | 'bts'
  | 'consultancy'
  | 'cv-profile'
  | 'general-forums'
  | 'master-classes'
  | 'my-assistants'
  | 'online-training'
  | 'professional-forums'
  | 'service-ad'
  | 'chat'
  | 'subscriptions'
  | 'logout'
  | 'hire-talent'
  | 'reset-password'
  | 'forgot-password'
  | 'verify-email'
  | 'new-password'
  | 'privacy-policy'
  | 'dashboard'
  | 'profile'
  | 'visits'
  | 'patients'
  | 'appointment'
  | 'settings'
  | 'consultation'
  | 'billing'
  | 'inventory'
  | 'reports'
  | 'laboratory'
  | 'create-patient';

export interface routesInterface<T> {
  path: T;
  element: JSX.Element;
  plan: planTypes;
}

export type routeTypes = routesInterface<routePathTypes>[];

export interface RouteGuardInterface {
  plan: planTypes;
}

export interface ItitleLinks<T, L> {
  title: T;
  link: L;
}

export interface apiInterface<T> {
  items: T;
  next_page: number;
  page: number;
  previous_page: number;
  size: number;
  total: number;
}

export interface apiInterfaceV2<T> {
  data: T;
  message: string;
}

export interface contentApiItemInterface {
  content: string;
  date_created: string;
  id: string;
  is_deleted: boolean;
  last_updated: string;
  meta_description: string;
  content_author: {
    email: string;
    first_name: string;
    last_name: string;
  };
  photos: {
    filename: string;
    id: string;
    is_public: boolean;
    url: string;
  }[];
  subtitle: string;
  title: string;
}

export interface authDetailsInterface {
  access?: string;
  data?: {
    biz_partner_id?: string;
    first_name?: string;
    last_name?: string;
    oragnization_id?: string;
  };
  refresh?: string;
}

export interface productInterface {
  name: string;
  description: string;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  previous_url_slugs: any;
  id: string;
  parent_product_id: string;
  parent: string;
  organization_id: string;
  stock_id: string;
  product_image: Array<any>;
  categories: Array<string>;
  date_created: string;
  last_updated: string;
  user_id: string;
  photos: Array<{
    model_name: string;
    model_id: string;
    organization_id: string;
    url: string;
    is_featured: boolean;
    save_as_jpg: boolean;
    is_public: boolean;
    file_rename: boolean;
    position: number;
  }>;
  prices: Array<{
    name: string;
    product_id: string;
    stock_id: string;
    price: number;
    discounted_price: number;
    currency_code: string;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    customer_group: string;
    id: string;
    start: string;
    end: string;
    user_id: string;
    date_created: string;
    last_updated: string;
  }>;
  stocks: Array<{
    name: string;
    quantity: number;
    buying_price: number;
    currency_code: string;
    supplier_id: string;
    buying_date: string;
    id: string;
    product_id: string;
    status: string;
    user_id: string;
    date_created: string;
    original_quantity: number;
    supplier: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      business_name: string;
    };
  }>;
  current_price: string;
  is_deleted: boolean;
  available_quantity: number;
  selling_price: number;
  discounted_price: number;
  buying_price: number;
  extra_infos: Array<{
    id: string;
    key: string;
    value: string;
    value_dt: string;
  }>;
  featured_reviews: Array<string>;
  unavailability: string;
}
