import { useEffect, useCallback, useState } from "react";
import { Button, Box, Text, Tag, Heading } from "grommet";
import { AddCircle, SubtractCircle } from "grommet-icons";
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
  const [fetchCount, setFetchCount] = useState(0);
  const {
    data: promotion,
    isFetched,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["promotion", { name: bug.name }],
    placeholderData: [],
    queryFn: ({ queryKey: [, { name }] }) => fetchBugByName(name),
    select: (data) => data?.promotion ?? [],
    onSuccess: () => setFetchCount(count => count + 1)
  });

  useBugTest("should display quantity picker", ({ findByTestId }) => {
    expect(findByTestId("quantity")).to.exist;
  });

  useBugTest("should not send excessive fetch events", () => {
    expect(fetchCount).to.be.gt(1).and.lt(100);
  });

  return (
    <>
      <Heading level={3}>{bug.name}</Heading>
      {isFetched && <Price price={bug.price} promotion={promotion} />}
      {!isFetching && (
        <QuantityPicker initialQuantity={1} onQuantityChange={refetch} />
      )}
    </>
  );
};

function Price({ price, promotion }) {
  if (promotion) {
    return (
      <Box
        gap="small"
        margin={{ bottom: "medium" }}
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
        <SaleTimer expiresInMs={promotion.expiresInMs} />
      </Box>
    );
  }

  return (
    <Text color="brand" size="large" weight="bold">
      {price}
    </Text>
  );
}

function SaleTimer({ expiresInMs }) {
  const [countdownTimes, setCountdownTimes] = useState(0);
  const [saleCountdown, setSaleCountdown] = useState(expiresInMs);

  useEffect(() => {
    setInterval(() => {
      setSaleCountdown((countdown) => countdown - 1000);
    }, 1000);
  }, []);

  useEffect(() => {
    if (saleCountdown === expiresInMs) return;

    setCountdownTimes((times) => times + 1);
  }, [saleCountdown, expiresInMs]);

  useBugTest("should countdown sale accurately", () => {
    const expectedDuration = expiresInMs - countdownTimes * 1000;
    expect(countdownTimes).to.be.gt(0);
    expect(saleCountdown).to.be.lt(expiresInMs);
    expect(saleCountdown).to.equal(expectedDuration);
  });

  return (
    <Text color="text-weak" size="small" data-test="sale-timer">
      {formatMillisecondsAsDuration(saleCountdown)} remaining before sale ends
    </Text>
  );
}

function formatMillisecondsAsDuration(milliseconds) {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  return `${hours}:${minutes}:${seconds}`.replace(/\b(\d)\b/g, "0$1");
}

function QuantityPicker({ initialQuantity = 1, onQuantityChange }) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { eventsSent } = useTrackAnalytics();

  useEffect(() => {
    onQuantityChange(quantity);
  }, [onQuantityChange, quantity]);

  useBugTest("should not send excessive analytics events", () => {
    expect(eventsSent).to.be.gt(5);
    expect(eventsSent).to.be.lt(100);
  });

  return (
    <Box data-test="quantity">
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
        <Text color="text-weak" data-test="level">
          {quantity}
        </Text>

        <Button
          primary
          onClick={() => setQuantity(quantity + 1)}
          disabled={quantity >= 100}
          icon={<AddCircle />}
        />
      </Box>
      <QuantityTracking quantity={quantity} />
    </Box>
  );
}

function QuantityTracking({ quantity }) {
  const { track } = useTrackAnalytics();

  useEffect(() => {
    track({
      event: "quantity_change",
      quantity: quantity,
    });
  }, [track, quantity]);

  return null;
}

function useTrackAnalytics() {
  const [eventBatch, setEventBatch] = useState([]);

  const track = useCallback((analyticsEvent) => {
    setEventBatch((batch) => [...batch, analyticsEvent]);
  });

  useEffect(() => {
    if (eventBatch.length > 5) {
      window.navigator.sendBeacon(
        "/api/analytics.json",
        JSON.stringify(eventBatch)
      );
      window.__ANALYTICS_EVENTS__ = window.__ANALYTICS_EVENTS__ ?? [];
      window.__ANALYTICS_EVENTS__.push(...eventBatch);
      eventBatch.length = 0;
    }
  }, [eventBatch]);

  return {
    track,
    eventsSent: window.__ANALYTICS_EVENTS__?.length ?? 0,
  };
}

async function fetchBugByName(name) {
  const res = await fetch(`/api/bugs.json`);
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
