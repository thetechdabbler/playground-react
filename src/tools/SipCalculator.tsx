import React, { FormEventHandler, useEffect, useState } from "react";
import { CalculateSip } from "./CalculateSip";
import { SipGrowth, SipParams } from "./types/SipParams";

interface FormElements extends HTMLFormControlsCollection {
    duration: HTMLInputElement,
    sipAmount: HTMLInputElement,
    growthRate: HTMLInputElement
  }
interface SipFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export default function SipCalculator() {

    const [sipParams, setSipParams] = useState<SipParams>({
        monthlyAmount: 1000,
        durationInMonth: 12,
        rateOfReturn: 10
    })

    const handleSubmit:FormEventHandler<HTMLFormElement> = (event:React.FormEvent<SipFormElement>) => {
        event.preventDefault();

        const formElements:FormElements = event.currentTarget.elements
       
        const params:SipParams = {
            monthlyAmount: Number(formElements.sipAmount.value),
            durationInMonth: Number(formElements.duration.value),
            rateOfReturn: Number(formElements.growthRate.value)
        }

        setSipParams(params)
    }
  
    const [growth, setGrowth] = useState<SipGrowth[]>([])
    
    useEffect(function() {
        const growth:SipGrowth[] = CalculateSip({
            monthlyAmount: sipParams.monthlyAmount,
            durationInMonth: sipParams.durationInMonth,
            rateOfReturn: sipParams.rateOfReturn
        })

        setGrowth(growth)

    },[sipParams])

    return <div id="sip_container">
        <h1>Sip Calculator </h1>
        <form id="sip_form" onSubmit={handleSubmit}>
            <div className="form-fields">
                <label htmlFor="duration">Sip Duration ( In Years )</label>
                <input type="number" id="duration" min={1} max={30} defaultValue={sipParams.durationInMonth}/>
            </div>
            <div className="form-fields">
                <label htmlFor="sipAmount">Sip Amount</label>
                <input type="number" id="sipAmount" defaultValue={sipParams.monthlyAmount} />
            </div>
            <div className="form-fields">
                <label htmlFor="growthRate">Rate of return</label>
                <input type="number" id="growthRate" defaultValue={sipParams.rateOfReturn} />
            </div>
            <div className="form-fields">
                <button>Submit</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Month</td>
                            <td>Invested Amounth</td>
                            <td>Growth</td>
                            <td>Total Growth</td>
                            <td>Total Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {growth.map(function(sipGrowth:SipGrowth) {
                            return <tr key={sipGrowth.month}>
                                <td>{sipGrowth.month}</td>
                                <td>{sipGrowth.total_investment.toFixed(2)}</td>
                                <td>{sipGrowth.monthly_growth.toFixed(2)}</td>
                                <td>{sipGrowth.total_growth.toFixed(2)}</td>
                                <td>{sipGrowth.totalAmount.toFixed(0)}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </form>
    </div>
}