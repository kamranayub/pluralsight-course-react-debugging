import React from "react";
import {
  Button,
  Page,
  PageContent,
  Box,
  Text,
  PageHeader,
  Heading,
} from "grommet";
import { Checkmark } from "grommet-icons";

import AppHeader from "../components/AppHeader";
import { useBugNet } from "../BugNet";

const BugPageTemplate = ({ bug, children }) => {
  const { hasBug } = useBugNet();
  const [alreadyCaught, setAlreadyCaught] = React.useState(hasBug(bug.name));

  React.useEffect(() => {
    if (hasBug(bug.name)) {
      setAlreadyCaught(true);
    }
  }, [bug.name, hasBug, setAlreadyCaught]);

  return (
    <Page>
      <PageContent>
        <AppHeader />
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
          <>
            <Box align="start" justify="center" pad="small">
              <Heading size="small">observe bug</Heading>
              <Text color="text-xweak">
                use the Dev Tools to inspect the bug below in its natural
                habitat. then, see if you can fix it to catch it in your net!
              </Text>
            </Box>
            <Box
              align="center"
              justify="center"
              pad="small"
              border={{ color: "dark-6" }}
              round="small"
              margin="small"
              elevation="large"
            >
              {children}
            </Box>
          </>
        )}
      </PageContent>
    </Page>
  );
};

export default BugPageTemplate;
