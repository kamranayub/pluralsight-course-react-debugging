import * as allBugData from "./bugs";

export const allBugs = Object.values(allBugData).sort((a, b) =>
  a.order === b.order ? 0 : a.order > b.order ? 1 : -1
);
