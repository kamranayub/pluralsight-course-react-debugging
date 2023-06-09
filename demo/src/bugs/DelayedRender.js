import { useCallback, useEffect, useState } from "react";
import { Box, Button, Heading, Text } from "grommet";
import { AddCircle, SubtractCircle } from "grommet-icons";

import ProductImageCarousel from "../components/ProductImageCarousel";
import Template from "./BugPageTemplate";
import { isVolumeDiscount, calculateDiscount } from "../product-service";
import { expect, useBugTest } from "./tests";

const Bug = () => {
  return (
    <Template bug={bug}>
      <DapperDragonfly />
    </Template>
  );
};

const DapperDragonfly = () => {
  const [price, setPrice] = useState(bug.price);

  const recalculatePrice = useCallback((qty) => {
    const amount = parseCurrencyAsAmount(bug.price);
    const newAmount = qty * amount;
    const newPrice = formatAsCurrency(newAmount);

    setPrice(newPrice);
  }, []);

  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      <Text size="large" weight="bold">
        {price}
      </Text>
      <QuantityPicker
        initialQuantity={1}
        onQuantityChange={recalculatePrice}
        price={price}
      />
    </>
  );
};

function QuantityPicker({ initialQuantity = 1, price, onQuantityChange }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    onQuantityChange(quantity);
  }, [onQuantityChange, quantity]);

  useBugTest("should be able to update quantity to 10", ({ findByTestId }) => {
    expect(findByTestId("quantity")).to.have.text("10");
  });

  return (
    <Box>
      <Box
        direction="row"
        gap="small"
        align="center"
        margin={{ bottom: "medium" }}
      >
        <Button
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1}
          icon={<SubtractCircle />}
        />
        <Text color="text-weak" data-test="quantity">
          {quantity}
        </Text>

        <Button
          primary
          onClick={() => setQuantity(quantity + 1)}
          disabled={quantity >= 100}
          icon={<AddCircle />}
        />
      </Box>
      {isVolumeDiscount(quantity) ? (
        <VolumeDiscount price={price} quantity={quantity} />
      ) : null}
    </Box>
  );
}

function VolumeDiscount({ price, quantity }) {
  const discount = calculateDiscount(quantity);
  const savings = formatAsCurrency(parseCurrencyAsAmount(price) * discount);

  return (
    <Text data-test="discount" color="text-ok">
      Volume discount applies: {discount * 100}% (save {savings}!)
    </Text>
  );
}

function formatAsCurrency(amount) {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function parseCurrencyAsAmount(currency) {
  let amount = Number(currency.replace(/[^0-9.-]+/g, "")) * 100;

  for (let i = 0; i < Math.pow(amount, 2.8); i++) {
      Math.sqrt(i);
  }

  return amount;
}

export const bug = {
  title: "Delayed Render",
  subtitle:
    "this dapper dragonfly can cause your components to take longer to render",
  name: "Dapper Dragonfly",
  price: "$35.99",
  route: "/bug/delayed",
  photos: [
    "https://images.unsplash.com/photo-1554945121-0c64ff46da04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1820&q=80",
    "https://images.unsplash.com/photo-1596913142742-60bb10ebd386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    "https://images.unsplash.com/photo-1590079055098-d0fb8e034f1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=770&q=80",
  ],
  component: Bug,
};

export default Bug;
