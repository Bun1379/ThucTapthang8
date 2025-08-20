// Test file để kiểm tra queue system
const io = require('socket.io-client');

console.log('🚀 Bắt đầu test queue system...\n');

// Test 1: User gửi tin nhắn khi không có admin online
console.log('📋 Test 1: User gửi tin nhắn khi không có admin online');
const user1 = io('http://localhost:3000');

user1.emit('auth', { userId: '507f1f77bcf86cd799439011', role: 'customer' });

user1.on('connect', () => {
    console.log('✅ User 1 connected');

    // Gửi tin nhắn cho admin (sẽ vào queue)
    setTimeout(() => {
        console.log('📤 User 1 gửi tin nhắn cho admin...');
        user1.emit('user:messageToAdmin', {
            userId: '507f1f77bcf86cd799439011',
            text: 'Xin chào, tôi cần hỗ trợ!'
        });
    }, 1000);
});

user1.on('queue:waiting', (data) => {
    console.log('⏳ User 1 đang chờ:', data.message);

    // Sau 3 giây, admin sẽ online
    setTimeout(() => {
        console.log('\n📋 Test 2: Admin online để xử lý queue');
        const admin = io('http://localhost:3000');

        admin.emit('auth', { userId: '507f1f77bcf86cd799439013', role: 'admin' });

        admin.on('connect', () => {
            console.log('✅ Admin connected');
        });

        admin.on('conversation:started', (data) => {
            console.log('💬 Admin conversation started:', data);
        });

        admin.on('message:new', (data) => {
            console.log('📨 Admin nhận tin nhắn:', data.message.text);

            // Admin trả lời
            setTimeout(() => {
                admin.emit('agent:message', {
                    conversationId: data.conversationId,
                    text: 'Xin chào! Tôi là CSKH, tôi có thể giúp gì cho bạn?'
                });
            }, 1000);
        });

        // Disconnect admin sau 5 giây
        setTimeout(() => {
            admin.disconnect();
            console.log('🔌 Admin disconnected');
        }, 5000);

    }, 3000);
});

user1.on('conversation:started', (data) => {
    console.log('💬 User 1 conversation started:', data);
});

user1.on('message:new', (data) => {
    console.log('📨 User 1 nhận tin nhắn:', data.message.text);
});

// Test 3: User gửi tin nhắn khi có admin online
setTimeout(() => {
    console.log('\n📋 Test 3: User gửi tin nhắn khi có admin online');

    // Admin online trước
    const admin2 = io('http://localhost:3000');
    admin2.emit('auth', { userId: '507f1f77bcf86cd799439014', role: 'admin' });

    admin2.on('connect', () => {
        console.log('✅ Admin 2 connected');

        // User gửi tin nhắn ngay lập tức
        setTimeout(() => {
            const user2 = io('http://localhost:3000');
            user2.emit('auth', { userId: '507f1f77bcf86cd799439015', role: 'customer' });

            user2.on('connect', () => {
                console.log('✅ User 2 connected');
                user2.emit('user:messageToAdmin', {
                    userId: '507f1f77bcf86cd799439015',
                    text: 'Xin chào admin!'
                });
            });

            user2.on('conversation:started', (data) => {
                console.log('💬 User 2 conversation started:', data);
            });

            user2.on('message:new', (data) => {
                console.log('📨 User 2 nhận tin nhắn:', data.message.text);
            });

            // Disconnect user2 sau 3 giây
            setTimeout(() => {
                user2.disconnect();
                console.log('🔌 User 2 disconnected');
            }, 3000);

        }, 1000);
    });

    admin2.on('conversation:started', (data) => {
        console.log('💬 Admin 2 conversation started:', data);
    });

    admin2.on('message:new', (data) => {
        console.log('📨 Admin 2 nhận tin nhắn:', data.message.text);

        // Admin trả lời
        setTimeout(() => {
            admin2.emit('agent:message', {
                conversationId: data.conversationId,
                text: 'Xin chào! Tôi có thể giúp gì cho bạn?'
            });
        }, 1000);
    });

    // Disconnect admin2 sau 8 giây
    setTimeout(() => {
        admin2.disconnect();
        console.log('🔌 Admin 2 disconnected');
    }, 8000);

}, 10000);

// Disconnect user1 sau 15 giây
setTimeout(() => {
    user1.disconnect();
    console.log('\n🔌 User 1 disconnected');
    console.log('✅ Test hoàn thành!');
    process.exit(0);
}, 15000);
