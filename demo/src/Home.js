import React from "react";
import {
  Main,
  Button,
  Box,
  Text,
  PageHeader,
  Heading,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Paragraph,
  CardFooter,
  ResponsiveContext,
} from "grommet";
import { Bug, Search } from "grommet-icons";

import { useRouter } from "./Router";

import { allBugs } from "./all-bugs";

const Index = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Main>
      <Box
        align="start"
        justify="center"
        background={{ color: "accent-1" }}
        elevation="none"
        round="small"
        margin={{ top: "large", bottom: "medium" }}
        pad={{ left: "medium", bottom: "medium" }}
        className="pageHeader-bees pageHeader-bees"
      >
        <PageHeader
          title="creepy crawly delights"
          subtitle="your one-stop shop for all your React bug needs"
        />
        <Button label="view bug of the month" primary />
      </Box>
      <Heading>shop all bugs</Heading>
      <Grid columns={size !== "small" ? "1/3" : "full"} gap="small">
        {allBugs.map((bug) => (
          <BugCard
            key={bug.name}
            title={bug.title}
            body={bug.subtitle}
            price={bug.price}
            to={bug.route}
          />
        ))}
      </Grid>
    </Main>
  );
};

const BugCard = ({ title, body, price, to }) => {
  const { push } = useRouter();

  return (
    <Card direction="column" gap="none" border={{ color: "accent-2" }}>
      <CardHeader
        align="center"
        direction="row"
        flex={false}
        justify="start"
        gap="small"
        pad="medium"
        background={{ color: "accent-2" }}
      >
        <Bug color="white" />
        <Text size="large" weight="bold" color="white">
          {title}
        </Text>
      </CardHeader>
      <CardBody pad="small" wrap={false} flex="grow">
        <Paragraph>{body}</Paragraph>
      </CardBody>
      <CardFooter
        align="center"
        direction="row"
        justify="between"
        gap="medium"
        pad="small"
        background={{ color: "background-back" }}
      >
        <Text color="accent-2" weight="bold">
          {price}
        </Text>
        <Button
          label="inspect bug"
          icon={<Search />}
          secondary={false}
          primary
          onClick={() => push(to)}
        />
      </CardFooter>
    </Card>
  );
};

export default Index;
