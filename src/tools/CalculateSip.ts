import { SipGrowth, SipParams } from "./types/SipParams";


export function CalculateSip(sipParams:SipParams): SipGrowth[] {
    
    const sipAccumulations:SipGrowth[] = [];

    const monthlyReturnRate:number = ( sipParams.rateOfReturn / 1200 )
    let totalInvestedAmount:number = 0;
    let totalGrowth:number = 0;
    let totalAmount:number = 0;
    for(let i = 0; i < sipParams.durationInMonth; i++) {
        totalInvestedAmount += sipParams.monthlyAmount
        const growth:number = (totalInvestedAmount + totalGrowth) * monthlyReturnRate
        totalGrowth += growth
        totalAmount = totalInvestedAmount + totalGrowth

        sipAccumulations.push({
            'month': i + 1,
            'total_investment': totalInvestedAmount,
            'monthly_growth': growth,
            'total_growth': totalGrowth,
            'totalAmount': totalAmount
        })

    }

    return sipAccumulations;

}

export function calculateMaturityAmount(sipParams:SipParams): number {
    const growth:SipGrowth[] = CalculateSip(sipParams);

    let maturityAmount = 0;

    maturityAmount = growth.reduce(function(prevTotal, currentGrowth:SipGrowth) {
        return prevTotal + currentGrowth.totalAmount
    }, 0)

    return maturityAmount;
}