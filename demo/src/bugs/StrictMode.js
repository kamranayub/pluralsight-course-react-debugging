import { useCallback, useEffect, useState, useRef } from "react";
import { Button, Box, Heading, Text } from "grommet";

import Template from "./BugPageTemplate";
import { renderWithStrictMode, renderWithoutStrictMode } from "../";
import { expect, useBugTest } from "./tests";
import { useBugNet } from "../BugNet";

const Bug = () => {
  const { hasBug } = useBugNet();

  useEffect(() => {
    if (hasBug(bug.name)) {
      renderWithStrictMode();
    }
  }, [hasBug]);

  return (
    <Template bug={bug}>
      <SilentStagBeetle />
    </Template>
  );
};

const SilentStagBeetle = () => {
  const [, setIsStrictMode] = useState(true);
  const disableStrictMode = useCallback(() => {
    setIsStrictMode(false);
    renderWithoutStrictMode();
  }, []);

  return (
    <Box>
      <Heading level={3}>{bug.name}</Heading>
      <Button
        label="Disable Strict Mode"
        onClick={disableStrictMode}
        margin={{ bottom: "small" }}
        alignSelf="start"
      />
      <MountCounter />
    </Box>
  );
};

function MountCounter() {
  const mountCounter = useRef(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (hasMounted) return;
    console.log(bug.name, "has mounted");
    mountCounter.current++;
    setHasMounted(true);
  }, [hasMounted]);

  useBugTest(
    "should not log to console twice when not under strict mode",
    ({ findByTestId }) => {
      expect(findByTestId(`mount-counter`).dataset.mounts).to.equal("1");
    }
  );

  return (
    <Text
      color="text-xweak"
      data-test={`mount-counter`}
      data-mounts={mountCounter.current}
    >
      mounted {mountCounter.current} times
    </Text>
  );
}

export const bug = {
  title: "Strict Mode",
  subtitle:
    "this silent stag beetle will help you uncover issues in development with its special Strict Mode ability",
  name: "Silent Stag Beetle",
  price: "$22.99",
  route: "/bug/strict-mode",
  component: Bug,
};

export default Bug;
