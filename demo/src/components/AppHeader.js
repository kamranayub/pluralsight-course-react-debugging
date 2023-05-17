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
  ResponsiveContext,
} from "grommet";
import { FormSearch, FormClose, Location, Cart, Bug } from "grommet-icons";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "../Router";
import { useBugNet } from "../BugNet";
import { allBugs } from "../all-bugs";

import { getLocation } from "../loaders/get-location";

const AppHeader = () => {
  const size = React.useContext(ResponsiveContext);
  const { push } = useRouter();

  const { data: store } = useQuery({
    queryKey: ["store"],
    queryFn: getLocation,
    enabled: process.env.NODE_ENV !== "development",
    select: (data) =>
      data ? `${data.city}, ${data.regionCode}` : "pick a store",
  });

  const goToBug = React.useCallback(
    (e) => {
      const bug = e.suggestion.value;
      push(bug.route);
    },
    [push]
  );

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
            size !== "small" ? (
              <Text size="large" weight="bold">
                react bug emporium
              </Text>
            ) : null
          }
          plain
        />
        <Box
          key="Search"
          align="center"
          justify="center"
          flex="grow"
          gap="none"
          margin={{ left: "medium" }}
        >
          <MemoSearchInput suggestions={allBugs} onSuggestionSelect={goToBug} />
        </Box>
        <Nav align="center" flex="grow" direction="row" justify="end">
          <Button
            label={size !== "small" ? store : null}
            plain
            icon={<Location />}
            primary={false}
            active={false}
          />
          <CartButton />
        </Nav>
      </Header>
    </>
  );
};

const CartButton = () => {
  const { count } = useBugNet();
  const [isBugDrawerOpen, setIsBugDrawerOpen] = React.useState(false);

  return (
    <>
      <Button
        label="bug net"
        icon={<Cart />}
        type="button"
        badge={count}
        onClick={() => setIsBugDrawerOpen(true)}
      />
      <BugDrawer
        show={isBugDrawerOpen}
        onClose={() => setIsBugDrawerOpen(false)}
      />
    </>
  );
};

/**
 * @note This isn't really needed but is here to demonstrate a Memo
 * tag in the Dev Tools.
 */
const MemoSearchInput = React.memo(function SearchInput({
  suggestions,
  ...props
}) {
  const mapped = suggestions.map((b) => ({
    label: `${b.title} (${b.name})`,
    value: b,
  }));

  return (
    <TextInput
      {...props}
      icon={<FormSearch />}
      placeholder="find a bug buddy..."
      suggestions={mapped}
    />
  );
});
MemoSearchInput.displayName = "MemoSearchInput";

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
