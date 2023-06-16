import React, { useDebugValue } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { allBugs } from "./all-bugs";

const BugNetContext = React.createContext({});

export function useBugNet() {
  const context = React.useContext(BugNetContext);

  useDebugValue(`${context.count} bugs caught`);

  return context;
}

export const BugNet = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: bugs } = useQuery(["bugs"], {
    initialData: [],
    queryFn: () => {
      return queryClient.getQueryData(["bugs"]) || [];
    }
  });
  const { mutate } = useMutation({
    mutationFn: (bugs) => {
      queryClient.setQueryData(["bugs"], bugs);
    },
  });

  const caught = React.useMemo(
    () => bugs.map((name) => allBugs.find((b) => b.name === name)),
    [bugs]
  );

  const hasBug = React.useCallback((bugName) => bugs.includes(bugName), [bugs]);

  const catchBug = React.useCallback(
    (bugName) => {
      if (hasBug(bugName)) {
        return;
      }

      mutate([...bugs, bugName]);
    },
    [bugs, hasBug, mutate]
  );

  const providerValue = React.useMemo(
    () => ({ caught, catchBug, hasBug, count: caught.length }),
    [caught, catchBug, hasBug]
  );

  return (
    <BugNetContext.Provider value={providerValue}>
      {children}
    </BugNetContext.Provider>
  );
};
