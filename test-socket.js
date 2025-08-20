// Test file để kiểm tra socket connection
const io = require('socket.io-client');

// Kết nối đến server
const socket = io('http://localhost:3000');

// Test authentication
socket.emit('auth', { userId: '507f1f77bcf86cd799439011', role: 'customer' });

// Test gửi tin nhắn cho admin
socket.emit('user:messageToAdmin', {
    userId: '507f1f77bcf86cd799439011',
    text: 'Xin chào, tôi cần hỗ trợ!'
});

// Test gửi tin nhắn cho seller
socket.emit('user:messageToSeller', {
    userId: '507f1f77bcf86cd799439011',
    sellerId: '507f1f77bcf86cd799439012',
    text: 'Xin chào seller!'
});

// Lắng nghe các event
socket.on('connect', () => {
    console.log('✅ Connected to server');
});

socket.on('queue:waiting', (data) => {
    console.log('⏳ Waiting in queue:', data.message);
});

socket.on('conversation:started', (data) => {
    console.log('💬 Conversation started:', data);
});

socket.on('message:new', (data) => {
    console.log('📨 New message:', data);
});

socket.on('error', (data) => {
    console.log('❌ Error:', data);
});

// Disconnect sau 10 giây
setTimeout(() => {
    socket.disconnect();
    console.log('🔌 Disconnected');
}, 10000);
