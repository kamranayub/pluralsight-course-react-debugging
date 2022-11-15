import React from "react";
import { Anchor, Grommet, PageContent, Footer, Text } from "grommet";

import { Router, Routes, Route } from "./Router";
import { BugNet } from "./BugNet";

import HomePage from "./Home";
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

const App = () => (
  <Grommet full theme={theme}>
    <BugNet>
      <Router>
        <Routes>
          <Route path="/" Component={HomePage} />
          {allBugs.map((bug) => (
            <Route key={bug.name} path={bug.route} Component={bug.component} />
          ))}
        </Routes>
      </Router>
      <PageContent>
        <Footer
          align="center"
          direction="row"
          flex={false}
          justify="center"
          gap="medium"
          pad="large"
        >
          <Text>
            a demo app created by Kamran Ayub for the{" "}
            <Anchor href="https://bit.ly/PSReactDebugging">
              React Debugging Playbook
            </Anchor>{" "}
            Pluralsight course
          </Text>
        </Footer>
      </PageContent>
    </BugNet>
  </Grommet>
);

export default App;
