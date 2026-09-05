// The public repo this site's data lives in. Fetching data/images directly
// from raw.githubusercontent.com means new content shows up on the live site
// within a minute or two of the admin panel saving — with NO need to wait for
// a GitHub Actions rebuild + Pages redeploy (that's now only needed when the
// app's code itself changes, which is rare).
export const GITHUB_OWNER = 'flex44rmd';
export const GITHUB_REPO = 'dr-nesrin-pharmacy';
export const GITHUB_BRANCH = 'main';

// Everything under the repo's public/ folder is reachable at this base URL.
export const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/public/`;
