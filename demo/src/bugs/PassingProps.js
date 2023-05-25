import { useEffect, useState } from "react";
import { Button, Heading, Text, Box, ThumbsRating } from "grommet";
import { AddCircle, SubtractCircle } from "grommet-icons";

import Template from "./BugPageTemplate";
import { expect, useBugTest, useBugTestOnce } from "./tests";

const Bug = () => {
  const initialState = {
    liked: null,
    likedBy: ["Bugcatcher Laura", "Grubeater Kelly"],
    level: 1,
  };

  return (
    <Template bug={bug}>
      <PilferingPillbug {...initialState} />
    </Template>
  );
};

/**
 * Fix issues to catch bug:
 *
 * - Inverse data flow
 * - Introducing local state
 */
const PilferingPillbug = (props) => {
  const [purchaseLevel, setPurchaseLevel] = useState(props.level);
  const [likeStatus, setLikeStatus] = useState(props.liked);
  const [currentlyLikedBy, setCurrentlyLikedBy] = useState(props.likedBy);

  const handleOnLevelChange = (level) => {
    setPurchaseLevel(level);
  };

  const handleOnLikeChange = (likeState) => {
    setLikeStatus(likeState);

    if (currentlyLikedBy.indexOf("Buglearner Anonymous") < 0) {
      setCurrentlyLikedBy(["Buglearner Anonymous", ...currentlyLikedBy]);
    } else {
      setCurrentlyLikedBy(
        currentlyLikedBy.filter((by) => by !== "Buglearner Anonymous")
      );
    }
  };

  useBugTest("should display a purchase summary", ({ findByTestId }) => {
    expect(findByTestId("summary").innerText).to.match(/level \d+/);
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
      <LikeButton
        liked={likeStatus}
        likedBy={currentlyLikedBy}
        onLikeChange={handleOnLikeChange}
        {...props}
      />
      <BugAttributes onLevelChange={handleOnLevelChange} {...props} />
      <Heading level={3} margin={{ top: "medium" }}>
        summary
      </Heading>
      <Text data-test="summary" color="text-weak">
        You are purchasing a level {purchaseLevel} {bug.name} that you{" "}
        {likeStatus ?? "haven't decided if you like or not"}
      </Text>
    </>
  );
};

const LikeButton = ({ liked, likedBy, onLikeChange }) => {
  const [likeValue, setLikeValue] = useState(
    liked === null ? null : liked ? "like" : "dislike"
  );
  const [hasLiked, setHasLiked] = useState(false);

  const handleOnChange = (event) => {
    const isLiked = event.target.value === "like";
    if (isLiked) {
      setLikeValue("like");
      setHasLiked(true);
    } else {
      setLikeValue("dislike");
    }
    onLikeChange(likeValue);
  };

  useBugTest("should be liked by Buglearner Anonymous", ({ findByTestId }) => {
    expect(findByTestId("liked-by: Buglearner Anonymous")).to.exist;
  });

  useBugTestOnce(
    "should remove Buglearner Anonymous when disliked",
    ({ findByTestId }) => {
      expect(hasLiked).to.be.true;
      expect(likeValue).to.equal("dislike");
      expect(findByTestId("liked-by: Buglearner Anonymous")).not.to.exist;
    }
  );

  return (
    <Box direction="row">
      <ThumbsRating
        name="liked"
        data-test="liked"
        data-liked={likeValue}
        value={likeValue}
        onChange={handleOnChange}
      />
      <Text margin={{ left: "xsmall" }}>Liked by</Text>
      {likedBy.map((customer, i) => (
        <Text
          color="text-weak"
          key={customer}
          data-test={`liked-by: ${customer}`}
          margin={{ left: "xsmall" }}
        >
          {customer}
          {i !== likedBy.length - 1 ? ", " : null}
        </Text>
      ))}
    </Box>
  );
};

function BugAttributes({ level, onLevelChange }) {
  const [currentLevel, setCurrentLevel] = useState(level);
  const onLevelUp = () => {
    setCurrentLevel(currentLevel + 1);
    onLevelChange(currentLevel);
  };
  const onLevelDown = () => {
    setCurrentLevel(currentLevel - 1);
    onLevelChange(currentLevel);
  };

  return (
    <Box>
      <Heading level={3}>choose level</Heading>
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
        <Text color="text-weak">Level {currentLevel}</Text>

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

export const bug = {
  title: "Passing Props",
  subtitle:
    "this pilfering pillbug can cause confusion and chaos when trying to modify props or state",
  name: "Pilfering Pillbug",
  price: "$7.99",
  route: "/bug/pilfering-pillbug",
  component: Bug,
};

export default Bug;
