import { type ComponentProps } from "react";

import CTA from ".";

const BottomCTA = (props: ComponentProps<typeof CTA>) => {
  return (
    <div className="fixed bottom-0 left-1/2 w-full max-w-screen-sm -translate-x-1/2 bg-white p-4 pt-0">
      <CTA {...props} />
    </div>
  );
};

export default BottomCTA;
