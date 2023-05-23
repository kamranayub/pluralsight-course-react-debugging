import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { expect, use } from "chai";
import chaiDOM from "chai-dom";

use(chaiDOM);

export { expect };

const BugTestContext = createContext({});
const DEFAULT_STATE = {};

export function useBugTestContext() {
  return useContext(BugTestContext);
}

export function BugTestsProvider({ children }) {
  const containerRef = useRef();
  const findByTestId = (id) =>
    containerRef.current.querySelector(`[data-test="${id}"]`);
  const testSummary = useRef(DEFAULT_STATE);
  const listeners = useRef([]);

  const reportTest = (label, passed) => {
    testSummary.current = {
      ...testSummary.current,
      [label]: passed,
    };

    for (let i = 0; i < listeners.current.length; i++) {
      listeners.current[i]();
    }
  };

  const subscribe = (listener) => {
    listeners.current.push(listener);
  };

  useEffect(
    () => () => {
      listeners.current.length = 0;
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      ref: containerRef,
      getTestSummary: () => testSummary.current,
      reportTest,
      findByTestId,
      subscribe,
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
  const { findByTestId, reportTest } = useBugTestContext();

  useEffect(() => {
    try {
      testFn({ findByTestId });
      reportTest(label, true);
    } catch {
      reportTest(label, false);
    }
  }, [testFn, reportTest, findByTestId, label]);

  return null;
}

export function useBugTestOnce(label, testFn) {
  const { findByTestId, reportTest } = useBugTestContext();
  const [hasPassedOnce, setHasPassedOnce] = useState(false);

  useEffect(() => {
    if (hasPassedOnce) return;

    try {
      testFn({ findByTestId });
      reportTest(label, true);
      setHasPassedOnce(true);
    } catch {
      reportTest(label, false);
    }
  }, [testFn, reportTest, findByTestId, label, hasPassedOnce]);

  return null;
}

export function useBugTestSummary() {
  const { getTestSummary, subscribe } = useBugTestContext();
  const [testSummary, setTestSummary] = useState(getTestSummary());

  subscribe(() => {
    setTestSummary(getTestSummary());
  });

  const passed = useMemo(
    () => Object.values(testSummary).every((b) => b),
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
