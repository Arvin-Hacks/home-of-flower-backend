import twilio from 'twilio';
// import Order from '../models/Order';

// console.log('TWILO sid',process.env.TWILIO_ACCOUNT_SID)
// console.log('TWILO auth',process.env.TWILIO_AUTH_TOKEN)
// console.log('TWILO auth',process.env.TWILIO_PHONE_NUMBER)

// Replace these placeholders with your Twilio account SID and Auth Token
const accountSid = process.env.TWILIO_ACCOUNT_SID;


const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const adminPhoneNumber =process.env.TWILIO_PHONE_NUMBER ; // Replace with the admin's phone number

export const sendAdminNotification = async (order) => {
  const message = `
    New Order Placed:
    Order ID: ${order.orderId}
    User ID: ${order.user}
    Total Amount: ₹${order.totalAmount}
    Order Status: ${order.status}
  `;

  try {
    const response = await client.messages.create({
      body: message,
      from:adminPhoneNumber , // Replace with your Twilio phone number
      to: '+916353457751',
    });

    console.log('Admin notification sent:', response.sid);
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
};
