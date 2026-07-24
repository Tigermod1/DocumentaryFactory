export interface CharacterReference {
  id: string;
  fileName: string;
  filePath: string;
  type: "front" | "side" | "back" | "expression" | "pose" | "other";
}

export interface Character {
  id: string;

  name: string;

  description?: string;

  gender?: string;

  age?: string;

  ethnicity?: string;

  hair?: string;

  eyes?: string;

  skin?: string;

  clothes?: string;

  notes?: string;

  references: CharacterReference[];

  createdAt: string;

  updatedAt: string;
}

export interface CreateCharacterInput {
  name: string;

  description?: string;

  gender?: string;

  age?: string;

  ethnicity?: string;

  hair?: string;

  eyes?: string;

  skin?: string;

  clothes?: string;

  notes?: string;
}