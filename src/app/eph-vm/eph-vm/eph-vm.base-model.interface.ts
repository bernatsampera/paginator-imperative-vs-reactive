export interface PaginatorBaseModel {
  continents: string[];
  continentsToDisplay: string[];
  pagesAvailable: number;
  searchKeys: string;
  numberOfResults: number;
  page: number;
}
