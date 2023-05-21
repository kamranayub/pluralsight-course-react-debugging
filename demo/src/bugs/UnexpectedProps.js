import { useState } from "react";
import { Text, Box } from "grommet";
import { Star, StarHalf } from "grommet-icons";

import Template from "./BugPageTemplate";
import CatchBugButton from "./CatchBugButton";

const Bug = () => {
  return (
    <Template bug={bug}>
      <PrayingMantis 
        rating={3.5} 
        reviewCount={35} 
        inventoryCount={10} 
        popularity="medium"
      />
    </Template>
  );
};

/**
 * Fix 3 scenarios to catch bug:
 *
 * - Prop data types
 * - Undefined or null handling
 * - Default props
 */
const PrayingMantis = ({ inventoryCount = 0, rating, reviewCount, popularity }) => {
  const [found, setFound] = useState(false);

  if (!found) {
    return (
      <>
        <Popularity popularity={popularity} />
        <Inventory inventoryCount={inventoryCount} />
        {rating >= 0 ? (
          <Rating rating={rating} reviewCount={reviewCount} />
        ) : null}        
        <Text color="text-xweak">the {bug.name} is hiding...</Text>
      </>
    );
  }

  return <CatchBugButton bug={bug} />;
};

const Popularity = ({ popularity }) => {
  switch (popularity) {
    case "medium":
      return (<Text color="orange">Trending</Text>);
    case "high":
      return (<Text color="orange">Super Popular!</Text>);
    default:
      return null;
  }
}

const Inventory = ({ inventoryCount }) => {
  if (inventoryCount === 0) {
    return <Text color="red">Out of Stock</Text>;
  } else if (inventoryCount <= 5) {
    return <Text color="red">Only {inventoryCount} left in stock</Text>;
  } else {
    return <Text color="green">In Stock</Text>;
  }
};

const Rating = ({ rating, reviewCount }) => {
  return (
    <Box direction="row">
      {[1, 2, 3, 4, 5].map((star) =>
        rating >= star ? (
          <Star color="gold" />
        ) : rating >= star - 0.5 ? (
          <StarHalf color="gold" />
        ) : (
          <Star color="lightGray" />
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
