import { Track } from "./tracker.interface";

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  audioFiles: Track[];
}
