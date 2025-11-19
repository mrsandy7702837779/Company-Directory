export interface Company {
  id: number;
  logo: string;
  name: string;
  industry: string;
  description: string;
  location: string;
  employees: number;
  foundedYear: number;
}

export type SortOption =
  | 'name_asc'
  | 'name_desc'
  | 'employees_asc'
  | 'employees_desc'
  | 'founded_asc'
  | 'founded_desc';
