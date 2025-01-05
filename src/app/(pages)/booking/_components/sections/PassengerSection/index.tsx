"use client";

import { Camera, MessageCircle } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";

import Title from "../../Title";

import { Button } from "@/app/_components/Button";
import { type 항공편Type } from "@/types";

type 탑승객Type = keyof 항공편Type["탑승객"];

const PassengerSection = ({
  탑승객,
  onValidChange,
}: {
  탑승객: 항공편Type["탑승객"];
  onValidChange: (isValid: boolean) => void;
}) => {
  const defaultStatus = Object.entries(탑승객).reduce(
    (acc, [type, count]) => {
      Array.from({ length: count }).forEach((_, i) => {
        acc[`${type}${i + 1}`] = false;
      });
      return acc;
    },
    {} as Record<string, boolean>,
  );

  const [status, setStatus] = useState(defaultStatus);

  const isValid = Object.values(status).every((v) => v);

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  return (
    <div className="flex flex-col gap-6 pb-20">
      <Title description="여권 정보를 등록해 주세요.">탑승객 정보</Title>
      {Object.entries(탑승객).map(([key, value]) => (
        <Fragment key={key}>
          {Array.from({ length: value }).map((_, index) => (
            <PassengerItem
              key={`${key}-${index}`}
              type={key as 탑승객Type}
              index={index}
              status={status[`${key}${index + 1}`]}
              onComplete={() => {
                setStatus((prev) => ({
                  ...prev,
                  [`${key}${index + 1}`]: true,
                }));
              }}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default PassengerSection;

const PassengerItem = ({
  type,
  index,
  onComplete,
  status,
}: {
  type: 탑승객Type;
  index: number;
  onComplete: () => void;
  status: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <span className="text-sm font-bold">
        {type} {index + 1}{" "}
        {status && (
          <m.span
            className="ml-2 rounded-full bg-rose-500 px-2 py-1 text-xs text-white"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            완료
          </m.span>
        )}
      </span>
      <AnimatePresence mode="sync">
        {!status && (
          <m.div
            initial={{ opacity: 1, height: "auto" }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.2 },
                opacity: { duration: 0.1 },
              },
            }}
            className="flex flex-col gap-2"
          >
            <Button
              className="relative bg-gray-300 text-black hover:bg-gray-400 active:bg-gray-400"
              onClick={onComplete}
            >
              <input
                type="file"
                capture="environment"
                className="absolute left-0 top-0 size-full opacity-0"
              />
              <Camera className="size-4" />
              카메라로 여권 스캔
            </Button>
            <Button
              className="bg-yellow-300 text-black hover:bg-yellow-400 active:bg-yellow-400"
              onClick={onComplete}
            >
              <MessageCircle className="size-4" />
              카카오로 요청하기
            </Button>
            <Button variant="outline" onClick={onComplete}>
              직접 입력하기
            </Button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
