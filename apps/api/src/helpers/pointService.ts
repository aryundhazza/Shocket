import prisma from '@/prisma';

export async function expirePoints() {
  const currentDate = new Date();
  await prisma.pointLog.deleteMany({
    where: {
      expirationDate: {
        lt: currentDate, // Hapus poin yang kadaluarsa
      },
    },
  });
}
