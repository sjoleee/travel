import { type ComponentProps } from "react";
import Link from "next/link";

import { Button } from "../_components/Button";
import Arrow from "../_components/icons/Arrow";

import cn from "@/utils/cn";
import { type 항공편Type } from "@/types";
import getTimeDiff from "@/utils/getTimeDiff";
import 항공편MOCK from "@/mocks/항공편MOCK";

export default function Home() {
  return (
    <>
      <Header />
      <div className="sticky top-16 z-50 flex h-8 items-center gap-2 border-b border-gray-100 bg-gray-50 p-4">
        <Button size="sm" className="size-fit rounded-full px-2 py-1">
          정렬
        </Button>
        <Button size="sm" className="size-fit rounded-full px-2 py-1">
          필터
        </Button>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {항공편MOCK
          .sort((a, b) => a.최저가격 - b.최저가격)
          .map((item, index) => (
            <Item key={index} {...item} />
          ))}
      </div>
    </>
  );
}

const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-16 w-full max-w-screen-sm border-b border-gray-100 bg-white p-4">
      <div className="flex h-full flex-col justify-center">
        <h1 className="text-lg font-bold">인천 - 오사카</h1>
        <span className="text-sm text-gray-500">01.05.일 - 01.08.수 | 성인 2명, 유아 1명</span>
      </div>
    </header>
  );
};

type ItemProps = ComponentProps<typeof Button> & 항공편Type;

const Item = ({
  className,
  항공사명,
  결제수단,
  최저가격,
  가는편,
  오는편,
  탑승객,
  좌석등급,
  ...props
}: ItemProps) => {
  const 항공편Data = {
    항공사명,
    결제수단,
    최저가격,
    가는편,
    오는편,
    탑승객,
    좌석등급,
  };

  return (
    <Link
      href={{
        pathname: "/booking",
        query: {
          flight: encodeURIComponent(JSON.stringify(항공편Data)),
        },
      }}
    >
      <Button
        variant="ghost"
        className={cn("w-full h-auto flex flex-col gap-2 justify-normal items-start", className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          <div
            className={cn("size-4 rounded-full", {
              "bg-orange-500": 항공사명 === "제주항공",
              "bg-red-500": 항공사명 === "아시아나항공",
              "bg-blue-500": 항공사명 === "대한항공",
              "bg-green-500": 항공사명 === "진에어",
              "bg-purple-500": 항공사명 === "티웨이항공",
              "bg-yellow-500": 항공사명 === "에어부산",
              "bg-pink-500": 항공사명 === "에어서울",
              "bg-gray-500": ![
                "제주항공",
                "아시아나항공",
                "대한항공",
                "진에어",
                "티웨이항공",
                "에어부산",
                "에어서울",
              ].includes(항공사명),
            })}
          />
          <span className="text-base">{항공사명}</span>
        </div>
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {가는편.출발시각} <span className="text-xs text-gray-400">{가는편.출발공항}</span> -{" "}
              {가는편.도착시각} <span className="text-xs text-gray-400">{가는편.도착공항}</span>
            </span>
            <div className="flex items-center gap-1">
              <Badge type={가는편.직항여부 ? "직항" : "경유"}>
                {가는편.직항여부 ? "직항" : "경유"}
              </Badge>
              <span className="text-sm">{getTimeDiff(가는편.출발시각, 가는편.도착시각)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {오는편.출발시각} <span className="text-xs text-gray-400">{오는편.출발공항}</span> -{" "}
              {오는편.도착시각} <span className="text-xs text-gray-400">{오는편.도착공항}</span>
            </span>
            <div className="flex items-center gap-1">
              <Badge type={오는편.직항여부 ? "직항" : "경유"}>
                {오는편.직항여부 ? "직항" : "경유"}
              </Badge>
              <span className="text-sm">{getTimeDiff(오는편.출발시각, 오는편.도착시각)}</span>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end gap-2">
            <div className="flex w-fit items-center gap-0.5 text-xs text-gray-500">
              <div className="flex items-center rounded-md bg-blue-100 px-1 py-0.5 font-bold">
                <span>{결제수단}</span>
                <Arrow direction="down" />
              </div>
              <span>로 결제시</span>
            </div>
            <span className="text-lg font-bold text-primary">
              왕복 {최저가격.toLocaleString()}원
            </span>
          </div>
        </div>
      </Button>
      <div className="h-px w-full bg-gray-100" />
    </Link>
  );
};

const Badge = ({
  children,
  type = "직항",
  className,
}: {
  children: string;
  type?: "직항" | "경유";
  className?: string;
}) => {
  return (
    <span
      className={cn("rounded-md px-1 py-0.5 text-xs", className, {
        "bg-blue-400 text-white": type === "직항",
        "bg-green-400 text-white": type === "경유",
      })}
    >
      {children}
    </span>
  );
};
