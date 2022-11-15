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
  title: "Strict Mode",
  subtitle:
    "these napping nightcrawlers can be seen in the dark with a special Strict Mode component",
  name: "Napping Nightcrawlers",
  price: "$22.99",
  route: "/bug/strict-mode",
  component: Bug,
};

export default Bug;
