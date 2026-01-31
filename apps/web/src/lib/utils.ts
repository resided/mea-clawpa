import { clsx, type ClassValue } from "clsx";
export { getAbsolutionTier } from "./sins";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateVisitorId(): string {
  const stored = localStorage.getItem("meaclawpa_visitor_id");
  if (stored) return stored;

  const id = crypto.randomUUID();
  localStorage.setItem("meaclawpa_visitor_id", id);
  return id;
}

export function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return "now";
  if (seconds < 3600) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 86400) return `${Math.floor(seconds / 86400)}d`;
  return `${Math.floor(seconds / 604800)}w`;
}
