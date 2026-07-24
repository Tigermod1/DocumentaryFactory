import { useEffect, useMemo, useState } from "react";

import LibrarySidebar from "../components/library/LibrarySidebar";
import type { LibrarySection } from "../components/library/LibrarySidebar";

import LibraryToolbar from "../components/library/LibraryToolbar";
import LibraryGrid from "../components/library/LibraryGrid";
import UploadReference from "../components/library/UploadReference";

type AssetItem = {
  id: string;
  name: string;
  description: string;
  image?: string;
};

type CharacterAsset = {
  id: string;
  name: string;
  folder: string;

  thumbnail: string | null;

  metadata: string | null;

  reference: string[];

  poses: string[];

  expressions: string[];

  generated: string[];
};

type FolderAsset = {
  id: string;
  folder: string;
};

type AssetDatabase = {
  generatedAt: string;

  characters: CharacterAsset[];

  environments: FolderAsset[];

  props: FolderAsset[];

  cameras: FolderAsset[];

  sounds: FolderAsset[];

  effects: FolderAsset[];
};

export default function LibraryPage() {

  const [section, setSection] =
    useState<LibrarySection>("characters");

  const [search, setSearch] = useState("");

  const [selected, setSelected] =
    useState("");

  const [characters, setCharacters] =
    useState<AssetItem[]>([]);

  const [environments, setEnvironments] =
    useState<AssetItem[]>([]);

  useEffect(() => {

    async function load() {

      const response = await fetch(
        "http://127.0.0.1:3001/api/asset-database/scan"
      );

      const data: AssetDatabase =
        await response.json();

      setCharacters(

        data.characters.map(c => ({

          id: c.id,

          name: c.name,

          description: c.folder,

          image: c.thumbnail
            ? "http://127.0.0.1:3001" + c.thumbnail
            : undefined

        }))

      );

      setEnvironments(

        data.environments.map(e => ({

          id: e.id,

          name: e.id,

          description: e.folder

        }))

      );

    }

    load().catch(console.error);

  }, []);

  const items = useMemo(() => {

    const source =
      section === "characters"
        ? characters
        : environments;

    return source.filter(item =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [
    section,
    search,
    characters,
    environments
  ]);

  return (

    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#111",
        color: "#fff"
      }}
    >

      <LibrarySidebar
        section={section}
        onChange={setSection}
      />

      <div
        style={{
          flex: 1,
          padding: 24,
          overflow: "auto"
        }}
      >

        <LibraryToolbar
          search={search}
          onSearch={setSearch}
          onAddCharacter={() => {}}
          onAddEnvironment={() => {}}
        />

        <UploadReference
          title={
            section === "characters"
              ? "Reference Images"
              : "Environment References"
          }
        />

        <LibraryGrid
          type={
            section === "characters"
              ? "character"
              : "environment"
          }
          items={items}
          selectedId={selected}
          onSelect={setSelected}
        />

      </div>

    </div>

  );

}