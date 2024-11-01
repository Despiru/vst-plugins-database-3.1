export interface Plugin {
  id?: number;
  name: string;
  category: 'effects' | 'synth' | 'processing';
  description: string;
  downloadUrl: string;
  tags: string[];
  source?: 'local' | 'telegram' | 'rutracker';
  sourceUrl?: string;
}

export interface SearchResult {
  name: string;
  description: string;
  downloadUrl: string;
  source: 'telegram' | 'rutracker';
  sourceUrl: string;
}

declare global {
  interface Window {
    electronAPI: {
      savePlugin: (plugin: Plugin) => Promise<Plugin[]>;
      getPlugins: () => Promise<Plugin[]>;
      deletePlugin: (pluginId: number) => Promise<Plugin[]>;
      searchPlugins: (query: string) => Promise<SearchResult[]>;
    }
  }
}