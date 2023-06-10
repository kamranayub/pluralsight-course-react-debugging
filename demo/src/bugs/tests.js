import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { expect, use } from "chai";
import chaiDOM from "chai-dom";

use(chaiDOM);

export { expect };

const BugTestContext = createContext({});

export function useBugTestContext() {
  return useContext(BugTestContext);
}

export function BugTestsProvider({ children }) {
  const containerRef = useRef();
  const testStateRef = useRef({});
  const findByTestId = (id) =>
    containerRef.current.querySelector(`[data-test="${id}"]`);
  const findAllByTestId = (id) =>
    containerRef.current.querySelectorAll(`[data-test="${id}"]`);

  const contextValue = useMemo(
    () => ({
      ref: containerRef,
      getTestsQueryFn: () => Promise.resolve(testStateRef.current),
      reportTest: (label, passed) => {
        testStateRef.current = {
          ...testStateRef.current,
          [label]: passed,
        };
      },
      findByTestId,
      findAllByTestId,
    }),
    []
  );

  return (
    <BugTestContext.Provider value={contextValue}>
      {children}
    </BugTestContext.Provider>
  );
}

export function useBugTest(label, testFn) {
  const queryClient = useQueryClient();
  const { findByTestId, findAllByTestId, reportTest } = useBugTestContext();

  useEffect(() => {
    try {
      testFn({ findByTestId, findAllByTestId });
      reportTest(label, true);
    } catch (err) {
      reportTest(label, false);
    }
    queryClient.invalidateQueries({ queryKey: ["test-summary"] });
  }, [queryClient, reportTest, testFn, findByTestId, findAllByTestId, label]);

  return null;
}

export function useBugTestOnce(label, testFn) {
  const { findByTestId, findAllByTestId, reportTest } = useBugTestContext();
  const queryClient = useQueryClient();
  const [hasPassedOnce, setHasPassedOnce] = useState(false);

  useEffect(() => {
    if (hasPassedOnce) return;

    try {
      testFn({ findByTestId, findAllByTestId });
      reportTest(label, true);
      setHasPassedOnce(true);
    } catch (err) {
      reportTest(label, false);
    }
    queryClient.invalidateQueries({ queryKey: ["test-summary"] });
  }, [
    testFn,
    queryClient,
    reportTest,
    findByTestId,
    findAllByTestId,
    label,
    hasPassedOnce,
  ]);

  return null;
}

export function useBugTestSummary() {
  const { getTestsQueryFn } = useBugTestContext();
  const { data: testSummary } = useQuery({
    queryKey: ["test-summary"],
    placeholderData: {},
    queryFn: getTestsQueryFn,
  });

  const passed = useMemo(
    () =>
      Object.values(testSummary).length > 0 &&
      Object.values(testSummary).every((b) => b),
    [testSummary]
  );
  const tests = useMemo(
    () =>
      Object.keys(testSummary).map((label) => ({
        label,
        passed: testSummary[label],
      })),
    [testSummary]
  );

  return {
    passed,
    tests,
  };
}
