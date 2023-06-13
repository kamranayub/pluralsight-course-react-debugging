import { useCallback, useState, memo } from "react";
import { Box, Button, Heading, Text } from "grommet";

import Template from "./BugPageTemplate";
import { expect, useBugTest } from "./tests";

const Bug = () => {
  return (
    <Template bug={bug}>
      <ThoughtfulTermite />
    </Template>
  );
};

const ThoughtfulTermite = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [canCatch, setCanCatch] = useState(false);

  function onTabChange(tabIndex) {
    if (tabIndex === 1) {
      setCanCatch(true);
    }
    setTabIndex(tabIndex);
  }

  const onReviewsRender = useCallback(() => {
    setCanCatch(false);
  }, []);

  useBugTest(
    "should be able to catch when transitioning to reviews",
    ({ findByTestId }) => {
      expect(canCatch).to.be.true;
      expect(findByTestId("reviews")).not.to.exist;
    }
  );

  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      <Price price={bug.price} />
      <Box gap="small" direction="row">
        <Button
          primary={tabIndex === 0}
          label="Details"
          onClick={() => onTabChange(0)}
        />
        <Button
          primary={tabIndex === 1}
          label="Reviews"
          onClick={() => onTabChange(1)}
        />
      </Box>
      {tabIndex === 0 && <TabDetails />}
      {tabIndex === 1 && <TabReviews onRender={onReviewsRender} />}
    </>
  );
};

function Price({ price }) {
  return (
    <Text size="large" weight="bold">
      {price}
    </Text>
  );
}

function TabDetails() {
  return <Text>One</Text>;
}

const TabReviews = memo(function TabReviews({ onRender }) {
  onRender();

  const reviews = [];

  for (let i = 0; i < 500; i++) {
    reviews.push(<SlowReview key={i} index={i} />);
  }

  return <Box data-test="reviews">{reviews}</Box>;
});

function SlowReview({ index }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 2) {
    // Do nothing for 2 ms to emulate extremely slow code
  }

  return <Text>Some review text {index}</Text>;
}

export const bug = {
  title: "Transitions",
  subtitle:
    "this thoughtful termite can gnaw away at state changes unexpectedly",
  name: "Thoughtful Termite",
  price: "$67.99",
  route: "/bug/transitions",
  component: Bug,
};

export default Bug;
