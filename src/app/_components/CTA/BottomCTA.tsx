import { type ComponentProps } from "react";

import CTA from ".";

const BottomCTA = (props: ComponentProps<typeof CTA>) => {
  return (
    <div className="sticky bottom-0 mt-auto w-full max-w-screen-sm bg-white p-4">
      <CTA {...props} />
    </div>
  );
};

export default BottomCTA;
