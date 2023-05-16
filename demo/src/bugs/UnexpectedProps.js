import { useState } from "react";
import { Text } from "grommet";

import Template from "./BugPageTemplate";
import CatchBugButton from "./CatchBugButton";

const Bug = () => {
  return (
    <Template bug={bug}>
      <PrayingMantis price="" />
    </Template>
  );
};

const PrayingMantis = ({ price }) => {
  const [found, setFound] = useState(false);

  if (!found) {
    return (<Text color="text-xweak">the {bug.name} is hiding...</Text>);
  }

  if (!price) {
    return (<Text color="text-xweak">the {bug.name} is priceless and can't be bought...</Text>);
  }

  if (price !== bug.price) {
    return (<Text color="text-xweak">the {bug.name} laughs at your asking price...</Text>);
  }

  return <CatchBugButton bug={{...bug, price }} />;
};

export const bug = {
  title: "Unexpected Props",
  subtitle:
    "this precocious praying mantis can cause components to render with props you aren't expecting",
  name: "Precocious Praying Mantis",
  price: "$26.99",
  route: "/bug/props",
  component: Bug,
  order: 1
};

export default Bug;
