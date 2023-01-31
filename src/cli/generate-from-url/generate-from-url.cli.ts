#!/usr/bin/env node

import { validateArguments } from './args-validation/validate-url-arguments';
import { generateFromUrl } from '../../workflows/generate-from-url';
import { displayException, displaySuccess } from '../console/console.messages';

/* istanbul ignore file */

(async (): Promise<void> => {
  try {
    const args = await validateArguments();
    const generationResult = await generateFromUrl(args);

    displaySuccess(args.outputPath, generationResult);
    process.exit(0);
  } catch (err) {
    displayException(err);
    process.exit(1);
  }
})();
