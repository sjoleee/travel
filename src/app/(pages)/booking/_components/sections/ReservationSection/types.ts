export const 예약시_입력정보 = ["이름", "이메일", "전화번호"] as const;
export type 예약시_입력정보_Type = (typeof 예약시_입력정보)[number];

export interface StepState<T> {
  currentStep: T;
  reachedStep: T;
}
