import { Request } from 'express';

const DEFAULT_USER = 'rahul@maha.gov';

export function currentUser(req: Request): string {
  const header = req.headers['x-user'];
  if (Array.isArray(header)) {
    return header[0] || DEFAULT_USER;
  }
  return (header as string) || DEFAULT_USER;
}
