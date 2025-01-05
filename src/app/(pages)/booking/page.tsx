"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import Title from "./_components/Title";
import PassengerSection from "./_components/sections/PassengerSection";
import ReservationSection from "./_components/sections/ReservationSection";

import { Button } from "@/app/_components/Button";
import BottomCTA from "@/app/_components/CTA/BottomCTA";
import { Checkbox } from "@/app/_components/Checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/app/_components/Drawer";
import Arrow from "@/app/_components/icons/Arrow";
import { Funnel, FunnelController, FunnelItem } from "@/components/Funnel";
import { type 항공편Type } from "@/types";
import cn from "@/utils/cn";

export default function Booking() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPage />
    </Suspense>
  );
}

function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flightParam = searchParams.get("flight");

  const [pingCTA, setPingCTA] = useState(false);
  const [showFunnel, setShowFunnel] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [checked, setChecked] = useState(false);
  const checkAll = () => {
    setChecked(true);
  };

  if (!flightParam) {
    return <div>항공편 정보가 없습니다.</div>;
  }

  const { 항공사명, 가는편, 오는편, 탑승객 }: 항공편Type = JSON.parse(
    decodeURIComponent(flightParam),
  );

  return (
    <>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <BookingTitle
          onTransitionEnd={() => setShowFunnel(true)}
          가는편={가는편}
          오는편={오는편}
          탑승객={탑승객}
          항공사명={항공사명}
        />

        {showFunnel && (
          <Funnel>
            <FunnelItem step={0}>
              <ReservationSection onValidChange={(isValid) => setPingCTA(isValid)} />
            </FunnelItem>
            <FunnelItem step={1}>
              <PassengerSection 탑승객={탑승객} onValidChange={(isValid) => setPingCTA(isValid)} />
            </FunnelItem>

            <FunnelController>
              {({ next, currentStep, totalSteps }) => (
                <BottomCTA
                  ping={pingCTA}
                  onClick={() => {
                    if (currentStep === totalSteps - 1) {
                      setOpenDrawer(true);
                    } else {
                      next();
                    }
                  }}
                  disabled={!pingCTA}
                >
                  다음
                </BottomCTA>
              )}
            </FunnelController>
          </Funnel>
        )}
      </div>

      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>이용규정에 동의해 주세요.</DrawerTitle>
            <DrawerDescription>필수로 동의가 필요한 것만 요청드릴게요.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-2 px-4 pb-16">
            <Button variant="outline" className="h-12 justify-between text-left">
              <div className="flex items-center gap-2">
                <Checkbox checked={checked} />
                <span>요금규정</span>
              </div>
              <Arrow className="size-4 text-gray-300" />
            </Button>
            <Button variant="outline" className="h-12 justify-between text-left">
              <div className="flex items-center gap-2">
                <Checkbox checked={checked} />
                <span>예약 및 환불 규정</span>
              </div>
              <Arrow className="size-4 text-gray-300" />
            </Button>
            <Button variant="outline" className="h-12 justify-between text-left">
              <div className="flex items-center gap-2">
                <Checkbox checked={checked} />
                <span>개인정보 수집 및 이용 동의</span>
              </div>
              <Arrow className="size-4 text-gray-300" />
            </Button>
            <Button variant="outline" className="h-12 justify-between text-left">
              <div className="flex items-center gap-2">
                <Checkbox checked={checked} />
                <span>개인정보 제 3자 제공 동의</span>
              </div>
              <Arrow className="size-4 text-gray-300" />
            </Button>
          </div>
          <DrawerFooter className="pt-2">
            <BottomCTA
              onClick={() => {
                checkAll();
                setOpenDrawer(false);
                router.push("/booking/complete");
              }}
            >
              모두 동의하고 예약하기
            </BottomCTA>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const BookingTitle = ({
  가는편,
  오는편,
  탑승객,
  항공사명,
  onTransitionEnd,
}: {
  가는편: 항공편Type["가는편"];
  오는편: 항공편Type["오는편"];
  탑승객: 항공편Type["탑승객"];
  항공사명: 항공편Type["항공사명"];
  onTransitionEnd?: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onTransitionEnd) {
        onTransitionEnd();
      }
    }, 1900);
    return () => clearTimeout(timer);
  }, [onTransitionEnd]);

  return (
    <div className="overflow-hidden transition-[max-height] duration-300 ease-in-out">
      <Funnel>
        <FunnelItem autoNext={{ delay: 1400 }} step={0}>
          <Title>
            <strong className="font-bold text-primary">{가는편.출발지}</strong>에서{" "}
            <strong className="font-bold text-primary">{가는편.도착지}</strong>까지{"\n"}
            {탑승객.성인 && (
              <strong className="font-bold text-primary">성인 {탑승객.성인}명, </strong>
            )}
            {탑승객.청소년 && (
              <strong className="font-bold text-primary">청소년 {탑승객.청소년}명, </strong>
            )}
            {탑승객.유아 && (
              <strong className="font-bold text-primary">유아 {탑승객.유아}명</strong>
            )}
            이 왕복하는
            {"\n"}
            <strong className="font-bold text-primary">{항공사명}</strong> 항공편을 예약할게요.
          </Title>
        </FunnelItem>
        <FunnelItem step={1}>
          <span className="text-sm">
            <strong className="font-bold text-primary">{항공사명}</strong>을 타고{" "}
            <strong className="font-bold text-primary">{가는편.출발지}</strong>에서{" "}
            <strong className="font-bold text-primary">{가는편.도착지}</strong>까지{" | "}
          </span>

          {탑승객.성인 && (
            <span className="text-sm">
              성인 {탑승객.성인}명{탑승객.유아 || 탑승객.청소년 ? ", " : ""}
            </span>
          )}

          {탑승객.청소년 && (
            <span className="text-sm">
              청소년 {탑승객.청소년}명{탑승객.유아 ? ", " : ""}
            </span>
          )}

          {탑승객.유아 && <span className="text-sm">유아 {탑승객.유아}명</span>}

          <FlightInfo 가는편={가는편} 오는편={오는편} />
        </FunnelItem>
      </Funnel>
    </div>
  );
};

const FlightInfo = ({
  가는편,
  오는편,
  className,
}: {
  가는편: 항공편Type["가는편"];
  오는편: 항공편Type["오는편"];
  className?: string;
}) => {
  return (
    <div className={cn("sticky top-0 bg-white py-2", className)}>
      <div className="flex gap-4 rounded-lg bg-gray-100 px-4 py-2">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold">가는편</span>
            <span className="text-xs text-gray-500">| 2024.01.05</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs">
              {가는편.출발시각}{" "}
              <span className="text-[10px] text-gray-500">({가는편.출발공항})</span> -{" "}
              {가는편.도착시각}{" "}
              <span className="text-[10px] text-gray-500">({가는편.도착공항})</span>
            </span>

            <span className="text-xs text-gray-500">위탁수화물 15kg | 일반석</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold">오는편</span>
            <span className="text-xs text-gray-500">| 2024.01.08</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs">
              {오는편.출발시각}{" "}
              <span className="text-[10px] text-gray-500">({오는편.출발공항})</span> -{" "}
              {오는편.도착시각}{" "}
              <span className="text-[10px] text-gray-500">({오는편.도착공항})</span>
            </span>
            <span className="text-xs text-gray-500">위탁수화물 15kg | 일반석</span>
          </div>
        </div>
      </div>
    </div>
  );
};
