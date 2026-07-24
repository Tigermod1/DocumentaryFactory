import fs from "fs";
import path from "path";

import type {

    AssetDatabase,

    CharacterAsset,

    EnvironmentAsset,

    PropAsset,

    CameraAsset,

    SoundAsset,

    EffectAsset

} from "./types.js";

const ROOT = path.resolve(
    process.cwd(),
    "../Assets"
);

function exists(dir: string) {

    return fs.existsSync(dir);

}

function dirs(root: string) {

    if (!exists(root)) return [];

    return fs.readdirSync(root, {

        withFileTypes: true

    })

    .filter(i => i.isDirectory())

    .map(i => i.name);

}

function files(root: string) {

    if (!exists(root)) return [];

    return fs.readdirSync(root)

    .filter(file =>

        /\.(png|jpg|jpeg|webp)$/i.test(file)

    );

}

function firstImage(root: string) {

    const f = files(root);

    if (!f.length) return null;

    return f[0];

}

function scanCharacters(): CharacterAsset[] {

    const root = path.join(ROOT, "Characters");

    return dirs(root).map(name => {

        const folder = path.join(root, name);

        const referenceDir = path.join(folder, "reference");
        const metadataDir = path.join(folder, "metadata");
        const posesDir = path.join(folder, "poses");
        const expressionsDir = path.join(folder, "expressions");
        const generatedDir = path.join(folder, "generated");

        const thumb = firstImage(referenceDir);

        const metadataFile =
            exists(metadataDir)
                ? fs.readdirSync(metadataDir)
                    .find(f => /\.json$/i.test(f)) ?? null
                : null;

        return {

            id: name,

            name,

            folder,

            thumbnail: thumb
                ? `/Assets/Characters/${name}/reference/${thumb}`
                : null,

            metadata: metadataFile
                ? `/Assets/Characters/${name}/metadata/${metadataFile}`
                : null,

            reference: files(referenceDir).map(file =>
                `/Assets/Characters/${name}/reference/${file}`
            ),

            poses: files(posesDir).map(file =>
                `/Assets/Characters/${name}/poses/${file}`
            ),

            expressions: files(expressionsDir).map(file =>
                `/Assets/Characters/${name}/expressions/${file}`
            ),

            generated: files(generatedDir).map(file =>
                `/Assets/Characters/${name}/generated/${file}`
            )

        };

    });

}

function scanSimpleFolder<T extends { id: string; folder: string }>(
    folderName: string
): T[] {

    const root = path.join(ROOT, folderName);

    return dirs(root).map(name => ({
        id: name,
        folder: path.join(root, name)
    } as T));

}

export function scanAssets(): AssetDatabase {

    return {

        generatedAt: new Date().toISOString(),

        characters: scanCharacters(),

        environments: scanSimpleFolder<EnvironmentAsset>("Environments"),

        props: scanSimpleFolder<PropAsset>("Props"),

        cameras: scanSimpleFolder<CameraAsset>("Cameras"),

        sounds: scanSimpleFolder<SoundAsset>("Sounds"),

        effects: scanSimpleFolder<EffectAsset>("Effects")

    };

}