
import { Playlist } from "../types/seriesTypes";

export const playlists: Playlist[] = [
  {
    id: "1",
    title: "Stories of the Prophets",
    description: "Learn about the lives and lessons from the Prophets mentioned in the Quran",
    thumbnailUrl: "https://via.placeholder.com/640x360?text=Stories+of+the+Prophets",
    videos: [
      {
        id: "1-1",
        title: "Prophet Adam (AS)",
        description: "The story of the first human and prophet, Adam (AS)",
        thumbnailUrl: "https://via.placeholder.com/640x360?text=Prophet+Adam",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        duration: "25:30"
      },
      {
        id: "1-2",
        title: "Prophet Nuh (AS)",
        description: "The story of Prophet Nuh (AS) and the great flood",
        thumbnailUrl: "https://via.placeholder.com/640x360?text=Prophet+Nuh",
        videoUrl: "https://www.youtube.com/watch?v=example2",
        duration: "22:15"
      },
      {
        id: "1-3",
        title: "Prophet Ibrahim (AS)",
        description: "The story of Prophet Ibrahim (AS), the friend of Allah",
        thumbnailUrl: "https://via.placeholder.com/640x360?text=Prophet+Ibrahim",
        videoUrl: "https://www.youtube.com/watch?v=example3",
        duration: "28:45"
      }
    ]
  },
  {
    id: "2",
    title: "Ramadan Reflections",
    description: "Daily reflections for the blessed month of Ramadan",
    thumbnailUrl: "https://via.placeholder.com/640x360?text=Ramadan+Reflections",
    videos: [
      {
        id: "2-1",
        title: "The Essence of Fasting",
        description: "Understanding the true meaning and benefits of fasting",
        thumbnailUrl: "https://via.placeholder.com/640x360?text=Essence+of+Fasting",
        videoUrl: "https://www.youtube.com/watch?v=example4",
        duration: "18:20"
      },
      {
        id: "2-2",
        title: "Night of Power (Laylatul Qadr)",
        description: "The importance and virtues of Laylatul Qadr",
        thumbnailUrl: "https://via.placeholder.com/640x360?text=Laylatul+Qadr",
        videoUrl: "https://www.youtube.com/watch?v=example5",
        duration: "20:10"
      }
    ]
  },
  {
    id: "3",
    title: "Ramadan for Beginners",
    description: "A guide for those new to fasting and Ramadan practices",
    thumbnailUrl: "https://via.placeholder.com/640x360?text=Ramadan+for+Beginners",
    videos: [
      {
        id: "3-1",
        title: "How to Fast Properly",
        description: "Guidelines and tips for a proper fast",
        thumbnailUrl: "https://via.placeholder.com/640x360?text=How+to+Fast",
        videoUrl: "https://www.youtube.com/watch?v=example6",
        duration: "15:40"
      },
      {
        id: "3-2",
        title: "Preparing for Ramadan",
        description: "Steps to prepare yourself spiritually and physically",
        thumbnailUrl: "https://via.placeholder.com/640x360?text=Preparing+for+Ramadan",
        videoUrl: "https://www.youtube.com/watch?v=example7",
        duration: "17:25"
      },
      {
        id: "3-3",
        title: "Common Mistakes During Ramadan",
        description: "Common mistakes to avoid during the holy month",
        thumbnailUrl: "https://via.placeholder.com/640x360?text=Common+Mistakes",
        videoUrl: "https://www.youtube.com/watch?v=example8",
        duration: "19:35"
      }
    ]
  },
  {
    id: "4",
    title: "Quran Tafsir Series",
    description: "Explanation and interpretation of selected chapters from the Quran",
    thumbnailUrl: "https://via.placeholder.com/640x360?text=Quran+Tafsir",
    videos: [
      {
        id: "4-1",
        title: "Surah Al-Fatihah Explained",
        description: "Detailed explanation of the opening chapter of the Quran",
        thumbnailUrl: "https://via.placeholder.com/640x360?text=Surah+Al-Fatihah",
        videoUrl: "https://www.youtube.com/watch?v=example9",
        duration: "26:15"
      },
      {
        id: "4-2",
        title: "Surah Al-Baqarah (Part 1)",
        description: "Beginning of the longest chapter in the Quran",
        thumbnailUrl: "https://via.placeholder.com/640x360?text=Al-Baqarah+Part+1",
        videoUrl: "https://www.youtube.com/watch?v=example10",
        duration: "32:40"
      }
    ]
  }
];
