// src/utils/dateUtils.ts
import { AgeData } from '../types';

export function calculateDetailedAge(birthDate: Date, currentDate: Date): AgeData {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const daysInLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += daysInLastMonth;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate total values
    const totalDays = Math.floor((currentDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Next birthday
    const nextBirthday = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < currentDate) {
        nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.floor((nextBirthday.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
        years,
        months,
        days,
        totalDays,
        totalWeeks,
        totalMonths,
        totalHours,
        totalMinutes,
        totalSeconds,
        daysToNextBirthday,
        nextBirthday: nextBirthday.toLocaleDateString('en-US', { weekday: 'long' })
    };
}

export function initializeDateSelectors(): void {
    const daySelect = document.getElementById('birth-day') as HTMLSelectElement;
    const monthSelect = document.getElementById('birth-month') as HTMLSelectElement;
    const yearSelect = document.getElementById('birth-year') as HTMLSelectElement;

    if (!daySelect || !monthSelect || !yearSelect) return;

    // Populate days
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        daySelect.appendChild(option);
    }

    // Populate months
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = (index + 1).toString();
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // Populate years
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        const option = document.createElement('option');
        option.value = year.toString();
        option.textContent = year.toString();
        yearSelect.appendChild(option);
    }
}