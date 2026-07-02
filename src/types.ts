export interface SongSection {
  name: string; // "Intro", "Verse 1", "Chorus", "Bridge", etc.
  lines: string[]; // Original lyrics
  translations?: string[]; // Line-by-line English translation
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  movieOrAlbum?: string;
  year?: string;
  language: string;
  script: "Bengali" | "Latin" | "Mixed";
  vibe: string;
  tempo: string;
  about?: string;
  colorTheme: string; // Tailwind color class for gradient background elements
  sections: SongSection[];
}
