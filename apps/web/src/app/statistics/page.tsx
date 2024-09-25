'use client';
import React, { useState } from 'react';
import ChartOne from '@/components/chart';

const Dashboard: React.FC = () => {
  const [filteredYear, setFilteredYear] = useState<number | null>(null);

  const handleYearChange = (year: number) => {
    setFilteredYear(year);
    console.log('Tahun yang dipilih:', year);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ChartOne startYear={2024} endYear={2030} onChange={handleYearChange} />
    </div>
  );
};

export default Dashboard;
