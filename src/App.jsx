import React, { useEffect, useState } from "react";
import { Trophy, Award, Star } from "lucide-react";
import { cn } from "./lib/utils";
import Papa from "papaparse";
import "./index.css";
import logo from './assets/ctrlcreate@3x.png'
const getRankStyles = (rank) => {
  switch (rank) {
    case 1:
      return {
        icon: <Trophy className="h-5 w-5 text-yellow-400" />,
        cardClassName:
          "bg-yellow-400/10 border-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]",
        rankColor: "text-yellow-400",
      };
    case 2:
      return {
        icon: <Award className="h-5 w-5 text-slate-300" />,
        cardClassName:
          "bg-slate-400/10 border-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.2)]",
        rankColor: "text-slate-300",
      };
    case 3:
      return {
        icon: <Star className="h-5 w-5 text-orange-400" />,
        cardClassName:
          "bg-orange-400/10 border-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.3)]",
        rankColor: "text-orange-400",
      };
    default:
      return {
        icon: null,
        cardClassName:
          "border-[rgba(255,255,255,0.1)] hover:border-primary focus-within:border-primary",
        rankColor: "text-white",
      };
  }
};

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sheetUrl =
      "https://docs.google.com/spreadsheets/d/15zEvIiFIZUSzD4UozChS8gmZxmo9GyfmfFRelmRu0Hw/export?format=csv"; // replace with your sheet link

    fetch(sheetUrl)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsed = results.data
              .filter((row) => row.Avg && !isNaN(row.Avg))
              .map((row) => ({
                team: row.Team,
                avg: Number(parseFloat(row.Avg).toFixed(1)),
              }));
            setTeams(parsed);
            setLoading(false);
          },
        });
      });
  }, []);

  const sortedData = [...teams].sort((a, b) => b.avg - a.avg);

  return (
    <div className="min-h-screen bg-[#1a1b2e]">
      <section className="bg-background font-body text-foreground py-16 md:py-24">
        <div className="container mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <img src={logo} alt="Logo" className="mx-auto mb-8 w-52" />

          <h2 className=" text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-white" style={{ fontFamily: 'Pixelify Sans' }}>
            <span className="text-primary text-pink-500" style={{ fontFamily: 'Pixelify Sans' }}>//</span> LEADERBOARD
          </h2>

          {loading ? (
            <p className="text-center text-white">Loading leaderboard...</p>
          ) : (
            <ol className="space-y-4">
              {sortedData.map((entry, index) => {
                const rank = index + 1;
                const rankInfo = getRankStyles(rank);

                return (
                  <li
                    key={entry.team}
                    className={cn(
                      "flex items-center rounded-xl p-4 sm:p-6 border transition-all duration-200 ease-in-out",
                      "bg-[rgba(255,255,255,0.05)] shadow-[0_4px_6px_rgba(0,0,0,0.1),_0_2px_4px_rgba(0,0,0,0.06)]",
                      "hover:scale-[1.02] hover:shadow-xl focus-within:scale-[1.02] focus-within:shadow-xl",
                      rankInfo.cardClassName
                    )}
                    aria-label={`Rank ${rank}: ${entry.team} with a score of ${entry.avg.toFixed(
                      1
                    )}`}
                    tabIndex={0}
                  >
                    <div className="flex w-16 shrink-0 items-center justify-start gap-4">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                        {rankInfo.icon}
                      </div>
                      <span
                        className={cn(
                          "text-center text-sm font-bold",
                          rankInfo.rankColor
                        )}
                      >
                        {rank}
                      </span>
                    </div>
                    <div className="flex-grow px-2 md:px-4">
                      <p className="text-base font-semibold text-white sm:text-lg">
                        {entry.team}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-body text-base font-bold text-white">
                        {entry.avg.toFixed(1)}
                      </p>
                      <p className="text-xs text-white">AVG</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
