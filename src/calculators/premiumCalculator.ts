// src/calculators/premiumCalculator.ts
import { PremiumData } from '../types';

export class PremiumCalculator {
    private zoneBtns: NodeListOf<HTMLButtonElement>;
    private policyTypeSelect: HTMLSelectElement;
    private sumInsuredSelect: HTMLSelectElement;
    private ageInput: HTMLInputElement;
    private policyPeriodSelect: HTMLSelectElement;
    private hospitalCashCheckbox: HTMLInputElement;
    private safeguardCheckbox: HTMLInputElement;
    private standingDiscountCheckbox: HTMLInputElement;
    private doctorDiscountCheckbox: HTMLInputElement;
    private calculateBtn: HTMLButtonElement;
    private recalculateBtn: HTMLButtonElement;
    private resultContainer: HTMLElement;
    private breakdownContainer: HTMLElement;
    private totalContainer: HTMLElement;
    private zone: string = '1';

    constructor() {
        this.zoneBtns = document.querySelectorAll('.zone-btn');
        this.policyTypeSelect = document.getElementById('policy-type') as HTMLSelectElement;
        this.sumInsuredSelect = document.getElementById('sum-insured') as HTMLSelectElement;
        this.ageInput = document.getElementById('applicant-age') as HTMLInputElement;
        this.policyPeriodSelect = document.getElementById('policy-period') as HTMLSelectElement;
        this.hospitalCashCheckbox = document.getElementById('hospital-cash') as HTMLInputElement;
        this.safeguardCheckbox = document.getElementById('safeguard') as HTMLInputElement;
        this.standingDiscountCheckbox = document.getElementById('standing-discount') as HTMLInputElement;
        this.doctorDiscountCheckbox = document.getElementById('doctor-discount') as HTMLInputElement;
        this.calculateBtn = document.getElementById('calculate-premium-btn') as HTMLButtonElement;
        this.recalculateBtn = document.getElementById('premium-recalculate') as HTMLButtonElement;
        this.resultContainer = document.getElementById('premium-result') as HTMLElement;
        this.breakdownContainer = document.getElementById('premium-breakdown') as HTMLElement;
        this.totalContainer = document.getElementById('premium-total') as HTMLElement;
    }

    init(): void {
        this.calculateBtn.addEventListener('click', this.calculatePremium.bind(this));
        this.recalculateBtn.addEventListener('click', () => this.resultContainer.classList.remove('show'));
        this.zoneBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.zoneBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.zone = btn.dataset.zone || '1';
            });
        });
    }

    calculatePremium(): void {
        const policyType = this.policyTypeSelect.value;
        const sumInsured = parseInt(this.sumInsuredSelect.value);
        const age = parseInt(this.ageInput.value);
        const policyPeriod = parseInt(this.policyPeriodSelect.value);
        const hospitalCash = this.hospitalCashCheckbox.checked;
        const safeguard = this.safeguardCheckbox.checked;
        const standing = this.standingDiscountCheckbox.checked;
        const doctor = this.doctorDiscountCheckbox.checked;

        if (!age || age < 18 || age > 100) {
            alert('Please enter a valid age between 18 and 100');
            return;
        }

        const premiumData = this.calculateInsurancePremium(
            policyType, sumInsured, age, policyPeriod, hospitalCash, safeguard, standing, doctor, this.zone
        );
        this.displayResult(premiumData);
    }

    private calculateInsurancePremium(
        policyType: string,
        sumInsured: number,
        age: number,
        policyPeriod: number,
        hospitalCash: boolean,
        safeguard: boolean,
        standing: boolean,
        doctor: boolean,
        zone: string
    ): PremiumData {
        // Base premium calculation (adjusted for Sri Lanka, approx 1.5% of sum insured)
        let basePremium = sumInsured * 0.015;

        // Age factor
        if (age <= 30) basePremium *= 0.8;
        else if (age <= 40) basePremium *= 1.0;
        else if (age <= 50) basePremium *= 1.3;
        else if (age <= 60) basePremium *= 1.8;
        else basePremium *= 2.5;

        // Policy type factor
        if (policyType === 'floater') {
            basePremium *= 1.2;
        }

        // Zone factor
        let zoneFactor = 1.0;
        if (zone === '2') zoneFactor = 1.1;
        if (zone === '3') zoneFactor = 1.2;
        basePremium *= zoneFactor;

        // Policy period discount
        let periodDiscount = 0;
        if (policyPeriod === 2) periodDiscount = 0.05;
        else if (policyPeriod === 3) periodDiscount = 0.10;

        const discountAmount = basePremium * periodDiscount;
        let premiumAfterDiscount = basePremium - discountAmount;

        // Additional discounts
        let additionalDiscount = 0;
        if (standing) additionalDiscount += premiumAfterDiscount * 0.05;
        if (doctor) additionalDiscount += premiumAfterDiscount * 0.10;
        premiumAfterDiscount -= additionalDiscount;

        // Optional covers
        let hospitalCashPremium = 0;
        let safeguardPremium = 0;

        if (hospitalCash) {
            hospitalCashPremium = sumInsured * 0.0025;
        }

        if (safeguard) {
            safeguardPremium = sumInsured * 0.004;
        }

        const totalOptionalPremium = hospitalCashPremium + safeguardPremium;

        // VAT (15%)
        const subtotal = premiumAfterDiscount + totalOptionalPremium;
        const vat = subtotal * 0.15;
        const finalPremium = subtotal + vat;

        return {
            basePremium,
            discountAmount,
            additionalDiscount,
            premiumAfterDiscount,
            hospitalCashPremium,
            safeguardPremium,
            totalOptionalPremium,
            subtotal,
            vat,
            finalPremium,
            policyPeriod
        };
    }

    private displayResult(premiumData: PremiumData): void {
        this.breakdownContainer.innerHTML = `
            <div class="detail-row">
                <span>Base Premium:</span>
                <span>LKR ${Math.round(premiumData.basePremium).toLocaleString()}</span>
            </div>
            ${premiumData.discountAmount > 0 ? `
            <div class="detail-row">
                <span>Multi-year Discount:</span>
                <span>-LKR ${Math.round(premiumData.discountAmount).toLocaleString()}</span>
            </div>` : ''}
            ${premiumData.additionalDiscount > 0 ? `
            <div class="detail-row">
                <span>Additional Discounts:</span>
                <span>-LKR ${Math.round(premiumData.additionalDiscount).toLocaleString()}</span>
            </div>` : ''}
            ${premiumData.hospitalCashPremium > 0 ? `
            <div class="detail-row">
                <span>Hospital Cash:</span>
                <span>LKR ${Math.round(premiumData.hospitalCashPremium).toLocaleString()}</span>
            </div>` : ''}
            ${premiumData.safeguardPremium > 0 ? `
            <div class="detail-row">
                <span>Safeguard Benefit:</span>
                <span>LKR ${Math.round(premiumData.safeguardPremium).toLocaleString()}</span>
            </div>` : ''}
            <div class="detail-row">
                <span>VAT (15%):</span>
                <span>LKR ${Math.round(premiumData.vat).toLocaleString()}</span>
            </div>
        `;

        this.totalContainer.innerHTML = `
            <div>Total Annual Premium</div>
            <div>LKR ${Math.round(premiumData.finalPremium).toLocaleString()}</div>
            ${premiumData.policyPeriod > 1 ? `
            <div style="font-size: 1rem; margin-top: 10px;">
                ${premiumData.policyPeriod} Year Total: LKR ${Math.round(premiumData.finalPremium * premiumData.policyPeriod).toLocaleString()}
            </div>` : ''}
        `;

        this.resultContainer.classList.add('show');
    }
}