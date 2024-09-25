'use client';
import React, { useState, useEffect } from 'react';
import Table from '@/components/table'; // Adjust the import path as needed
import { getToken, getUserId } from '@/lib/server';
import { toast } from 'react-toastify';
import { getRegistration } from '@/lib/event';

// Example function to fetch participant data (replace with actual API call)

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

  const fetchParticipantData = async () => {
    // Replace with your data fetching logic
    try {
      const token = await getToken();
      const organizerId = await getUserId();
      const input = {
        organizerId: Number(organizerId),
      };
      const { result, ok } = await getRegistration(input, token);
      if (!ok) throw new Error(result.msg);
      setData(result.reviews);
    } catch (error) {
      toast.error((error as string) || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchParticipantData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">List Peserta</h1>
      <Table data={data} />
    </div>
  );
};

export default PesertaPage;
