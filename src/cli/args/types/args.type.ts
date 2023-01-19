import { FetcherConfig } from '../options-validation';

export interface ConfigFileOptions {
  outputPath: string;
  schemaUrl: string;
  fetcher: FetcherConfig;
  infiniteQueries: Array<string>;
}
