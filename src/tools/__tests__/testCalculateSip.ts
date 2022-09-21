import { calculateMaturityAmount } from "../CalculateSip"
test('Maturity amount is correct', () => {
    expect(
        calculateMaturityAmount({
            monthlyAmount: 1000,
            durationInMonth: 0,
            rateOfReturn: 0
        })
    ).toBe(0)
    expect(
        calculateMaturityAmount({
            monthlyAmount: 1000,
            durationInMonth: 1,
            rateOfReturn: 10
        }).toFixed(2)
    ).toBe("1008.33")
});