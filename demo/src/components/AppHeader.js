import React from "react";
import {
  Header,
  Button,
  Box,
  List,
  Layer,
  Text,
  TextInput,
  Nav,
} from "grommet";
import { FormSearch, FormClose, User, Cart, Bug } from "grommet-icons";

import { useRouter } from "../Router";
import { useBugNet } from "../BugNet";
import { allBugs } from "../all-bugs";

const AppHeader = () => {
  const { push } = useRouter();
  const { count } = useBugNet();

  const goToBug = React.useCallback(
    (e) => {
      const bug = e.suggestion.value;
      push(bug.route);
    },
    [push]
  );

  const [isBugDrawerOpen, setIsBugDrawerOpen] = React.useState(false);

  return (
    <>
      <Header
        align="center"
        direction="row"
        flex={false}
        justify="start"
        gap="medium"
        margin={{ top: "medium" }}
        wrap={false}
      >
        <Button
          icon={<Bug color="brand" />}
          hoverIndicator
          onClick={() => push("/")}
          label={
            <Text size="large" weight="bold">
              react bug emporium
            </Text>
          }
          plain
        />
        <Box
          align="center"
          justify="center"
          flex="grow"
          gap="none"
          margin={{ left: "medium" }}
        >
          <TextInput
            icon={<FormSearch />}
            placeholder="find a bug buddy..."
            suggestions={allBugs.map((b) => ({
              label: `${b.title} (${b.name})`,
              value: b,
            }))}
            onSuggestionSelect={goToBug}
          />
        </Box>
        <Nav align="center" flex="grow" direction="row" justify="end">
          <Button
            label="account"
            plain
            icon={<User />}
            primary={false}
            active={false}
          />
          <Button
            label="bug net"
            icon={<Cart />}
            type="button"
            badge={count}
            onClick={() => setIsBugDrawerOpen(true)}
          />
        </Nav>
      </Header>
      <BugDrawer
        show={isBugDrawerOpen}
        onClose={() => setIsBugDrawerOpen(false)}
      />
    </>
  );
};

const BugDrawer = ({ show, onClose }) => {
  const { caught } = useBugNet();

  return (
    show && (
      <Layer onClickOutside={onClose} full="vertical" position="right">
        <Box fill style={{ minWidth: "378px" }}>
          <Box
            direction="row"
            align="center"
            as="header"
            elevation="small"
            justify="between"
          >
            <Text margin={{ left: "small" }}>Your bug net</Text>
            <Button icon={<FormClose />} onClick={onClose} />
          </Box>
          <Box flex overflow="auto" pad="xsmall">
            <List data={caught} pad="small" border={false}>
              {(bug) => (
                <Box direction="row-responsive" justify="between">
                  <Box direction="row-responsive" gap="small">
                    <Bug color="accent-1" />
                    <Text weight="bold">{bug.name}</Text>
                  </Box>
                  <Text color="accent-2">{bug.price}</Text>
                </Box>
              )}
            </List>
          </Box>
          <Box
            as="footer"
            border={{ side: "top" }}
            pad="small"
            justify="end"
            direction="row"
            align="center"
          >
            <Text color="text-xweak">
              You've got {allBugs.length - caught.length} bugs left to catch!
            </Text>
          </Box>
        </Box>
      </Layer>
    )
  );
};

export default AppHeader;