export interface CharacterAsset {
  id: string;
  name: string;

  description?: string;

  tags: string[];

  images: string[];

  referenceImage?: string;

  createdAt: string;
  updatedAt: string;
}

export interface EnvironmentAsset {
  id: string;
  name: string;

  description?: string;

  tags: string[];

  images: string[];

  referenceImage?: string;

  createdAt: string;
  updatedAt: string;
}

export interface LibraryData {
  characters: CharacterAsset[];
  environments: EnvironmentAsset[];
}