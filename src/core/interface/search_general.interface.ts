export interface SearchGeneral {
  searchTerm: string;
}

export interface SearchGeneralResponse {
  id: number;
  icon: string;
  text: string;
  type: string;
  idTypeOrAlbum: string | number;
}
