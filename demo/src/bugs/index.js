import { bug as unexpectedPropsBug } from "./UnexpectedPropTypes";
import { bug as changingPropsBug } from "./ChangingProps";
import { bug as passingPropsBug } from "./PassingProps";
import { bug as unexpectedStateBug } from "./UnexpectedState";
import { bug as hookSideEffectsBug } from "./HookSideEffects";
import { bug as delayedRenderBug } from "./DelayedRender";
import { bug as conditionalRenderBug } from "./ConditionalRender";
import { bug as cascadingRenderBug } from "./CascadingRender";
import { bug as excessiveRenderBug } from "./ExcessiveRender";
import { bug as contextRenderBug } from "./ContextRender";
import { bug as transitionBug } from "./Transitions";
import { bug as longRunningRenderBug } from "./LongRunningRender";
import { bug as strictModeBugs } from "./StrictMode";

const bugs = [
  unexpectedPropsBug,
  changingPropsBug,
  passingPropsBug,
  unexpectedStateBug,
  hookSideEffectsBug,
  strictModeBugs,
  delayedRenderBug,
  conditionalRenderBug,
  cascadingRenderBug,
  excessiveRenderBug,
  contextRenderBug,
  transitionBug,
  longRunningRenderBug,
];

export default bugs;
