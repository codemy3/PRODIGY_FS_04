import dbConnect from '../../utils/db';
import Message from '../../backend/models/Message';

export default async function handler(req, res) {
  await dbConnect();
  const messages = await Message.find().sort({ timestamp: 1 });
  res.status(200).json(messages);
}
