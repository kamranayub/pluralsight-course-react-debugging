import { useEffect, useState, useRef } from "react";
import { Button, Heading, Text, Box, ThumbsRating } from "grommet";
import { AddCircle, SubtractCircle, Favorite } from "grommet-icons";

import Template from "./BugPageTemplate";
import { expect, useBugTest } from "./tests";

import "./CascadingRender.css";

const Bug = () => {
  return (
    <Template bug={bug}>
      <CuriousCentipede level={1} liked={null} />
    </Template>
  );
};

const CuriousCentipede = (props) => {
  const [purchaseLevel, setPurchaseLevel] = useState(props.level);
  const [likeStatus, setLikeStatus] = useState(
    props.liked === null ? null : props.liked ? "like" : "dislike"
  );
  const handleOnLevelChange = (level) => {
    setPurchaseLevel(level);
  };

  const handleOnLikeChange = (likeState) => {
    setLikeStatus(likeState);
  };

  useBugTest("only animates hearts once per like", ({ findByTestId }) => {
    expect(likeStatus).to.equal("like");
    expect(purchaseLevel).to.be.gte(2);
    expect(findByTestId("affection")).to.have.attr("data-mounts", "0");
  });

  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      <LikeButton liked={likeStatus} onLikeChange={handleOnLikeChange} />
      <BugAttributes
        onLevelChange={handleOnLevelChange}
        initialLevel={props.level}
      />
      {purchaseLevel ? (
        <PurchaseSummary
          purchaseLevel={purchaseLevel}
          purchaseLikability={likeStatus}
        />
      ) : null}
    </>
  );
};

const LikeButton = ({ liked, onLikeChange }) => {
  const handleOnChange = (event) => {
    onLikeChange(event.target.value);
  };

  return (
    <Box direction="row" gap="small">
      <ThumbsRating
        name="liked"
        data-test="liked"
        data-liked={liked}
        value={liked}
        onChange={handleOnChange}
      />

      {liked === "like" ? <AffectionateBadge /> : null}
    </Box>
  );
};

function BugAttributes({ initialLevel, onLevelChange }) {
  const [level, setLevel] = useState(initialLevel);

  const onLevelUp = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    onLevelChange(newLevel);
  };
  const onLevelDown = () => {
    const newLevel = level - 1;
    setLevel(newLevel);
    onLevelChange(newLevel);
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

function PurchaseSummary({ purchaseLevel, purchaseLikability }) {
  return (
    <>
      <Heading
        data-test="purchaseSummaryHeading"
        level={3}
        margin={{ top: "medium" }}
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

function AffectionateBadge() {
  const mountCounter = useRef(0);

  useEffect(() => {
    mountCounter.current++;
  }, []);

  const HEART_CLASSES = [
    "heart float1",
    "heart float2",
    "heart float3",
    "heart float4",
  ];

  // Generate random number between 4 and 10
  const numHearts = Math.floor(Math.random() * (10 - 4 + 1)) + 4;

  const hearts = Array.from({ length: numHearts }).map((_, i) => {
    // Randomize delay (0-2 seconds)
    const style = {
      animationDuration: `${1 + Math.random() * 1.5}s`,
    };
    const heartClass =
      HEART_CLASSES[Math.floor(Math.random() * HEART_CLASSES.length)];

    return (
      <Favorite className={heartClass} color="red" key={i} style={style} />
    );
  });

  return (
    <>
      <Box data-test="affection" data-mounts={mountCounter.current}>
        <Favorite color="red" />
        {hearts}
      </Box>
    </>
  );
}

export const bug = {
  title: "Cascading Render",
  subtitle:
    "this curious centipede will cause child components to render when the parent does",
  name: "Curious Centipede",
  price: "$11.99",
  route: "/bug/cascading",
  component: Bug,
};

export default Bug;
