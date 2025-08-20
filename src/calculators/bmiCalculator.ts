// src/calculators/bmiCalculator.ts
import { BMIData, BMIResult } from '../types';

export class BMICalculator {
    private heightFtInput: HTMLInputElement;
    private heightInInput: HTMLInputElement;
    private weightInput: HTMLInputElement;
    private calculateBtn: HTMLButtonElement;
    private recalculateBtn: HTMLButtonElement;
    private resultContainer: HTMLElement;
    private bmiDisplay: HTMLElement;

    constructor() {
        this.heightFtInput = document.getElementById('height-ft') as HTMLInputElement;
        this.heightInInput = document.getElementById('height-in') as HTMLInputElement;
        this.weightInput = document.getElementById('weight') as HTMLInputElement;
        this.calculateBtn = document.getElementById('calculate-bmi-btn') as HTMLButtonElement;
        this.recalculateBtn = document.getElementById('bmi-recalculate') as HTMLButtonElement;
        this.resultContainer = document.getElementById('bmi-result') as HTMLElement;
        this.bmiDisplay = document.getElementById('bmi-display') as HTMLElement;
    }

    init(): void {
        this.calculateBtn.addEventListener('click', this.calculateBMI.bind(this));
        this.recalculateBtn.addEventListener('click', () => this.resultContainer.classList.remove('show'));
    }

    calculateBMI(): void {
        const heightFt = parseInt(this.heightFtInput.value) || 0;
        const heightIn = parseInt(this.heightInInput.value) || 0;
        const weight = parseFloat(this.weightInput.value);

        if (heightFt === 0 && heightIn === 0) {
            alert('Please enter your height');
            return;
        }

        if (!weight || weight <= 0) {
            alert('Please enter a valid weight');
            return;
        }

        // Convert height to meters
        const totalInches = (heightFt * 12) + heightIn;
        const heightInMeters = totalInches * 0.0254;

        // Calculate BMI
        const bmi = weight / (heightInMeters * heightInMeters);
        const bmiCategory = this.getBMICategory(bmi);

        const result: BMIResult = {
            bmi,
            category: bmiCategory,
            heightFt,
            heightIn,
            weight
        };

        this.displayResult(result);
    }

    private getBMICategory(bmi: number): BMIData {
        if (bmi < 18.5) {
            return { 
                category: 'Underweight', 
                color: '#3498db', 
                message: 'You may need to gain weight. Consult a healthcare professional.', 
                tips: [
                    'Eat more calorie-dense foods',
                    'Include strength training in your routine',
                    'Consult a doctor for personalized advice'
                ]
            };
        } else if (bmi < 25) {
            return { 
                category: 'Normal Weight', 
                color: '#27ae60', 
                message: 'You have a healthy weight. Keep it up!', 
                tips: []
            };
        } else if (bmi < 30) {
            return { 
                category: 'Overweight', 
                color: '#f39c12', 
                message: 'You may need to lose some weight for better health. This could affect insurance rates.', 
                tips: [
                    'Exercise for at least 30 minutes per day',
                    'Eat whole foods that are as close to their natural state as possible',
                    'Drink 6-8 liters of water daily',
                    'Reduce your carb intake',
                    'Get enough sleep'
                ]
            };
        } else {
            return { 
                category: 'Obese', 
                color: '#e74c3c', 
                message: 'Consider consulting a healthcare professional for weight management. High BMI may lead to higher insurance premiums or rejection.', 
                tips: [
                    'Exercise for at least 30 minutes per day',
                    'Eat whole foods that are as close to their natural state as possible',
                    'Eat protein-rich foods',
                    'Drink 6-8 liters of water daily',
                    'Reduce your carb intake',
                    'Avoid processed foods',
                    'Get enough sleep'
                ]
            };
        }
    }

    private displayResult(result: BMIResult): void {
        let tipsHtml = '';
        if (result.category.tips.length > 0) {
            tipsHtml = `
                <div class="tips-section">
                    <h4>Here are some tips to maintain a healthy weight</h4>
                    <ul>
                        ${result.category.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        this.bmiDisplay.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 3rem; font-weight: bold; color: ${result.category.color}; margin-bottom: 15px;">
                    ${result.bmi.toFixed(1)}
                </div>
                <div class="bmi-category" style="color: ${result.category.color};">
                    ${result.category.category}
                </div>
                <div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                    ${result.category.message}
                </div>
                ${tipsHtml}
            </div>
            <div class="result-details">
                <div class="detail-row">
                    <span>Height:</span>
                    <span>${result.heightFt}' ${result.heightIn}"</span>
                </div>
                <div class="detail-row">
                    <span>Weight:</span>
                    <span>${result.weight} kg</span>
                </div>
                <div class="detail-row">
                    <span>BMI:</span>
                    <span>${result.bmi.toFixed(2)}</span>
                </div>
            </div>
            <div style="margin-top: 20px; font-size: 0.9rem; opacity: 0.8;">
                <strong>BMI Categories:</strong><br>
                Underweight: Below 18.5<br>
                Normal: 18.5 - 24.9<br>
                Overweight: 25.0 - 29.9<br>
                Obese: 30.0 and above
            </div>
        `;

        this.resultContainer.classList.add('show');
    }
}