// Test file seller đơn giản
const io = require('socket.io-client');

const sellerSocket = io('http://localhost:3000');

sellerSocket.emit('auth', { userId: '507f1f77bcf86cd799439012', role: 'seller' });

sellerSocket.on('connect', () => {
    console.log('✅ Seller connected');
});

sellerSocket.on('conversation:started', (data) => {
    console.log('💬 Seller conversation started:', data);
});

sellerSocket.on('message:new', (data) => {
    console.log('📨 Seller received message:', data.message.text);

    // Seller trả lời tự động
    setTimeout(() => {
        sellerSocket.emit('agent:message', {
            conversationId: data.conversationId,
            text: 'Xin chào! Tôi là seller, bạn cần mua gì không?'
        });
    }, 1000);
});

// Disconnect sau 30 giây
setTimeout(() => {
    sellerSocket.disconnect();
    console.log('🔌 Seller disconnected');
    process.exit(0);
}, 30000);
