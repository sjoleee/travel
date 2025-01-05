import { AnimatePresence, m } from "motion/react";
import {
  Children,
  createContext,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FunnelContextProps {
  currentStep: number;
  next: () => void;
  prev: () => void;
  go: (step: number) => void;
}

const FunnelContext = createContext<FunnelContextProps | null>(null);

interface FunnelProps {
  initialStep?: number;
  children: ReactElement[];
  onComplete?: () => void;
}

export const Funnel = ({ initialStep = 0, children, onComplete }: FunnelProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const steps = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === FunnelItem,
  );
  const totalSteps = steps.length;

  const next = () => {
    setCurrentStep((prev) => {
      if (prev < totalSteps - 1) {
        return prev + 1;
      }
      onComplete?.();
      return prev;
    });
  };
  const prev = () => setCurrentStep((prev) => Math.max(0, prev - 1));
  const go = (step: number) => setCurrentStep(step);

  return (
    <FunnelContext.Provider value={{ currentStep, next, prev, go }}>
      {children}
    </FunnelContext.Provider>
  );
};

export const useFunnel = () => {
  const context = useContext(FunnelContext);

  if (!context) {
    throw new Error("useFunnel must be used within a FunnelProvider");
  }
  return context;
};

interface FunnelItemProps {
  step: number;
  children: ReactNode;
  autoNext?: {
    delay: number;
    onNext?: () => void;
  };
}

export const FunnelItem = ({ step, children, autoNext }: FunnelItemProps) => {
  const { currentStep, next } = useFunnel();
  const isCurrentStep = currentStep === step;

  useEffect(() => {
    if (isCurrentStep && autoNext) {
      const timer = setTimeout(() => {
        autoNext.onNext?.();
        next();
      }, autoNext.delay);
      return () => clearTimeout(timer);
    }
  }, [isCurrentStep, autoNext, next]);

  return (
    <AnimatePresence mode="wait">
      {isCurrentStep && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden={!isCurrentStep}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
};

export const FunnelController = ({
  children,
}: {
  children: ReactNode | ((props: FunnelContextProps) => ReactNode);
}) => {
  const { currentStep, next, prev, go } = useFunnel();

  return (
    <>{typeof children === "function" ? children({ currentStep, next, prev, go }) : children}</>
  );
};
