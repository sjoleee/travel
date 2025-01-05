export interface 항공편Type {
  항공사명: string;
  탑승객: {
    성인?: number;
    청소년?: number;
    유아?: number;
  };
  좌석등급: string;
  결제수단: string;
  최저가격: number;
  가는편: {
    날짜: string;
    출발지: string;
    출발시각: string;
    출발공항: string;
    도착지: string;
    도착시각: string;
    도착공항: string;
    직항여부: boolean;
  };
  오는편: {
    날짜: string;
    출발지: string;
    출발시각: string;
    출발공항: string;
    도착지: string;
    도착시각: string;
    도착공항: string;
    직항여부: boolean;
  };
}
