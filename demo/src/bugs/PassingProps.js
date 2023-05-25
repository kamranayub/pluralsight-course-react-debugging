import { useEffect, useState } from "react";
import {
  Button,
  Heading,
  Text,
  Box,
  ThumbsRating,
  NameValueList,
  NameValuePair,
} from "grommet";

import Template from "./BugPageTemplate";
import { expect, useBugTest, useBugTestOnce } from "./tests";

const Bug = () => {
  const initialState = {
    liked: null,
    likedBy: ["Bugcatcher Laura", "Grubeater Kelly"],
    level: 1,
    attributes: {
      Health: 50,
      Attack: 20,
      Defense: 55,
      "Sp. Attack": 25,
      "Sp. Defense": 25,
      Speed: 30,
      Moves: ["Tackle", "Harden"],
    },
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

  const handleOnLevelChange = (level) => {
    setPurchaseLevel(level);
  };

  const handleOnLikeChange = (likeState) => {
    setLikeStatus(likeState);
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
      if (likedBy.indexOf("Buglearner Anonymous") < 0) {
        likedBy.splice(0, 0, "Buglearner Anonymous");
      }
      setHasLiked(true);
    } else {
      setLikeValue("dislike");
      const existingLikedBy = likedBy.indexOf("Buglearner Anonymous");
      if (likedBy > -1) {
        likedBy.splice(existingLikedBy, 1);
      }
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

function BugAttributes({ attributes, onLevelChange }) {
  const [level, setLevel] = useState(1);
  const [leveledAttributes, setLeveledAttributes] = useState(attributes);
  const onLevelUp = () => setLevel((prevLevel) => prevLevel + 1);
  const onLevelDown = () => setLevel((prevLevel) => prevLevel - 1);

  useEffect(() => {
    setLeveledAttributes((prevAttributes) => {
      const newAttributes = { ...prevAttributes };
      Object.entries(attributes).forEach(([key, value]) => {
        if (typeof value === "number") {
          newAttributes[key] = value + (level - 1) * 2;
        }
      });

      return newAttributes;
    });
  }, [level, attributes]);

  useEffect(() => {
    onLevelChange(level);
  }, [level, onLevelChange]);

  return (
    <Box>
      <Heading level={3}>Attributes</Heading>
      <Box
        direction="row"
        gap="small"
        align="center"
        margin={{ bottom: "medium" }}
      >
        <Text color="text-weak">Level {level}</Text>
        <Button
          onClick={onLevelDown}
          disabled={level <= 1}
          label="level down"
        />
        <Button
          primary
          onClick={onLevelUp}
          disabled={level >= 100}
          label="level up"
        />
      </Box>
      <NameValueList>
        {Object.entries(leveledAttributes).map(([key, value]) => (
          <NameValuePair key={key} name={key}>
            <Text color="text-strong" data-test={`attribute: ${key}`}>
              {typeof value === "object" ? value.join(", ") : value}
            </Text>
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  );
}

export const bug = {
  title: "Passing Props",
  subtitle:
    "this pernicious pigwing can cause confusion and chaos when trying to modify props or state",
  name: "Pernicious Pigwing",
  price: "$7.99",
  route: "/bug/pernicious-pigwing",
  component: Bug,
};

export default Bug;
