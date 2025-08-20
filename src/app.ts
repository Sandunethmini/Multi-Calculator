import './styles.css';
import { AgeCalculator } from './calculators/ageCalculator';
import { PremiumCalculator } from './calculators/premiumCalculator';
import { BMICalculator } from './calculators/bmiCalculator';
import { initializeDateSelectors } from './utils/dateUtils';

class App {
    private ageCalculator: AgeCalculator;
    private premiumCalculator: PremiumCalculator;
    private bmiCalculator: BMICalculator;
    private calculatorContainer: HTMLElement;

    constructor() {
        this.ageCalculator = new AgeCalculator();
        this.premiumCalculator = new PremiumCalculator();
        this.bmiCalculator = new BMICalculator();
        this.calculatorContainer = document.querySelector('.calculator-container') as HTMLElement;
        this.init();
    }

    private init(): void {
        // Initialize date selectors
        initializeDateSelectors();

        // Initialize calculator switcher
        this.initializeCalculatorSwitcher();

        // Initialize event listeners for calculators
        this.ageCalculator.init();
        this.premiumCalculator.init();
        this.bmiCalculator.init();

        // Initially hide the calculator container
        this.calculatorContainer.style.display = 'none';
    }

    private initializeCalculatorSwitcher(): void {
        const cards = document.querySelectorAll<HTMLDivElement>('.calc-card');
        const calculators = document.querySelectorAll<HTMLDivElement>('.calculator');

        cards.forEach((card: HTMLDivElement) => {
            card.addEventListener('click', () => {
                this.activateCard(card, cards, calculators);
            });
            card.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.activateCard(card, cards, calculators);
                }
            });
        });
    }

    private activateCard(
        selectedCard: HTMLDivElement,
        cards: NodeListOf<HTMLDivElement>,
        calculators: NodeListOf<HTMLDivElement>
    ): void {
        cards.forEach((c) => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });
        selectedCard.classList.add('active');
        selectedCard.setAttribute('aria-pressed', 'true');

        // Show container
        this.calculatorContainer.style.display = 'block';

        calculators.forEach((calc) => {
            calc.classList.remove('active');
        });

        const targetCalc = selectedCard.getAttribute('data-calc');
        if (targetCalc) {
            const targetCalculator = document.getElementById(`${targetCalc}-calculator`);
            if (targetCalculator) {
                targetCalculator.classList.add('active');
            }
        }

        // Hide all results on switch
        document.querySelectorAll('.result').forEach((result) => {
            result.classList.remove('show');
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
