import { useMemo, useState } from "react";

import type {
  PromptOutput,
  PromptScene,
} from "./PromptTypes";

import "./PromptPreview.css";

interface Props {
  scene: PromptScene | null;
}

export default function PromptPreview({
  scene,
}: Props) {
  const [provider, setProvider] =
    useState("flow");

  const output = useMemo(() => {
    if (!scene) {
      return null;
    }

    return scene.outputs.find(
      (item) =>
        item.provider === provider
    );
  }, [scene, provider]);

  if (!scene) {
    return (
      <div className="prompt-preview empty">
        <h2>Prompt Preview</h2>

        <p>
          Chưa có Prompt.
        </p>
      </div>
    );
  }

  return (
    <div className="prompt-preview">
      <div className="preview-header">
        <h2>
          Scene {scene.sceneNumber}
        </h2>

        <select
          value={provider}
          onChange={(e) =>
            setProvider(
              e.target.value
            )
          }
        >
          <option value="flow">
            Google Flow
          </option>

          <option value="veo">
            Google Veo
          </option>

          <option value="flux">
            Flux
          </option>

          <option value="comfyui">
            ComfyUI
          </option>

          <option value="runway">
            Runway
          </option>

          <option value="pika">
            Pika
          </option>

          <option value="luma">
            Luma
          </option>
        </select>
      </div>

      <div className="preview-info">
        <div>
          <strong>Character</strong>

          <p>
            {
              scene.subject
                .character
            }
          </p>
        </div>

        <div>
          <strong>Environment</strong>

          <p>
            {
              scene.subject
                .environment
            }
          </p>
        </div>

        <div>
          <strong>Duration</strong>

          <p>
            {scene.duration}s
          </p>
        </div>
      </div>

      <div className="prompt-block">
        <h3>
          Positive Prompt
        </h3>

        <textarea
          readOnly
          value={
            output?.positive ?? ""
          }
        />
      </div>

      <div className="prompt-block">
        <h3>
          Negative Prompt
        </h3>

        <textarea
          readOnly
          value={
            output?.negative ?? ""
          }
        />
      </div>
    </div>
  );
}