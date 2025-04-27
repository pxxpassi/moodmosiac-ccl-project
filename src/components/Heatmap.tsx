"use client";
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

interface HeatmapProps {
  entries: { date: string; count: number }[];
}

export const Heatmap: React.FC<HeatmapProps> = ({ entries }) => {
  // Convert entries to the format required by react-calendar-heatmap
  const heatmapData = entries.map(entry => ({
    date: entry.date,
    count: entry.count,
  }));

  // Define custom color scale based on mood intensity
  const colorScale = [
    '#ebedf0', // No entry
    '#9be9a8', // Low mood
    '#40c463', // Moderate mood
    '#30a14e', // High mood
    '#216e39', // Very high mood
  ];

  return (
    <CalendarHeatmap
      startDate={new Date('2024-01-01')}
      endDate={new Date('2024-12-31')}
      values={heatmapData}
      classForValue={value => {
        if (!value) {
          return 'color-empty';
        }
        if (value.count <= 2) {
          return 'color-github-1';
        }
        if (value.count <= 4) {
          return 'color-github-2';
        }
        if (value.count <= 6) {
          return 'color-github-3';
        }
        return 'color-github-4';
      }}
    />
  );
};
