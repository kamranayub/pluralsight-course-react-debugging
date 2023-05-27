import { useState } from "react";
import { Box, Button, Heading, Text, ThumbsRating } from "grommet";
import { AddCircle, SubtractCircle } from "grommet-icons";

import Template from "./BugPageTemplate";
import { useBugTest } from "./tests";

const Bug = () => {
  return (
    <Template bug={bug}>
      <ShySpider />
    </Template>
  );
};

/**
 * Scenarios:
 * - Initial state
 * - Incorrect state update
 * - Stale state
 */
const ShySpider = (props) => {
  const [purchaseLevel, setPurchaseLevel] = useState(props.level);

  const handleOnLevelChange = (level) => {
    setPurchaseLevel(level);
  };

  useBugTest("should display a purchase summary", ({ findByTestId }) => {
    expect(findByTestId("summary").innerText).to.contain(
      findByTestId("level").innerText.toLowerCase()
    );
    if (findByTestId("liked").dataset.liked === "like") {
      expect(findByTestId("summary").innerText).to.match(/you like$/);
    } else if (findByTestId("liked").dataset.liked === "dislike") {
      expect(findByTestId("summary").innerText).to.match(/you dislike$/);
    } else {
      throw Error("Neither like nor dislike");
    }
  });

  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      <BugAttributes
        initialLevel={props.level}
        onLevelChange={handleOnLevelChange}
      />
      {purchaseLevel ? <PurchaseSummary purchaseLevel={purchaseLevel} /> : null}
    </>
  );
};

function BugAttributes({ initialLevel, onLevelChange }) {
  let currentLevel = useState(initialLevel);

  const onLevelUp = () => {
    currentLevel += 1;
    onLevelChange(currentLevel);
  };
  const onLevelDown = () => {
    currentLevel -= 1;
    onLevelChange(currentLevel);
  };

  return (
    <Box>
      <Box
        direction="row"
        gap="small"
        align="center"
        margin={{ bottom: "medium" }}
      >
        <Button
          onClick={onLevelDown}
          disabled={currentLevel <= 1}
          icon={<SubtractCircle />}
        />
        <Text color="text-weak" data-test="level">
          Level {currentLevel}
        </Text>

        <Button
          primary
          onClick={onLevelUp}
          disabled={currentLevel >= 100}
          icon={<AddCircle />}
        />
      </Box>
    </Box>
  );
}

function PurchaseSummary({ purchaseLevel }) {
  return (
    <>
      <Heading level={3} margin={{ top: "medium" }}>
        summary
      </Heading>

      <Text data-test="summary" color="text-weak">
        You are purchasing a level {purchaseLevel} {bug.name}
      </Text>
    </>
  );
}

export const bug = {
  title: "Unexpected State Changes",
  subtitle:
    "this shy spider can cause component state to be wrong at first, updated incorrectly, or even become stale",
  name: "Shy Spider",
  price: "$23.99",
  route: "/bug/state",
  component: Bug,
};

export default Bug;
