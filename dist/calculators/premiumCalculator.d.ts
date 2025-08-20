export declare class PremiumCalculator {
    private policyTypeSelect;
    private sumInsuredSelect;
    private ageInput;
    private policyPeriodSelect;
    private hospitalCashCheckbox;
    private criticalIllnessCheckbox;
    private resultContainer;
    private breakdownContainer;
    private totalContainer;
    constructor();
    calculatePremium(): void;
    private calculateInsurancePremium;
    private displayResult;
}
