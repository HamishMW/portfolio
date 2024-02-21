import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

import * as build from '../build/server';

export const onRequest = createPagesFunctionHandler({ build });
