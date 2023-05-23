import React from "react";
import { Button, Main, Box, Text, PageHeader, Heading } from "grommet";
import {
  Bug,
  Checkmark,
  StatusGood,
  StatusCritical,
  Inspect,
  Notes,
} from "grommet-icons";

import { useBugNet } from "../BugNet";
import {
  BugTestsProvider,
  useBugTestContext,
  useBugTestSummary,
} from "./tests";

import CatchBugButton from "./CatchBugButton";

const BugPageTemplate = ({ bug, children }) => {
  const { hasBug } = useBugNet();
  const [alreadyCaught, setAlreadyCaught] = React.useState(hasBug(bug.name));

  React.useEffect(() => {
    if (hasBug(bug.name)) {
      setAlreadyCaught(true);
    }
  }, [bug.name, hasBug, setAlreadyCaught]);

  return (
    <Main>
      <BugTestsProvider>
        <PageHeader
          title={bug.title}
          subtitle={bug.subtitle}
          parent={
            <Text weight="bold" color="brand">
              {bug.name}
            </Text>
          }
          pad="small"
          margin={{ top: "large" }}
        />

        {alreadyCaught ? (
          <Box align="start" pad="small">
            <Button icon={<Checkmark />} primary label="In your net" />
          </Box>
        ) : (
          <CatchBugArea bug={bug}>{children}</CatchBugArea>
        )}
      </BugTestsProvider>
    </Main>
  );
};

function CatchBugArea({ bug, children }) {
  const { ref } = useBugTestContext();
  const { passed, tests } = useBugTestSummary();

  return (
    <>
      <Box align="start" justify="center" pad="small">
        <Heading size="small">observe bug</Heading>
        <Text color="text-xweak">
          use the Dev Tools to inspect the bug below in its natural habitat.
          then, see if you can collect the required observations to catch it in
          your net!
        </Text>
      </Box>

      <Box direction="row">
        <Box
          pad="small"
          border={{
            size: "2px",
            color: passed ? "status-ok" : "status-error",
          }}
          round="small"
          margin="small"
          elevation="large"
        >
          <Box
            direction="row"
            pad={{ bottom: "xsmall" }}
            margin={{ bottom: "small" }}
            border="bottom"
          >
            <Notes />
            <Text weight="bold" margin={{ left: "xsmall" }}>
              collect observations:
            </Text>
          </Box>
          {tests.map((bugTest) => (
            <Box
              key={bugTest.label}
              margin={{ bottom: "xsmall" }}
              direction="row"
            >
              {bugTest.passed ? (
                <StatusGood color="green" />
              ) : (
                <StatusCritical color="red" />
              )}
              <Text
                color={bugTest.passed ? "green" : "red"}
                margin={{ left: "small" }}
              >
                {bugTest.label}
              </Text>
            </Box>
          ))}
          <Text margin={{ top: "small", bottom: "small" }} weight="bold">
            observation status:
          </Text>
          {passed ? (
            <CatchBugButton bug={bug} />
          ) : (
            <Box
              align="center"
              background="status-error"
              pad="small"
              round="small"
            >
              <Bug />
              <Text color="white" margin={{ top: "small" }}>
                the {bug.name} is hiding...
              </Text>
            </Box>
          )}
        </Box>
        <Box
          pad="small"
          border={{ color: "dark-6" }}
          round="small"
          margin="small"
          elevation="large"
          basis="full"
        >
          <Box
            direction="row"
            pad={{ bottom: "xsmall" }}
            margin={{ bottom: "xsmall" }}
            border="bottom"
          >
            <Inspect />
            <Text weight="bold" margin={{ left: "xsmall" }}>
              inspection area
            </Text>
          </Box>
          <Box ref={ref}>{children}</Box>
        </Box>
      </Box>
    </>
  );
}

export default BugPageTemplate;
