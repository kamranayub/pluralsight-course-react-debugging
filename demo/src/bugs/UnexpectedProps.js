import { useState } from "react";
import { Text } from "grommet";

import Template from "./BugPageTemplate";
import CatchBugButton from "./CatchBugButton";

const Bug = () => {
  return (
    <Template bug={bug}>
      <PrayingMantis />
    </Template>
  );
};

const PrayingMantis = () => {
  const [found, setFound] = useState(false);

  return found ? (
    <CatchBugButton bug={bug} />
  ) : (
    <Text color="text-xweak">the {bug.name} is hiding...</Text>
  );
};

export const bug = {
  title: "Unexpected Props",
  subtitle:
    "this precocious praying mantis can cause components to render with props you aren't expecting",
  name: "Precocious Praying Mantis",
  price: "$26.99",
  route: "/bug/props",
  component: Bug,
};

export default Bug;
