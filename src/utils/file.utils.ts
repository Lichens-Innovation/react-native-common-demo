const BYTE = 1;
const KILOBYTE = 1024 * BYTE;
const MEGABYTE = 1024 * KILOBYTE;
const GIGABYTE = 1024 * MEGABYTE;

export const gigsToBytes = (gig: number) => gig * GIGABYTE;
