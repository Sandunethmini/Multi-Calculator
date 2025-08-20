export interface AgeData {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    totalHours: number;
    totalMinutes: number;
    totalSeconds: number;
    daysToNextBirthday: number;
    nextBirthday: string;
}
export interface PremiumData {
    basePremium: number;
    discountAmount: number;
    premiumAfterDiscount: number;
    hospitalCashPremium: number;
    criticalIllnessPremium: number;
    totalOptionalPremium: number;
    subtotal: number;
    gst: number;
    finalPremium: number;
    policyPeriod: number;
}
export interface BMIData {
    category: string;
    color: string;
    message: string;
}
export interface BMIResult {
    bmi: number;
    category: BMIData;
    heightFt: number;
    heightIn: number;
    weight: number;
}
