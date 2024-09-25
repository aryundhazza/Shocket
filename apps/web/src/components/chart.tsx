'use client';

import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getStatistik } from '@/lib/event';
import { getToken, getUserId } from '@/lib/server';

interface SelectYearProps {
  startYear: number;
  endYear: number;
  onChange: (selectedYear: number) => void;
}

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },

  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 50,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC<SelectYearProps> = ({
  startYear,
  endYear,
  onChange,
}) => {
  console.log(onchange, 'change');
  console.log(endYear, 'change');

  interface Series {
    name: string;
    data: number[];
  }

  const [series, setSeries] = useState<Series[]>([
    {
      name: 'Product One',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);

  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [terjual, setTerjual] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
    onChange(year);
  };
  const handleDefault = async (selectedYear: number) => {
    const token = await getToken();
    const userId = await getUserId();
    const data = {
      year: selectedYear,
      userId: Number(userId),
    };

    if (token) {
      const response = await getStatistik(data, token);
      console.log(response, 'RES');

      if (response.ok) {
        setSeries([
          {
            name: 'Product One',
            data: response.result.tot,
          },
        ]);
        setTerjual(response.result.terjual);
      }
    } else {
      console.error('Token tidak ditemukan');
    }
  };

  useEffect(() => {
    handleDefault(selectedYear);
  }, [selectedYear]);

  const yearOptions = [];
  for (let year = startYear; year <= endYear; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>,
    );
  }

  return (
    <div className="w-[80%] col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex justify-end">
        <label htmlFor="year-select">Pilih Tahun: </label>
        <select
          id="year-select"
          value={selectedYear ?? ''}
          onChange={handleChange}
        >
          <option value="">Pilih Tahun</option>
          {yearOptions}
        </select>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full ">
          <div className="flex ">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">
                Total Terjual : {terjual}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={500}
            width={'100%'}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
