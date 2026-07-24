import { ChangeEvent } from "react";

import type {
  ProjectProfile,
} from "./ProjectProfileTypes";

import "./ProjectProfileForm.css";

interface Props {
  profile: ProjectProfile;

  onChange: (
    profile: ProjectProfile
  ) => void;
}

export default function ProjectProfileForm({
  profile,
  onChange,
}: Props) {
  function update<
    T extends keyof ProjectProfile
  >(
    section: T,
    key: keyof ProjectProfile[T],
    value: unknown
  ) {
    onChange({
      ...profile,

      [section]: {
        ...profile[section],

        [key]: value,
      },
    });
  }

  return (
    <div className="project-profile-form">
      <h2>Project Profile</h2>

      <section>
        <h3>📁 Tổng quan</h3>

        <label>
          Tên dự án

          <input
            value={
              profile.general.projectName
            }
            onChange={(
              e: ChangeEvent<HTMLInputElement>
            ) =>
              update(
                "general",
                "projectName",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Mô tả

          <textarea
            value={
              profile.general.description
            }
            onChange={(
              e
            ) =>
              update(
                "general",
                "description",
                e.target.value
              )
            }
          />
        </label>
      </section>

      <section>
        <h3>🌐 Giao diện</h3>

        <label>
          Ngôn ngữ

          <select
            value={
              profile.workspace.language
            }
            onChange={(e) =>
              update(
                "workspace",
                "language",
                e.target.value
              )
            }
          >
            <option value="vi">
              Tiếng Việt
            </option>

            <option value="en">
              English
            </option>
          </select>
        </label>

        <label>
          Theme

          <select
            value={
              profile.workspace.theme
            }
            onChange={(e) =>
              update(
                "workspace",
                "theme",
                e.target.value
              )
            }
          >
            <option value="dark">
              Dark
            </option>

            <option value="light">
              Light
            </option>

            <option value="system">
              System
            </option>
          </select>
        </label>
      </section>

      <section>
        <h3>🎯 Thị trường</h3>

        <label>
          Quốc gia

          <select
            value={
              profile.market
                .targetMarket
            }
            onChange={(e) =>
              update(
                "market",
                "targetMarket",
                e.target.value
              )
            }
          >
            <option value="us">
              United States
            </option>

            <option value="jp">
              Japan
            </option>

            <option value="kr">
              Korea
            </option>

            <option value="de">
              Germany
            </option>

            <option value="fr">
              France
            </option>

            <option value="vn">
              Việt Nam
            </option>
          </select>
        </label>

        <label>
          Ngôn ngữ video

          <input
            value={
              profile.market
                .outputLanguage
            }
            onChange={(e) =>
              update(
                "market",
                "outputLanguage",
                e.target.value
              )
            }
          />
        </label>
      </section>

      <section>
        <h3>🤖 AI</h3>

        <label>
          LLM

          <select
            value={profile.ai.llm}
            onChange={(e) =>
              update(
                "ai",
                "llm",
                e.target.value
              )
            }
          >
            <option value="anthropic">
              Claude
            </option>

            <option value="openai">
              OpenAI
            </option>

            <option value="google">
              Gemini
            </option>
          </select>
        </label>

        <label>
          Image Model

          <select
            value={
              profile.ai.imageModel
            }
            onChange={(e) =>
              update(
                "ai",
                "imageModel",
                e.target.value
              )
            }
          >
            <option value="flow">
              Google Flow
            </option>

            <option value="flux">
              Flux
            </option>

            <option value="comfyui">
              ComfyUI
            </option>
          </select>
        </label>

        <label>
          Video Model

          <select
            value={
              profile.ai.videoModel
            }
            onChange={(e) =>
              update(
                "ai",
                "videoModel",
                e.target.value
              )
            }
          >
            <option value="veo">
              Google Veo
            </option>

            <option value="runway">
              Runway
            </option>

            <option value="luma">
              Luma
            </option>

            <option value="pika">
              Pika
            </option>
          </select>
        </label>
      </section>

      <section>
        <h3>🎬 Video</h3>

        <label>
          Tỷ lệ

          <select
            value={
              profile.video
                .aspectRatio
            }
            onChange={(e) =>
              update(
                "video",
                "aspectRatio",
                e.target.value
              )
            }
          >
            <option>
              16:9
            </option>

            <option>
              9:16
            </option>

            <option>
              1:1
            </option>

            <option>
              4:5
            </option>
          </select>
        </label>

        <label>
          Resolution

          <select
            value={
              profile.video
                .resolution
            }
            onChange={(e) =>
              update(
                "video",
                "resolution",
                e.target.value
              )
            }
          >
            <option>
              1920x1080
            </option>

            <option>
              2560x1440
            </option>

            <option>
              3840x2160
            </option>
          </select>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={
              profile.video
                .hardSubtitle
            }
            onChange={(e) =>
              update(
                "video",
                "hardSubtitle",
                e.target.checked
              )
            }
          />

          Phụ đề cứng
        </label>
      </section>
    </div>
  );
}