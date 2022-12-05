#!/usr/bin/env node

/* istanbul ignore file */

import { validateArguments } from '../../cli/args/validate-url-arguments';
import { generateFromUrl } from '../../workflows/generate-from-url';
import { displayError, displaySuccess } from './console/console.messages';

(async (): Promise<void> => {
  try {
    const args = validateArguments();

    const generationResult = await generateFromUrl(args);

    displaySuccess(args.outputPath, generationResult);
    process.exit(0);
  } catch (err) {
    displayError(err);
    process.exit(1);
  }
})();
