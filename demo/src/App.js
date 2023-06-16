import React from "react";
import { Anchor, Grommet, Page, PageContent, Footer, Text } from "grommet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppHeader from "./components/AppHeader";
import HomePage from "./Home";
import { Router, Routes, Route } from "./Router";
import { BugNet } from "./BugNet";

import { allBugs } from "./all-bugs";

import "./App.css";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
    colors: {
      brand: "#FF1675",
      black: "#130F25",
      text: {
        dark: "#EBEFF5",
        light: "#130F25",
      },
      "accent-1": "#02E088",
      "accent-2": "#770EF7",
      "accent-3": "#00A3FF",
      "accent-4": "#FFC942",
    },
  },
};

const queryClient = new QueryClient();

const App = () => (
  <Grommet full theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BugNet>
        <Router>
          <Page>
            <PageContent>
              <AppHeader />
              <Routes>
                <Route path="/" Component={HomePage} />
                {allBugs.map((bug) => (
                  <Route
                    key={bug.name}
                    path={bug.route}
                    Component={bug.component}
                  />
                ))}
              </Routes>
              <Footer
                align="center"
                direction="row"
                flex={false}
                justify="center"
                gap="medium"
                pad="large"
              >
                <Text>
                  a demo app created by{" "}
                  <Anchor href="https://kamranayub.com?ref=ps-react-debugging-demo">
                    Kamran Ayub
                  </Anchor>{" "}
                  for the{" "}
                  <Anchor href="https://bit.ly/PSReactDebugging">
                    React Debugging Playbook
                  </Anchor>{" "}
                  Pluralsight course
                </Text>
              </Footer>
            </PageContent>
          </Page>
        </Router>
      </BugNet>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Grommet>
);

export const ThinApp = ({ children }) => (
  <Grommet full theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BugNet>{children}</BugNet>
    </QueryClientProvider>
  </Grommet>
);

export default App;
