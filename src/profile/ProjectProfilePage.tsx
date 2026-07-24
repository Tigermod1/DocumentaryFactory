import { useEffect, useState } from "react";

import ProjectProfileToolbar from "./ProjectProfileToolbar";
import ProjectProfileSidebar from "./ProjectProfileSidebar";
import ProjectProfileForm from "./ProjectProfileForm";

import {
  projectProfileService,
} from "./ProjectProfileService";

import type {
  ProjectProfile,
} from "./ProjectProfileTypes";

import {
  defaultProjectProfile,
} from "./ProjectProfileTypes";

import "./ProjectProfilePage.css";

export default function ProjectProfilePage() {
  const [loading, setLoading] =
    useState(false);

  const [section, setSection] =
    useState("general");

  const [profile, setProfile] =
    useState<ProjectProfile>(
      defaultProjectProfile
    );

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);

    try {
      const result =
        await projectProfileService.load();

      setProfile(result);
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile() {
    setLoading(true);

    try {
      const result =
        await projectProfileService.save(
          profile
        );

      setProfile(result);

      alert("Đã lưu Project Profile.");
    } finally {
      setLoading(false);
    }
  }

  async function resetProfile() {
    if (
      !confirm(
        "Khôi phục Project Profile mặc định?"
      )
    ) {
      return;
    }

    setLoading(true);

    try {
      const result =
        await projectProfileService.reset();

      setProfile(result);
    } finally {
      setLoading(false);
    }
  }

  async function createProfile() {
    setLoading(true);

    try {
      const result =
        await projectProfileService.create();

      setProfile(result);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="profile-page">
      <ProjectProfileSidebar
        selectedSection={section}
        onSelect={setSection}
      />

      <div className="profile-content">
        <ProjectProfileToolbar
          loading={loading}
          onSave={saveProfile}
          onReset={resetProfile}
          onCreate={createProfile}
        />

        <ProjectProfileForm
          profile={profile}
          onChange={setProfile}
        />
      </div>
    </div>
  );
}