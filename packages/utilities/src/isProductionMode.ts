import { Logger } from ".";

export const isProductionModeFunc = ({ log }: { log?: boolean }): boolean => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    log === undefined || log === false ? null : Logger.big("DEVELOPMENT MODE");
    return false;
  } else {
    log === undefined || log === false ? null : Logger.big("DEVELOPMENT MODE");
    return true;
  }
};
