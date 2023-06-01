import { Heading, Text, Box } from "grommet";
import { Star, StarHalf } from "grommet-icons";

import Template from "./BugPageTemplate";
import { expect, useBugTest } from "./tests";

const POPULARITY = {
  trending: 1,
  popular: 2,
  none: null,
};

const Bug = () => {
  return (
    <Template bug={bug}>
      <UnseenUmbrellaMoth
        rating={0}
        reviewCount={35}
        inventoryCount={null}
        popularity="trending"
      />
    </Template>
  );
};

/**
 * Fix issues to catch bug:
 *
 * - Prop data types
 * - Undefined or null handling
 * - Default props
 */
const UnseenUmbrellaMoth = ({ inventoryCount, rating, reviewCount, popularity }) => {
  useBugTest("should be trending", ({ findByTestId }) => {
    expect(findByTestId("popularity")).to.have.text("Trending");
  });

  useBugTest("should be rated a 3.5", ({ findByTestId }) => {
    expect(findByTestId("rating")).to.have.attr("data-test-rating", "3.5");
  });

  useBugTest("should be 'In Stock'", ({ findByTestId }) => {
    expect(findByTestId("inventory")).to.have.text("In Stock");
  });

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
    case POPULARITY.trending:
      return (
        <Text data-test="popularity" color="orange">
          Trending
        </Text>
      );
    case POPULARITY.popular:
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
  title: "Unexpected Prop Types",
  subtitle:
    "this unseen umbrella moth can cause components to render with different prop value types you aren't expecting",
  name: "Unseen Umbrella Moth",
  price: "$26.99",
  route: "/bug/umbrella-moth",
  component: Bug,
};

export default Bug;
