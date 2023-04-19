#!/usr/bin/env node

import { exec } from 'child_process';

import { validateArguments } from './args-validation/validate-url-arguments';
import { generateFromUrl } from '../../workflows/generate-from-url';
import { displayException, displaySuccess } from '../console/console.messages';

/* istanbul ignore file */

(async (): Promise<void> => {
  try {
    const args = await validateArguments();
    const generationResult = await generateFromUrl(args);

    exec(
      `npx rome format ${args.outputPath} --write --quote-style single --semicolons always --indent-size 2 --indent-style space`,
    );

    displaySuccess(args.outputPath, generationResult);
    process.exit(0);
  } catch (err) {
    displayException(err);
    process.exit(1);
  }
})();
