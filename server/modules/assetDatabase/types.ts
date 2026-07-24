export interface CharacterAsset {

    id: string;

    name: string;

    folder: string;

    thumbnail: string | null;

    metadata: string | null;

    reference: string[];

    poses: string[];

    expressions: string[];

    generated: string[];

}

export interface EnvironmentAsset {

    id: string;

    folder: string;

}

export interface PropAsset {

    id: string;

    folder: string;

}

export interface CameraAsset {

    id: string;

    folder: string;

}

export interface SoundAsset {

    id: string;

    folder: string;

}

export interface EffectAsset {

    id: string;

    folder: string;

}

export interface AssetDatabase {

    generatedAt: string;

    characters: CharacterAsset[];

    environments: EnvironmentAsset[];

    props: PropAsset[];

    cameras: CameraAsset[];

    sounds: SoundAsset[];

    effects: EffectAsset[];

}