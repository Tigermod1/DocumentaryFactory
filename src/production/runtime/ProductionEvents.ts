import type {
  RuntimeLog,
  RuntimePreview,
  RuntimeStage,
  RuntimeState,
} from "./RuntimeState";

export type RuntimeEvent =
  | "state"
  | "stage"
  | "progress"
  | "log"
  | "preview"
  | "completed"
  | "failed";

export interface RuntimeEventPayload {
  state: RuntimeState;
}

type Listener = (
  payload: RuntimeEventPayload
) => void;

export class ProductionEvents {
  private listeners = new Map<
    RuntimeEvent,
    Set<Listener>
  >();

  on(
    event: RuntimeEvent,
    listener: Listener
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(listener);

    return () => {
      this.listeners
        .get(event)
        ?.delete(listener);
    };
  }

  emit(
    event: RuntimeEvent,
    state: RuntimeState
  ): void {
    const payload: RuntimeEventPayload = {
      state: structuredClone(state),
    };

    this.listeners
      .get(event)
      ?.forEach((listener) =>
        listener(payload)
      );

    this.listeners
      .get("state")
      ?.forEach((listener) =>
        listener(payload)
      );
  }

  clear(): void {
    this.listeners.clear();
  }
}

export function addLog(
  state: RuntimeState,
  stage: RuntimeStage,
  level: RuntimeLog["level"],
  message: string
): void {
  state.logs.push({
    id: crypto.randomUUID(),

    time: new Date().toLocaleTimeString(),

    stage,

    level,

    message,
  });
}

export function setStage(
  state: RuntimeState,
  stage: RuntimeStage
): void {
  state.stage = stage;
}

export function setProgress(
  state: RuntimeState,
  progress: number
): void {
  state.progress = Math.max(
    0,
    Math.min(100, progress)
  );
}

export function setPreview(
  state: RuntimeState,
  preview: Partial<RuntimePreview>
): void {
  state.preview = {
    ...state.preview,
    ...preview,
  };
}