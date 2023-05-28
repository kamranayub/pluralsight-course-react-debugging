import { Box, Text, Tag, Heading } from "grommet";
import { useQuery } from "@tanstack/react-query";

import Template from "./BugPageTemplate";
import { expect, useBugTest } from "./tests";

const Bug = () => {
  return (
    <Template bug={bug}>
      <HuggableHoneybee />
    </Template>
  );
};

const HuggableHoneybee = () => {
  const { data: promotion } = useQuery({
    queryKey: ["promotion", { name: bug.name }],
    placeholderData: [],
    queryFn: ({ queryKey: [, { name }] }) => fetchBugByName(name),
    select: (data) => data?.promotion ?? [],
  });

  useBugTest("should display bee sale promotion", ({ findByTestId }) => {
    const promo = findByTestId("promotion: Save the Bees Sale");
    expect(promo.dataset.discount).to.equal("10% off");
  });

  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      <Price price={bug.price} promotion={promotion} />
    </>
  );
};

function Price({ price, promotion }) {
  if (promotion) {
    return (
      <Box
        gap="small"
        data-test={`promotion: ${promotion.name}`}
        data-discount={promotion.discount}
      >
        <Tag
          alignSelf="start"
          name={promotion.name}
          value={promotion.discount}
        />
        <Box direction="row" align="baseline" gap="xsmall">
          <Text
            color="gray"
            size="medium"
            weight="bold"
            style={{ textDecoration: "line-through" }}
          >
            {price}
          </Text>
          <Text color="brand" size="large" weight="bold">
            {promotion.computedPrice}
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Text color="brand" size="large" weight="bold">
      {price}
    </Text>
  );
}

async function fetchBugByName(name) {
  const res = await fetch(`/api/data.json`);
  const data = await res.json();

  return data.bugs.find((item) => item.name === name);
}

export const bug = {
  title: "Hook Side Effects",
  subtitle:
    "this huggable honeybee can cause your hooks not to render when they should be",
  name: "Huggable Honeybee",
  price: "$8.99",
  route: "/bug/hooks",
  component: Bug,
};

export default Bug;
