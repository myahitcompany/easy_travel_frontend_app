import { useSetPageMeta } from "@/hooks";
import React from "react";

export function CompaniesPage() {
  useSetPageMeta({
    title: "Compagnies",
  });
  return <div>Hello companies</div>;
}
