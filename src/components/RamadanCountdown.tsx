import { TimeLeft } from "@/types/ramadan";
import { translations, Language } from "@/constants/translations";

interface RamadanCountdownProps {
  timeLeft: TimeLeft;
  language: Language;
}

export const RamadanCountdown = ({
  timeLeft,
  language,
}: RamadanCountdownProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {[
        { value: timeLeft.days, label: translations[language].days },
        { value: timeLeft.hours, label: translations[language].hours },
        { value: timeLeft.minutes, label: translations[language].minutes },
        { value: timeLeft.seconds, label: translations[language].seconds },
      ].map((item, index) => (
        <div
          key={index}
          className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-primary/10 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:bg-white group"
          style={{
            animation: `fadeInScale 0.5s ease-out ${index * 0.1}s backwards`,
          }}
        >
          <div
            className="text-4xl md:text-5xl font-bold text-primary"
            style={{
              animation: "countUpFade 0.5s ease-out forwards",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {String(item.value).padStart(2, "0")}
          </div>
          <div
            className={`text-sm mt-2 text-primary/80  ${
              language === "am" ? "font-amharic" : ""
            } group-hover:text-primary transition-colors duration-300`}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};
