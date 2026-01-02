"use client"; // <--- This forces it to run in the browser, bypassing server issues

import { makePage } from '@keystatic/next/ui/app';
import config from '@/keystatic.config';

export default makePage(config);