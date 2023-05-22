import { useState, useEffect, useRef } from "react";
import { Heading, Text, Box } from "grommet";
import { Star, StarHalf } from "grommet-icons";
import { expect, use } from "chai";
import chaiDOM from "chai-dom";

import Template from "./BugPageTemplate";

use(chaiDOM);

const Bug = () => {
  const containerRef = useRef();
  const isTrendingTest = useBugTest("should be trending", () => {
    const isTrending = containerRef.current.querySelector(
      '[data-test="popularity"]'
    );
    // eslint-disable-next-line
    expect(isTrending).not.to.be.null;
    expect(isTrending).to.have.text("Trending");
  });
  const hasRatingTest = useBugTest("should be rated a 3.5", () => {
    const rating = containerRef.current.querySelector('[data-test="rating"]');
    // eslint-disable-next-line
    expect(rating).not.to.be.null;
    expect(rating).to.have.attr("data-test-rating", "3.5");
  });
  const hasInventoryTest = useBugTest("should be 'In Stock'", () => {
    const inventory = containerRef.current.querySelector(
      '[data-test="inventory"]'
    );
    // eslint-disable-next-line
    expect(inventory).not.to.be.null;
    expect(inventory).to.have.text("In Stock");
  });

  return (
    <Template
      bug={bug}
      tests={[isTrendingTest, hasRatingTest, hasInventoryTest]}
    >
      <Box ref={containerRef}>
        <PrayingMantis
          rating={0}
          reviewCount={35}
          inventoryCount={null}
          popularity="none"
        />
      </Box>
    </Template>
  );
};

function useBugTest(label, testFn) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    try {
      testFn();
      setPassed(true);
    } catch {}
  }, [testFn]);

  return {
    passed,
    label,
  };
}

/**
 * Fix 3 scenarios to catch bug:
 *
 * - Prop data types
 * - Undefined or null handling
 * - Default props
 */
const PrayingMantis = ({ inventoryCount, rating, reviewCount, popularity }) => {
  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      <Popularity popularity={popularity} />
      <Inventory inventoryCount={inventoryCount} />
      {rating && <Rating rating={rating} reviewCount={reviewCount} />}
    </>
  );
};

const Popularity = ({ popularity }) => {
  switch (popularity) {
    case "medium":
      return (
        <Text data-test="popularity" color="orange">
          Trending
        </Text>
      );
    case "high":
      return (
        <Text data-test="popularity" color="orange">
          Super Popular!
        </Text>
      );
    default:
      return null;
  }
};

const Inventory = ({ inventoryCount }) => {
  if (inventoryCount === 0) {
    return (
      <Text data-test="inventory" color="red">
        Out of Stock
      </Text>
    );
  } else if (inventoryCount <= 5) {
    return (
      <Text data-test="inventory" color="red">
        Only {inventoryCount} left in stock
      </Text>
    );
  } else {
    return (
      <Text data-test="inventory" color="green">
        In Stock
      </Text>
    );
  }
};

const Rating = ({ rating, reviewCount }) => {
  return (
    <Box direction="row" data-test="rating" data-test-rating={rating}>
      {[1, 2, 3, 4, 5].map((star, index) =>
        rating >= star ? (
          <Star key={index} color="gold" />
        ) : rating >= star - 0.5 ? (
          <StarHalf key={index} color="gold" />
        ) : (
          <Star key={index} color="lightGray" />
        )
      )}
      <Text>{reviewCount} reviews</Text>
    </Box>
  );
};

export const bug = {
  title: "Unexpected Props",
  subtitle:
    "this precocious praying mantis can cause components to render with props you aren't expecting",
  name: "Precocious Praying Mantis",
  price: "$26.99",
  route: "/bug/props",
  component: Bug,
  order: 1,
};

export default Bug;
