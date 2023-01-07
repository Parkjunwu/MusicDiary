import SrcApps from "./src/Apps"
import * as Sentry from "@sentry/react-native";
import Config from "react-native-config";

Sentry.init({
  dsn: Config.SENTRY_URL,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

export default process.env.NODE_ENV==="production" ? Sentry.wrap(SrcApps) : SrcApps;