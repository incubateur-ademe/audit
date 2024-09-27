import { init, push } from "@socialgouv/matomo-next";

// TODO: Replace with  Matomo URL and site ID when available
const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL as string;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID as string;
const IS_DEV = process.env.NODE_ENV !== "production";

export namespace MatomoService {
  export function initialize() {
    if (IS_DEV) {
      return;
    }
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID, disableCookies: true });
  }
  export function trackClick(action: string) {
    push(["trackEvent", action, "click"]);
  }
}

