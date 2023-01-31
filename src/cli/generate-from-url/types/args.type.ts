import { FetcherConfig } from '../args-validation/options-validation';

export interface ConfigFileOptions {
  outputPath: string;
  schemaUrl: string;
  fetcher: FetcherConfig;
  infiniteQueries: Array<string>;
}
