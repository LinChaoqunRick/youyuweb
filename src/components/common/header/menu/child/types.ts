export interface NavLink {
  path: string;
  title: string;
  exact?: boolean;
  children?: NavLink[];
}
