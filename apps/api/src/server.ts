import App from './app';
import cron from 'node-cron';
import { expirePoints } from './helpers/pointService';

const app = new App();

cron.schedule('0 0 * * *', async () => {
  try {
    await expirePoints();
    console.log('Expired points removed successfully.');
  } catch (error) {
    console.error('Error removing expired points:', error);
  }
});

app.start();
