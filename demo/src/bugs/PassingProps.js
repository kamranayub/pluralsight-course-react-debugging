import { useEffect, useState } from "react";
import { Button, Heading, Text, Box, ThumbsRating } from "grommet";
import { AddCircle, SubtractCircle } from "grommet-icons";

import Template from "./BugPageTemplate";
import { expect, useBugTest, useBugTestOnce } from "./tests";

const Bug = () => {
  const initialState = {
    liked: null,
    likedBy: ["Bugcatcher Laura", "Grubeater Kelly"],
    level: null,
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
  const [likeStatus, setLikeStatus] = useState(
    props.liked === null ? null : props.liked ? "like" : "dislike"
  );
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

  useBugTest(
    "should display a level 3 heading for purchase summary",
    ({ findByTestId }) => {
      expect(
        window.getComputedStyle(findByTestId("purchaseSummaryHeading")).fontSize
      ).to.equal("26px");
    }
  );

  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      <LikeButton
        liked={likeStatus}
        likedBy={currentlyLikedBy}
        onLikeChange={handleOnLikeChange}
        {...props}
      />
      <BugAttributes
        onLevelChange={handleOnLevelChange}
        level={purchaseLevel}
      />
      {purchaseLevel ? (
        <PurchaseSummary level={purchaseLevel} liked={likeStatus} />
      ) : null}
    </>
  );
};

const LikeButton = ({ liked, likedBy, onLikeChange }) => {
  const [hasLiked, setHasLiked] = useState(false);

  const handleOnChange = (event) => {
    const isLiked = event.target.value === "like";
    if (isLiked) {
      setHasLiked(true);
    }
    onLikeChange(event.target.value);
  };

  useBugTest("should be liked by Buglearner Anonymous", ({ findByTestId }) => {
    expect(findByTestId("liked-by: Buglearner Anonymous")).to.exist;
  });

  useBugTestOnce(
    "should remove Buglearner Anonymous when disliked",
    ({ findByTestId }) => {
      expect(hasLiked).to.be.true;
      expect(liked).to.equal("dislike");
      expect(findByTestId("liked-by: Buglearner Anonymous")).not.to.exist;
    }
  );

  return (
    <Box direction="row">
      <ThumbsRating
        name="liked"
        data-test="liked"
        data-liked={liked}
        value={liked}
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
  const onLevelUp = () => {
    onLevelChange(level + 1);
  };
  const onLevelDown = () => {
    onLevelChange(level - 1);
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
          disabled={level <= 1}
          icon={<SubtractCircle />}
        />
        <Text color="text-weak" data-test="level">
          Level {level}
        </Text>

        <Button
          primary
          onClick={onLevelUp}
          disabled={level >= 100}
          icon={<AddCircle />}
        />
      </Box>
    </Box>
  );
}

function PurchaseSummary({ purchaseLevel, purchaseLikability, ...props }) {
  return (
    <>
      <Heading
        data-test="purchaseSummaryHeading"
        level={3}
        margin={{ top: "medium" }}
        {...props}
      >
        summary
      </Heading>

      <Text data-test="summary" color="text-weak">
        You are purchasing a level {purchaseLevel} {bug.name} that you{" "}
        {purchaseLikability ?? "haven't decided if you like or not"}
      </Text>
    </>
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
