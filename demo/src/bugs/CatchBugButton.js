import { Button } from "grommet";
import { Bug } from "grommet-icons";

import { useBugNet } from "../BugNet";

const CatchBugButton = ({ bug }) => {
  const { catchBug } = useBugNet();
  return (
    <Button
      icon={<Bug />}
      color="accent-1"
      primary
      onClick={() => catchBug(bug.name)}
      label={`Catch the ${bug.name} for ${bug.price}!`}
    />
  );
};
export default CatchBugButton;
