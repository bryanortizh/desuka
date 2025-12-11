import { Track } from "./tracker.interface";

export interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
  audioFiles: Track[];
}
