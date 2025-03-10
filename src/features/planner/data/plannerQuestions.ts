
import { Question } from "../types/plannerTypes";

export const questions: Question[] = [
  {
    title: "1. Quran Recitation Goal",
    question: "What is your Quran recitation target for Ramadan?",
    options: [
      { label: "Complete the Quran 4 or more times (4+ Khatm)", value: "A" },
      { label: "Complete the Quran 3 times (3 Khatm)", value: "B" },
      { label: "Complete the Quran 2 times (2 Khatm)", value: "C" },
      { label: "Read a total of 15 juz during Ramadan", value: "D" },
    ],
  },
  {
    title: "2. Sunnah Prayers (Nawafil) Plan",
    question:
      "How do you plan to observe your Sunnah prayers after the obligatory salat?",
    options: [
      {
        label: `12 – Standard practice:
• 2 Rak'ahs before Fajr
• 4 Rak'ahs for Dhuhr (split as 2 Rak'ahs before Dhuhr—with 2 Salams—and 2 Rak'ahs after Dhuhr)
• 2 Rak'ahs after Maghrib
• 2 Rak'ahs after 'Isha`,
        value: "A",
      },
      {
        label:
          "12+ – Standard 12 (as above) plus additional voluntary (nafl) prayers throughout the day",
        value: "E",
      },
    ],
  },
  {
    title: "3. Azkar (Remembrance of Allah) Frequency",
    question: "What is your daily goal for reciting Azkar?",
    options: [
      { label: "1000 times per day", value: "A" },
      { label: "750 times per day", value: "B" },
      { label: "500 times per day", value: "C" },
      { label: "250 times per day", value: "D" },
      { label: "100 times per day", value: "E" },
    ],
  },
  {
    title: "4. Taraweeh Preference",
    question: "How do you prefer to observe Taraweeh prayers?",
    options: [
      { label: "Attend group Taraweeh at the mosque", value: "A" },
      { label: "Pray Taraweeh at home using a structured plan", value: "B" },
      { label: "Alternate between mosque and home", value: "C" },
      {
        label: "Skip Taraweeh and focus on Qiyam or other prayers",
        value: "D",
      },
    ],
  },
  {
    title: "5. Sadaqah (Charitable Acts) Approach",
    question: "What is your approach to Sadaqah during Ramadan?",
    options: [
      { label: "Daily small donations or acts of kindness", value: "A" },
      { label: "One major donation per week", value: "B" },
      { label: "Organize a charity event once during Ramadan", value: "C" },
      { label: "Give Sadaqah whenever the opportunity arises", value: "D" },
    ],
  },
];
