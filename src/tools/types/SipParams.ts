export type SipParams = {
    durationInMonth:number;
    monthlyAmount:number;
    rateOfReturn:number;
}

export interface SipGrowth {
    month: number;
    total_investment:number;
    monthly_growth:number;
    total_growth:number;
    totalAmount:number;
}