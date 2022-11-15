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
  title: "Delayed Render",
  subtitle:
    "this dapper dragonfly can cause your components to take longer to render",
  name: "Dapper Dragonfly",
  price: "$35.99",
  route: "/bug/delayed",
  component: Bug,
  order: 6
};

export default Bug;
