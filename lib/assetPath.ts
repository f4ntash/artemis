const GITHUB_PAGES_BASE = "/corsteno";

export function withBasePath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  return `${GITHUB_PAGES_BASE}${normalized}`;
}
