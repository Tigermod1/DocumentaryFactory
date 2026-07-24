export interface ProductionOptions {
  generateImages: boolean;

  generateVideos: boolean;

  renderVideo: boolean;

  generateThumbnail: boolean;

  generateSEO: boolean;

  publish: boolean;
}

export interface ProduceRequest {
  projectId: string;

  projectName: string;

  topic: string;

  market: string;

  style: string;

  language: string;

  script: string;

  provider: string;

  options: ProductionOptions;
}

export interface ProductionStep {
  id: string;

  order: number;

  stage: string;

  status: string;

  enabled: boolean;

  message?: string;

  startedAt?: string;

  finishedAt?: string;

  durationMs?: number;
}

export interface ProduceJob {
  id: string;

  projectId: string;

  projectName: string;

  status:
    | "queued"
    | "running"
    | "completed"
    | "failed";

  progress: number;

  currentStage: string | null;

  startedAt: string;

  finishedAt?: string;

  steps: ProductionStep[];
}

export interface ProduceResponse {
  success: boolean;

  job: ProduceJob;
}

const API =
  "http://127.0.0.1:3001/api/production";

export async function startProduction(
  request: ProduceRequest
): Promise<ProduceResponse> {
  const response = await fetch(
    `${API}/start`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(request),
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Failed to start production."
    );
  }

  return data;
}

export async function getJob(
  id: string
): Promise<ProduceResponse> {
  const response = await fetch(
    `${API}/${id}`
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Failed to fetch job."
    );
  }

  return data;
}

export async function getQueue() {
  const response = await fetch(
    `${API}/queue`
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Failed to fetch queue."
    );
  }

  return data;
}

export async function cancelJob(
  id: string
): Promise<void> {
  const response = await fetch(
    `${API}/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to cancel job."
    );
  }
}