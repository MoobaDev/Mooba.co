import { Project } from "@/types/Proyecto";

export interface HighlightedProject {
  id: number;
  documentId: string;
  projectName: string;
  proyecto: Project;
}