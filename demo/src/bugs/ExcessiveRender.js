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
  title: "Excessive Render",
  subtitle:
    "this extravagant emerald ash borer can cause a component to re-render too much",
  name: "Extravagant Emerald Ash Borer",
  price: "$1099.99",
  route: "/bug/excessive",
  component: Bug,
};

export default Bug;
