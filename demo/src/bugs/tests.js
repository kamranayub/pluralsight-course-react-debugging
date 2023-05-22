import { useEffect, useState, useRef } from "react";
import { expect, use } from "chai";
import chaiDOM from "chai-dom";

use(chaiDOM);

function useBugTest(label, testFn) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    try {
      testFn();
      setPassed(true);
    } catch {}
  }, [testFn]);

  return {
    passed,
    label,
  };
}

function useBugRef() {
  const containerRef = useRef();
  const findByTestId = (id) =>
    containerRef.current.querySelector(`[data-test="${id}"]`);

  return { ref: containerRef, findByTestId };
}

export { expect, useBugRef, useBugTest };
