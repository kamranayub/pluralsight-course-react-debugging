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
  title: "Stale Hooks",
  subtitle:
    "this huggable honeybee can cause your hooks not to render when they should be",
  name: "Hubbagle Honeybee",
  price: "$8.99",
  route: "/bug/hooks",
  component: Bug,
  order: 3
};

export default Bug;
