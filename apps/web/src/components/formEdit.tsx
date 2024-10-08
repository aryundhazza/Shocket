'use client';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getToken } from '@/lib/server';
import { updateEvent } from '@/lib/event';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

interface EventFormProps {
  event: {
    id: number;
    name: string;
    description: string;
    category: string;
    ticketTypes: string;
    organizerId: number;
    price: number;
    seatsAvailable: number;
    location: string;
    dateTime: string;
    image: string;
    slug: string;
  };
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().nullable(),
  seatsAvailable: Yup.number().required('Seats available is required'),
  location: Yup.string().required('Location is required'),
  dateTime: Yup.date().required('Date and time are required'),
});

const FormEdit: React.FC<EventFormProps> = ({ event }) => {
  const router = useRouter();
  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const token = await getToken();
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      formData.append('dateTime', new Date(values.dateTime).toISOString());

      const { result, ok } = await updateEvent(values, token as string);

      if (!ok) throw new Error(result.msg);

      toast.success('Event updated successfully!');

      router.push('/myevents');
    } catch (error) {
      toast.error('Error updating event.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDateForDateTimeLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formattedDateTime = formatDateForDateTimeLocal(
    new Date(event.dateTime),
  );

  return (
    <>
      <Formik
        initialValues={{
          ...event,
          dateTime: formattedDateTime,
          description: event.description.replace(/(<([^>]+)>)/gi, ''),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Image
              className="h-[350px] max-sm:h-[200px] max-md:h-[300px] w-full my-5 shadow rounded-lg"
              src={event.image}
              alt={event.name}
            />
            <div className="mb-4">
              <h5 className="mb-2 text-[32px] max-md:text-[24px] font-bold tracking-tight text-gray-900 dark:text-white">
                <Field
                  name="name"
                  className="text-2xl w-full border rounded p-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </h5>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <Field
                  name="organizer.name"
                  readOnly
                  className="font-bold text-[18px] max-md:text-[14px] border rounded p-2"
                />
              </div>

              <div>
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Deskripsi
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Stok Tiket
                  </label>
                  <Field
                    name="seatsAvailable"
                    type="number"
                    className="border p-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="seatsAvailable"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Harga Tiket
                  </label>
                  <Field
                    name="price"
                    type="number"
                    step="0.01"
                    className="border p-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Lokasi
                </label>
                <Field name="location" className="border p-2 rounded w-full" />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tanggal dan Waktu
                </label>
                <Field
                  name="dateTime"
                  type="datetime-local"
                  className="border p-2 rounded w-full"
                />
                <ErrorMessage
                  name="dateTime"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              {isSubmitting ? 'Updating...' : 'Update Event'}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default FormEdit;
