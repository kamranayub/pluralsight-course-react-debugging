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
  title: "Long-Running Render",
  subtitle:
    "this lovable ladybug can cause renders to take a long time to render",
  name: "Lovable Ladybug",
  price: "$13.99",
  route: "/bug/long-running",
  component: Bug,
};

export default Bug;
