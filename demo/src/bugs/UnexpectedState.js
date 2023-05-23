import { Text } from "grommet";

import Template from "./BugPageTemplate";

const Bug = () => {
  return (
    <Template bug={bug}>
      <ShySpider />
    </Template>
  );
};

const ShySpider = () => {
  return <Text color="text-xweak">the {bug.name} is hiding...</Text>;
};

export const bug = {
  title: "Unexpected State Changes",
  subtitle:
    "this shy spider can cause your component state to change unexpectedly",
  name: "Shy Spider",
  price: "$23.99",
  route: "/bug/state",
  component: Bug,
};

export default Bug;
