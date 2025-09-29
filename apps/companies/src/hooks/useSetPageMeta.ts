import { useMetaDispatchContext } from "@/context";
import { useEffect } from "react";

export function useSetPageMeta({ title }: { title: string }) {
  const metaDispatchContext = useMetaDispatchContext();

  useEffect(() => {
    metaDispatchContext!({
      type: "SET_METADATA",
      payload: {
        title,
      },
    });
  }, [title]);
}
