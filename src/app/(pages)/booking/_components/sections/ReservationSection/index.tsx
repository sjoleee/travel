"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Title from "../../Title";
import { 예약시_입력정보 } from "./types";

import { Input } from "@/app/_components/Input";
import { Label } from "@/app/_components/Label";
import USERMOCK from "@/mocks/USERMOCK";

interface ReservationFormData {
  [key: string]: string;
}

const ReservationSection = ({ onValidChange }: { onValidChange?: (isValid: boolean) => void }) => {
  const {
    register,
    formState: { isValid },
  } = useForm<ReservationFormData>({
    mode: "onChange",
    defaultValues: USERMOCK,
  });

  useEffect(() => {
    onValidChange?.(isValid);
  }, [isValid, onValidChange]);

  return (
    <div className="flex flex-col gap-6">
      <Title description="정보가 맞는지 확인해 주세요.">예약자 정보</Title>

      {예약시_입력정보.map((item) => (
        <div key={item} className="flex flex-col gap-2">
          <Label htmlFor={item}>{item}</Label>
          <Input id={item} {...register(item, { required: true })} defaultValue={USERMOCK[item]} />
        </div>
      ))}
    </div>
  );
};

export default ReservationSection;
