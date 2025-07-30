export interface Property {
  id: number;
  name: string;
  type: string;
  location: string;
  price: number;
  description: string;
  fullDescription: string;
  sqft: number;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface NewProperty {
  name: string;
  type: string;
  location: string;
  price: number;
  description: string;
  fullDescription?: string;
  sqft?: number;
  image?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}