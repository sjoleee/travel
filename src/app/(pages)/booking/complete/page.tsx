"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { m } from "motion/react";
import { useEffect, useState } from "react";

import Title from "../_components/Title";

import CTA from "@/app/_components/CTA";

const CompletePage = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowButton(true);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-2 p-4">
      <Title description="잊지 말고 결제를 완료해주세요.">예약이 완료되었어요.</Title>

      <div className="flex flex-1 flex-col items-center justify-center pb-40">
        <DotLottieReact
          src="https://lottie.host/20c7ab2e-dd8f-4af2-b10a-8dbb94bc59b9/tNdqWKSG8M.lottie"
          autoplay
        />
      </div>

      {showButton && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-1/2 flex w-full max-w-screen-sm -translate-x-1/2 flex-col gap-2 p-4"
        >
          <CTA variant="secondary">예약 확인하기</CTA>
          <CTA>지금 바로 결제하기</CTA>
        </m.div>
      )}
    </div>
  );
};

export default CompletePage;
