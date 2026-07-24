import { useCallback, useEffect, useState } from "react";

import { productionRunner } from "../runtime/ProductionRunner";

import type {
  RuntimeState,
} from "../runtime/RuntimeState";

export function useProductionRuntime() {
  const [state, setState] =
    useState<RuntimeState>(
      structuredClone(
        productionRunner.state
      )
    );

  useEffect(() => {
    const unsubscribe =
      productionRunner.events.on(
        "state",
        ({ state }) => {
          setState(state);
        }
      );

    const unsubProgress =
      productionRunner.events.on(
        "progress",
        ({ state }) => {
          setState(state);
        }
      );

    const unsubStage =
      productionRunner.events.on(
        "stage",
        ({ state }) => {
          setState(state);
        }
      );

    const unsubLog =
      productionRunner.events.on(
        "log",
        ({ state }) => {
          setState(state);
        }
      );

    const unsubPreview =
      productionRunner.events.on(
        "preview",
        ({ state }) => {
          setState(state);
        }
      );

    const unsubCompleted =
      productionRunner.events.on(
        "completed",
        ({ state }) => {
          setState(state);
        }
      );

    const unsubFailed =
      productionRunner.events.on(
        "failed",
        ({ state }) => {
          setState(state);
        }
      );

    return () => {
      unsubscribe();

      unsubProgress();

      unsubStage();

      unsubLog();

      unsubPreview();

      unsubCompleted();

      unsubFailed();
    };
  }, []);

  const start = useCallback(async () => {
    await productionRunner.start();
  }, []);

  const stop = useCallback(() => {
    productionRunner.stop();
  }, []);

  const pause = useCallback(() => {
    productionRunner.pause();
  }, []);

  const resume = useCallback(() => {
    productionRunner.resume();
  }, []);

  const restart = useCallback(async () => {
    await productionRunner.restart();

    setState(
      structuredClone(
        productionRunner.state
      )
    );
  }, []);

  return {
    state,

    start,

    stop,

    pause,

    resume,

    restart,
  };
}

export default useProductionRuntime;