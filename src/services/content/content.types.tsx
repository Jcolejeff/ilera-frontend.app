export interface getContentInterface {
  organization_id: string;
  page?: number;
  size?: number;
  search_value?: string;
  category: string;
}

export interface getSingleContentInterface {
  id?: string;
  organization_id: string;
}
