#!/usr/bin/env node

import {
  displayException,
  displaySuccess,
} from '../logic/cli/console/console.messages';
import { generateFromUrl } from '../workflows/generate-from-url';
import { validateArguments } from './args/validate-url-arguments';

/* istanbul ignore file */

(async (): Promise<void> => {
  try {
    const args = validateArguments();

    const generationResult = await generateFromUrl(args);

    displaySuccess(args.outputPath, generationResult);
    process.exit(0);
  } catch (err) {
    displayException(err);
    process.exit(1);
  }
})();
