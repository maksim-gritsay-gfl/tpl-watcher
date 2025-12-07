export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  watcherSendTo: string;
  watcherSleepMins: number;

  // frontendDomain?: string;
  // backendDomain: string;
  port: number;
  apiPrefix: string;
  fallbackLanguage: string;
  headerLanguage: string;
};
