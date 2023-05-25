import { bug as unexpectedPropsBug } from "./UnexpectedProps";
import { bug as changingPropsBug } from "./ChangingProps";
import { bug as passingPropsBug } from "./PassingProps";
import { bug as unexpectedStateBug } from "./UnexpectedState";
import { bug as staleHooksBug } from "./StaleHooks";
import { bug as excessiveRenderBug } from "./ExcessiveRender";
import { bug as cascadingRenderBug } from "./CascadingRender";
import { bug as delayedRenderBug } from "./DelayedRender";
import { bug as longRunningRenderBug } from "./LongRunningRender";
import { bug as strictModeBugs } from "./StrictMode";

const bugs = [
  unexpectedPropsBug,
  changingPropsBug,
  passingPropsBug,
  unexpectedStateBug,
  staleHooksBug,
  excessiveRenderBug,
  cascadingRenderBug,
  delayedRenderBug,
  longRunningRenderBug,
  strictModeBugs,
];

export default bugs;
