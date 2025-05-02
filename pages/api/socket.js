import { Server } from 'socket.io';
import dbConnect from '../../utils/db';
import Message from '../../backend/models/Message';  // Ensure this path is correct

let io;

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.io server...');

    // Initialize the Socket.io server on the current Next.js server
    io = new Server(res.socket.server, {
      path: '/api/socket',  // Specify the socket.io path
    });

    // Handle new connections to the socket
    io.on('connection', (socket) => {
      console.log('A user connected');

      // Listen for 'sendMessage' event and handle message saving
      socket.on('sendMessage', async (data) => {
        try {
          // Connect to the DB
          await dbConnect();

          // Create and save the message to the database
          const savedMessage = await Message.create({
            username: data.username,  // Assuming data has a username field
            text: data.text,
            timestamp: new Date(),
          });

          // Emit the message to all connected clients
          io.emit('receiveMessage', savedMessage);
        } catch (err) {
          console.error('Error saving message:', err);
        }
      });

      // Handle socket disconnect
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });

    // Store the io instance to prevent re-initializing
    res.socket.server.io = io;
  }

  res.end();
}
