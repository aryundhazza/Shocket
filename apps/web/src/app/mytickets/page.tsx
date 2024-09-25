'use client';
import React, { useState, useEffect } from 'react';
import Table from '@/components/table';
import { getToken, getUserId } from '@/lib/server';
import { getTickets } from '@/lib/event';
import { toast } from 'react-toastify';

const PesertaPage: React.FC = () => {
  const [data, setData] = useState<
    {
      id: number;
      name: string;
      email: string;
      registrationDate: string;
      event: { name: string; price: number };
      totalTicket: number;
      ticketPrice: number;
    }[]
  >([]);

  const fetchMyTicketsData = async () => {
    try {
      const token = await getToken();
      const userId = await getUserId();
      const input = {
        userId: Number(userId),
      };
      const { result, ok } = await getTickets(input, token);
      if (!ok) throw new Error(result.msg);
      setData(result.tikets);
    } catch (error) {
      toast.error((error as string) || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchMyTicketsData();
  }, []);

  console.log(data, 'DATA BOY');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">List Tiket</h1>
      {data?.length > 0 && <Table data={data} />}
    </div>
  );
};

export default PesertaPage;
