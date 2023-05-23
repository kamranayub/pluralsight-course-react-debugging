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
  return (
    <Template bug={bug}>
      <PuffyPillbug
        attributes={{
          Health: 50,
          Attack: 20,
          Defense: 55,
          "Sp. Attack": 25,
          "Sp. Defense": 25,
          Speed: 30,
          Moves: ["Tackle", "Harden"],
        }}
      />
    </Template>
  );
};

/**
 * Fix 3 scenarios to catch bug:
 *
 * - Immutability
 * - Changing state vs. props
 * - Changing objects or arrays
 */
const PuffyPillbug = ({ liked = null, attributes }) => {
  const [hasLeveledUp, setHasLeveledUp] = useState(false);
  const [hasLeveledDown, setHasLeveledDown] = useState(false);

  const handleOnLevelChange = (level) => {
    if (level > 1) {
      setHasLeveledUp(true);
    } else if (hasLeveledUp && level === 1) {
      setHasLeveledDown(true);
    }
  };

  useBugTestOnce("should increase stats on level up", ({ findByTestId }) => {
    const health = parseInt(findByTestId("attribute: Health").innerText, 10);

    expect(hasLeveledUp).to.be.true;
    expect(health).to.be.above(50);
  });

  useBugTestOnce("should reset stats at level 1", ({ findByTestId }) => {
    const health = parseInt(findByTestId("attribute: Health").innerText, 10);

    expect(hasLeveledDown).to.be.true;
    expect(health).to.equal(50);
  });

  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      <LikeButton
        liked={liked}
        likedBy={["Bugcatcher Laura", "Grubeater Kelly"]}
      />
      <BugAttributes
        attributes={attributes}
        onLevelChange={handleOnLevelChange}
      />
    </>
  );
};

const LikeButton = ({ liked, likedBy }) => {
  let likeValue = liked === null ? null : liked ? "like" : "dislike";

  const handleOnChange = (event) => {
    const isLiked = event.target.value === "like";
    if (isLiked) {
      likeValue = true;
      likedBy.splice(0, 0, "Buglearner Anonymous");
    } else {
      likeValue = false;
      const existingLikedBy = likedBy.indexOf("Buglearner Anonymous");
      if (likedBy > -1) {
        likedBy.splice(existingLikedBy, 1);
      }
    }
  };

  useBugTest("should be liked", ({ findByTestId }) => {
    expect(findByTestId("liked")).to.have.attr("data-liked", "like");
  });

  useBugTest("should be liked by Buglearner Anonymous", ({ findByTestId }) => {
    expect(findByTestId("liked-by: Buglearner Anonymous")).to.exist;
  });

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
  const onLevelUp = () => setLevel((prevLevel) => prevLevel + 1);
  const onLevelDown = () => setLevel((prevLevel) => prevLevel - 1);

  useEffect(() => {
    Object.entries(attributes).forEach(([key, value]) => {
      if (typeof value === "number") {
        attributes[key] = value + (level - 1) * 2;
      }
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
        {Object.entries(attributes).map(([key, value]) => (
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
  title: "Changing Props",
  subtitle:
    "this puffy pillbug can cause confusion and chaos when trying to modify props or state",
  name: "Puffy Pillbug",
  price: "$7.99",
  route: "/bug/puffy-pillbug",
  component: Bug,
};

export default Bug;
