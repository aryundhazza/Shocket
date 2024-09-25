import prisma from '@/prisma';
import { Category, Prisma } from '@prisma/client';

import { Request, Response } from 'express';

export class EventController {
  async createEvent(req: Request, res: Response) {
    try {
      if (!req.file) throw 'no file uploaded';
      const link = `http://localhost:8000/api/public/event/${req?.file?.filename}`;

      const {
        name,
        category,
        price,
        dateTime,
        location,
        description,
        seatsAvailable,
        ticketTypes,
        slug,
        organizerId,
      } = JSON.parse(req.body.data);

      const event = await prisma.event.create({
        data: {
          name,
          category,
          price,
          dateTime,
          location,
          description,
          seatsAvailable,
          ticketTypes,
          slug,
          image: link,
          organizerId: organizerId,
        },
      });

      res.status(201).send({
        status: 'ok',
        msg: 'event created!',
        event,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      let {
        name,
        category,
        price,
        dateTime,
        location,
        description,
        seatsAvailable,
        ticketTypes,
        slug,
        organizerId,
        id,
      } = req.body;

      console.log(dateTime, 'datetime');

      const event = await prisma.event.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          category,
          price,
          dateTime,
          location,
          description,
          seatsAvailable,
          ticketTypes,
          slug,

          organizerId: organizerId,
        },
      });
      console.log(event, 'DATAAAAAA');

      res.status(200).send({
        status: 'ok',
        msg: 'event updated !',
        event,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getMyEvents(req: Request, res: Response) {
    try {
      // Retrieve query parameters
      const {
        search,
        page = 1,
        pageSize = 10,
        organizerId,
        category,
      } = req.query;

      const pageNumber = parseInt(page as string, 10);
      const pageSizeNumber = parseInt(pageSize as string, 10);

      if (isNaN(pageNumber) || pageNumber <= 0) {
        return res.status(400).send({
          status: 'error',
          msg: 'Invalid page number',
        });
      }

      if (isNaN(pageSizeNumber) || pageSizeNumber <= 0) {
        return res.status(400).send({
          status: 'error',
          msg: 'Invalid page size',
        });
      }

      let filter: Prisma.EventWhereInput = {};

      if (search) {
        filter.name = { contains: search as string };
      }

      if (category && category !== 'all') {
        try {
          filter.category = category as Category;
        } catch (error) {
          return res.status(400).send({
            status: 'error',
            msg: 'Invalid category value',
          });
        }
      }

      if (organizerId) {
        const organizerIdNumber = parseInt(organizerId as string, 10);
        if (!isNaN(organizerIdNumber)) {
          filter.organizerId = organizerIdNumber;
        } else {
          return res.status(400).send({
            status: 'error',
            msg: 'Invalid organizerId',
          });
        }
      }

      const [events, totalCount] = await Promise.all([
        prisma.event.findMany({
          where: filter,
          orderBy: { createdAt: 'desc' },
          skip: (pageNumber - 1) * pageSizeNumber,
          take: pageSizeNumber,
        }),
        prisma.event.count({ where: filter }),
      ]);

      res.status(200).send({
        status: 'ok',
        events,
        pagination: {
          currentPage: pageNumber,
          pageSize: pageSizeNumber,
          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / pageSizeNumber),
        },
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getEvents(req: Request, res: Response) {
    try {
      const { search, page = 1, pageSize = 10, category } = req.query;

      const pageNumber = parseInt(page as string, 10);
      const pageSizeNumber = parseInt(pageSize as string, 10);

      if (isNaN(pageNumber) || pageNumber <= 0) {
        return res.status(400).send({
          status: 'error',
          msg: 'Invalid page number',
        });
      }
      if (isNaN(pageSizeNumber) || pageSizeNumber <= 0) {
        return res.status(400).send({
          status: 'error',
          msg: 'Invalid page size',
        });
      }

      let filter: Prisma.EventWhereInput = {};
      if (search) {
        filter.name = { contains: search as string };
      }
      if (category && category !== 'all') {
        try {
          filter.category = category as Category;
        } catch (error) {
          return res.status(400).send({
            status: 'error',
            msg: 'Invalid category value',
          });
        }
      }

      const [events, totalCount] = await Promise.all([
        prisma.event.findMany({
          where: filter,
          orderBy: { createdAt: 'desc' },
          skip: (pageNumber - 1) * pageSizeNumber,
          take: pageSizeNumber,
        }),
        prisma.event.count({ where: filter }),
      ]);

      res.status(200).send({
        status: 'ok',
        events,
        pagination: {
          currentPage: pageNumber,
          pageSize: pageSizeNumber,
          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / pageSizeNumber),
        },
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getEventSlug(req: Request, res: Response) {
    try {
      const events = await prisma.event.findFirst({
        where: { slug: req.params.slug },
        include: { organizer: true },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).send({
        status: 'ok',
        events,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getRegistration(req: Request, res: Response) {
    try {
      const { organizerId } = req.params;
      const organizerIdNumber = parseInt(organizerId as string, 10);

      const reviews = await prisma.registration.findMany({
        where: {
          event: {
            organizerId: organizerIdNumber,
          },
        },
        include: {
          event: true,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Peserta retrieved successfully!',
        reviews,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: 'error',
        msg: 'An unexpected error occurred',
      });
    }
  }

  async buyTicket(req: Request, res: Response) {
    try {
      const { eventId, totalTicket, userId } = req.body;
      console.log(req.body);

      const result = await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.findUnique({
          where: { id: Number(userId) },
        });

        let diskon = 0;

        if (!user) {
          throw new Error('User not found');
        }

        const event = await prisma.event.findUnique({
          where: { id: eventId },
        });

        if (!event) {
          throw new Error('Event not found');
        }

        const organizer = await prisma.user.findUnique({
          where: { id: event.organizerId },
        });

        let price = event.price * totalTicket;
        let saldo = user.saldo;

        console.log(saldo, 'SALDOO');

        let pointsUsed = user.point || 0;

        const pointValue = 1;
        pointsUsed = Math.min(saldo, pointsUsed * pointValue, price - diskon);
        if (user.referredBy) {
          diskon = price * 0.1;
        }
        const finalPrice = price - diskon - pointsUsed;

        if (finalPrice > saldo) {
          return res.status(400).send({
            status: 'error',
            msg: 'Saldo Tidak Mencukupi!',
          });
        }

        saldo -= finalPrice;

        let ticketAvail = event.seatsAvailable;
        let ticketSesudahDipesan = ticketAvail - totalTicket;

        await prisma.event.update({
          where: { id: eventId },
          data: { seatsAvailable: ticketSesudahDipesan },
        });

        await prisma.user.update({
          where: { id: Number(userId) },
          data: { saldo: saldo, point: user.point - pointsUsed },
        });

        if (organizer) {
          await prisma.user.update({
            where: { id: organizer.id },
            data: { saldo: organizer.saldo + finalPrice },
          });
        }

        await prisma.registration.create({
          data: {
            userId: Number(userId),
            eventId,
            totalTicket,
            ticketPrice: finalPrice,
          },
        });

        res.status(200).send({
          status: 'ok',
          msg: 'Ticket Purchase Successful!',
        });
      });
    } catch (err) {
      console.error(err); // Log error
      res.status(400).send({
        status: 'error',
        msg: err || 'An error occurred!',
      });
    }
  }

  async getTikets(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const userIdNumber = parseInt(userId as string, 10);

      const tikets = await prisma.registration.findMany({
        where: {
          userId: userIdNumber,
        },
        include: {
          event: true,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Peserta retrieved successfully!',
        tikets,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: 'error',
        msg: 'An unexpected error occurred',
      });
    }
  }

  async getDashboard(req: Request, res: Response) {
    try {
      const { userId, year } = req.params;

      let data: any = [];

      const events = await prisma.event.findMany({
        where: {
          organizerId: Number(userId),
        },
      });

      for (const item of events) {
        const tikets = await prisma.registration.findFirst({
          where: {
            eventId: Number(item.id),
          },
        });

        console.log(tikets, 'M<><><><');

        if (tikets) {
          data.push(tikets);
        }
      }

      const monthlyCounts: { [key: string]: number } = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
      let tot: any = [];
      let terjual: number = 0;

      data.forEach((ticket: { createdAt: string | number | Date }) => {
        const ticketDate = new Date(ticket.createdAt);
        const ticketYear = ticketDate.getFullYear();
        const ticketMonth = ticketDate.toLocaleString('default', {
          month: 'long',
        });

        if (ticketYear === Number(year)) {
          monthlyCounts[ticketMonth] += 1;
        }
      });

      Object.values(monthlyCounts).forEach((value) => {
        tot.push(value);
        terjual += value;
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Get Data Dashboard successfully!',
        data,
        monthlyCounts,
        tot,
        terjual,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: 'error',
        msg: 'An unexpected error occurred',
      });
    }
  }
}
