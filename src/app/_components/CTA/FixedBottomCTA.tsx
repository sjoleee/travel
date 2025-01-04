import { type ComponentProps } from "react";

import CTA from ".";

const FixedBottomCTA = (props: ComponentProps<typeof CTA>) => {
  return (
    <div className="fixed bottom-0 w-full max-w-3xl p-4">
      <CTA {...props} />
    </div>
  );
};

export default FixedBottomCTA;
