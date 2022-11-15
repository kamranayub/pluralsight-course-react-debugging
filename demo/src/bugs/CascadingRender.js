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
  title: "Cascading Render",
  subtitle:
    "this cuddly caterpillar will cause child components to render when the parent does",
  name: "Cuddly Caterpillar",
  price: "$11.99",
  route: "/bug/cascading",
  component: Bug,
  order: 5
};

export default Bug;
