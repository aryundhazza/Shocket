import Link from 'next/link';
import { useEffect, useState } from 'react';
import { splitStr } from '../helper/splitStr';

interface ICardEvent {
  title?: string;
  image?: string;
  avatar?: string;
  email?: string;
  id?: string;
  slug: string;
  data: any;
}

export const CardEvent: React.FC<ICardEvent> = ({
  title,
  image,
  avatar,
  email,
  id,
  slug,
  data,
}) => {
  const [base, setBase] = useState<string>('/event');
  console.log(window.location.href, 'HREFF');

  useEffect(() => {
    if (window.location.href.indexOf('myevent') > 1) {
      console.log('MASOKKK');
      setBase('/myevents');
    }
  }, []);

  return (
    <a href={`${base}/${slug}`} className="flex">
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
        <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md ">
          <img
            src={data?.image}
            alt="card-image"
            className="h-56 w-full flex justify-center"
          />
        </div>
        <div className="p-2">
          <h6 className=" text-slate-800 text-xl font-semibold">{data.name}</h6>
          <div className=" items-center text-sm font-medium  text-gray-400">
            {splitStr(data.location, 20)}
          </div>
        </div>

        <div className="p-2">
          <div className="items-center text-sm font-medium  text-black">
            {' '}
            Available : {data?.seatsAvailable}
          </div>
          <div className=" items-center text-sm font-medium  text-red-500">
            {data.price != 0
              ? Intl.NumberFormat('id', {
                  currency: 'IDR',
                  style: 'currency',
                }).format(data?.price)
              : 'free'}
          </div>
        </div>
      </div>
    </a>
  );
};
