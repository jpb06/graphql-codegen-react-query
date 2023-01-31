#!/usr/bin/env node

import { validateArguments } from './args-validation/validate-initialization-arguments';
import { initializeCodegen } from '../../workflows/initialize-codegen';
import {
  displayCodegenInitialized,
  displayException,
} from '../console/console.messages';

/* istanbul ignore file */

(async (): Promise<void> => {
  try {
    const args = validateArguments();
    await initializeCodegen(args);

    displayCodegenInitialized();
    process.exit(0);
  } catch (err) {
    displayException(err);
    process.exit(1);
  }
})();
