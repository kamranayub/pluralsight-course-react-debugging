import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  Cards,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Tag,
  Text,
  Box,
} from "grommet";
import { useQuery } from "@tanstack/react-query";

import Template from "./BugPageTemplate";
import { expect, useBugTest } from "./tests";

const Bug = () => {
  return (
    <Template bug={bug}>
      <CheerfulCicada />
    </Template>
  );
};

const CheerfulCicada = () => {
  return (
    <StorePersonalization>
      <Heading level={3}>{bug.name}</Heading>
      <Box gap="medium">
        <UserLocation />
        <StoreList />
      </Box>
    </StorePersonalization>
  );
};

function UserLocation() {
  const { userLocation, requestUserLocation, resetUserLocation } =
    useStorePersonalization();

  return (
    <Box>
      <Box direction="row" gap="small">
        <Button
          alignSelf="start"
          label="Find nearest store"
          primary
          onClick={requestUserLocation}
        />
        {userLocation.lat !== null ? (
          <Button
            alignSelf="start"
            label="reset"
            secondary
            onClick={resetUserLocation}
          />
        ) : null}
      </Box>
      {userLocation.lat !== null ? (
        <Text>
          You are located near {userLocation.lat}, {userLocation.lon}
        </Text>
      ) : null}
    </Box>
  );
}

function StoreList() {
  const { userLocation, homeStore, setUserHomeStore } =
    useStorePersonalization();
  const { data: stores } = useQuery({
    queryKey: ["stores", { userLocation }],
    queryFn: fetchStores,
  });

  useBugTest(
    "should not re-render all list items when setting store",
    ({ findAllByTestId }) => {
      const stores = findAllByTestId("store");
      const updateCounts = Array.from(stores).map(
        (storeEl) => storeEl.dataset.updates
      );
      const updateCountsAreSame = updateCounts.every(
        (c) => c === updateCounts[0]
      );

      expect(updateCountsAreSame).to.be.false;
    }
  );

  return (
    <Cards
      data={stores}
      children={(store) => {
        return (
          <StoreListItem
            key={store.storeName}
            store={store}
            homeStore={homeStore}
            setUserHomeStore={setUserHomeStore}
          />
        );
      }}
    />
  );
}

const StoreListItem = function StoreListItem({
  store,
  homeStore,
  setUserHomeStore,
}) {
  const updates = useRef(0);

  updates.current++;

  return (
    <Card
      key={store.storeName}
      background="light-2"
      data-test="store"
      data-updates={updates.current}
    >
      <CardHeader pad="small">
        <Box>
          <Heading level={4}>{store.storeName}</Heading>
          <Text size="xsmall" color="text-weak">
            {store.location}
          </Text>
        </Box>
      </CardHeader>
      <CardBody>
        <StoreMap storeName={store.storeName} location={store.location} />
      </CardBody>
      <CardFooter background="light-3" pad="small">
        {homeStore === store.storeName ? (
          <Tag value="this is your store" />
        ) : (
          <Button
            secondary
            label="Make this my store"
            onClick={() => setUserHomeStore(store.storeName)}
          />
        )}
      </CardFooter>
    </Card>
  );
};

function StoreMap({ storeName, location }) {
  return (
    <div style={{ width: "100%" }}>
      <iframe
        width="100%"
        height="200"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={`https://maps.google.com/maps?width=100%&height=200&hl=en&q=${encodeURIComponent(
          location
        )}+(${encodeURIComponent(
          storeName
        )})&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
        title={location}
      ></iframe>
    </div>
  );
}

const StorePersonalizationContext = createContext({
  userLocation: { lat: null, lon: null },
  homeStore: null,
});

const StorePersonalization = ({ children }) => {
  const [latlon, setLatlon] = useState([]);
  const [homeStore, setHomeStore] = useState(null);

  const requestUserLocation = useCallback(() => {
    if (latlon.length) {
      return;
    }

    setLatlon([0.001, -0.002]);
  }, [latlon]);

  const resetUserLocation = useCallback(() => {
    setLatlon([]);
  }, []);

  const setUserHomeStore = useCallback((storeName) => {
    setHomeStore(storeName);
  }, []);

  const contextValue = {
    userLocation: { lat: latlon?.[0] ?? null, lon: latlon?.[1] ?? null },
    homeStore,
    requestUserLocation,
    resetUserLocation,
    setUserHomeStore,
  };

  return (
    <StorePersonalizationContext.Provider value={contextValue}>
      {children}
    </StorePersonalizationContext.Provider>
  );
};

function useStorePersonalization() {
  return useContext(StorePersonalizationContext);
}

async function fetchStores({ queryKey }) {
  const [, { userLocation }] = queryKey;

  const res = await fetch("/api/stores.json");
  const stores = await res.json();

  if (userLocation.lat) {
    return stores.filter((s) => s.nearest);
  }
  return stores;
}

export const bug = {
  title: "Context Render",
  subtitle:
    "this cheerful cicada will cause unnecessary re-renders when contexts change",
  name: "Cheerful Cicada",
  price: "$16.99",
  route: "/bug/context",
  component: Bug,
};

export default Bug;
