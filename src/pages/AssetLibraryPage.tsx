import { useEffect, useMemo, useState } from "react";

import AssetSidebar, {
  AssetSection,
} from "../components/assets/AssetSidebar";

import AssetToolbar from "../components/assets/AssetToolbar";
import AssetGrid from "../components/assets/AssetGrid";
import AssetInspector from "../components/assets/AssetInspector";

import "../components/assets/asset.css";

type CharacterAsset = {

  id:string;

  name:string;

  folder:string;

  thumbnail:string|null;

  metadata:string|null;

  reference:string[];

  poses:string[];

  expressions:string[];

  generated:string[];

};

type FolderAsset={

  id:string;

  folder:string;

};

type AssetDatabase={

  generatedAt:string;

  characters:CharacterAsset[];

  environments:FolderAsset[];

  props:FolderAsset[];

  cameras:FolderAsset[];

  sounds:FolderAsset[];

  effects:FolderAsset[];

};

export default function AssetLibraryPage(){

    const [database,setDatabase]=useState<AssetDatabase|null>(null);

    const [section,setSection]=
        useState<AssetSection>("characters");

    const [search,setSearch]=
        useState("");

    const [selected,setSelected]=
        useState("");

    async function load(){

        const r=
            await fetch(
                "http://127.0.0.1:3001/api/asset-database/scan"
            );

        setDatabase(await r.json());

    }

    useEffect(()=>{

        load();

    },[]);

    const items=useMemo(()=>{

        if(!database) return [];

        switch(section){

            case "characters":

                return database.characters.map(c=>({

                    id:c.id,

                    name:c.name,

                    description:c.folder,

                    image: c.thumbnail
                        ? "http://127.0.0.1:3001"+c.thumbnail
                        : undefined,

                    type:"Character",

                    referenceCount:c.reference.length,

                    generatedCount:c.generated.length

                }));

            case "environments":

                return database.environments.map(e=>({

                    id:e.id,

                    name:e.id,

                    description: e.folder,
					
					type:"Environment"

                }));

            case "props":

                return database.props.map(e=>({

                    id:e.id,

                    name:e.id,

                    description:e.folder,
					
					type:"Prop"

                }));

            case "cameras":

                return database.cameras.map(e=>({

                    id:e.id,

                    name:e.id,

                    description:e.folder,
					
					type:"Camera"

                }));

            case "sounds":

                return database.sounds.map(e=>({

                    id:e.id,

                    name:e.id,

                    description:e.folder,
					
					type:"Sound"

                }));

            case "effects":

                return database.effects.map(e=>({

                    id:e.id,

                    name:e.id,

                    description:e.folder,
					
					type:"Effect"

                }));

        }

    },[
        database,
        section
    ]);

    const filtered=
        (items ?? []).filter(i=>

            i.name
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )

        );

    const inspector=useMemo(()=>{

        if(
            !database ||
            section!=="characters"
        ) return null;

        return database.characters.find(

            c=>c.id===selected

        )??null;

    },[
        database,
        selected,
        section
    ]);

    return(

        <div
            style={{
                display:"flex",
                height:"100vh",
                background:"#111",
                color:"#fff"
            }}
        >

            <AssetSidebar

                section={section}

                onChange={(s: AssetSection)=>{

                    setSelected("");

                    setSection(s);

                }}

            />

            <div
                style={{
                    flex:1,
                    padding:24,
                    overflow:"auto"
                }}
            >

                <AssetToolbar

                    search={search}

                    onSearch={setSearch}

                    onScan={load}

                    onRefresh={load}

                    onOpenFolder={()=>{}}

                />

                <AssetGrid

                    items={filtered}

                    selectedId={selected}

                    onSelect={setSelected}

                />

            </div>

            <AssetInspector

                asset={inspector}

            />

        </div>

    );

}