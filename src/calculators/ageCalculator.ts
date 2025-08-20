// src/calculators/ageCalculator.ts
import { AgeData } from '../types';
import { calculateDetailedAge } from '../utils/dateUtils';

export class AgeCalculator {
    private daySelect: HTMLSelectElement;
    private monthSelect: HTMLSelectElement;
    private yearSelect: HTMLSelectElement;
    private calculateBtn: HTMLButtonElement;
    private recalculateBtn: HTMLButtonElement;
    private resultContainer: HTMLElement;
    private ageDisplay: HTMLElement;
    private ageDetails: HTMLElement;

    constructor() {
        this.daySelect = document.getElementById('birth-day') as HTMLSelectElement;
        this.monthSelect = document.getElementById('birth-month') as HTMLSelectElement;
        this.yearSelect = document.getElementById('birth-year') as HTMLSelectElement;
        this.calculateBtn = document.getElementById('calculate-age-btn') as HTMLButtonElement;
        this.recalculateBtn = document.getElementById('age-recalculate') as HTMLButtonElement;
        this.resultContainer = document.getElementById('age-result') as HTMLElement;
        this.ageDisplay = document.getElementById('age-display') as HTMLElement;
        this.ageDetails = document.getElementById('age-details') as HTMLElement;
    }

    init(): void {
        this.calculateBtn.addEventListener('click', this.calculateAge.bind(this));
        this.recalculateBtn.addEventListener('click', () => this.resultContainer.classList.remove('show'));
    }

    calculateAge(): void {
        const day = parseInt(this.daySelect.value);
        const month = parseInt(this.monthSelect.value);
        const year = parseInt(this.yearSelect.value);

        if (!day || !month || !year) {
            alert('Please select a complete birth date');
            return;
        }

        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        
        if (birthDate > today) {
            alert('Birth date cannot be in the future');
            return;
        }

        const ageData = calculateDetailedAge(birthDate, today);
        this.displayResult(ageData);
    }

    private displayResult(ageData: AgeData): void {
        this.ageDisplay.innerHTML = `
            <div class="age-box">
                <span class="age-number">${ageData.years}</span>
                <span class="age-label">Years</span>
            </div>
            <div class="age-box">
                <span class="age-number">${ageData.months}</span>
                <span class="age-label">Months</span>
            </div>
            <div class="age-box">
                <span class="age-number">${ageData.days}</span>
                <span class="age-label">Days</span>
            </div>
        `;

        this.ageDetails.innerHTML = `
            <div class="detail-row">
                <span>Total Years:</span>
                <span>${ageData.years}</span>
            </div>
            <div class="detail-row">
                <span>Total Months:</span>
                <span>${ageData.totalMonths.toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <span>Total Weeks:</span>
                <span>${ageData.totalWeeks.toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <span>Total Days:</span>
                <span>${ageData.totalDays.toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <span>Total Hours:</span>
                <span>${ageData.totalHours.toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <span>Total Minutes:</span>
                <span>${ageData.totalMinutes.toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <span>Total Seconds:</span>
                <span>${ageData.totalSeconds.toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <span>Next Birthday:</span>
                <span>${ageData.daysToNextBirthday} days (${ageData.nextBirthday})</span>
            </div>
        `;

        this.resultContainer.classList.add('show');
    }
}