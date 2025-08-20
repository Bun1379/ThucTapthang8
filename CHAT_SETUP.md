# Chat System Setup Guide

## Tính năng Chat Real-time

Hệ thống chat hỗ trợ 2 loại conversation:

### 1. User → Seller
- Tạo đoạn chat trực tiếp giữa user và seller
- Không cần hàng đợi
- Seller có thể trả lời ngay lập tức

### 2. User → Admin (CSKH)
- Tìm admin rảnh nhất để hỗ trợ
- Nếu không có admin rảnh → đưa vào hàng đợi
- Khi có admin mới online → xử lý hàng đợi

## Socket Events

### Client → Server

#### Authentication
```javascript
socket.emit('auth', { userId: 'user-id', role: 'customer|admin|seller' });
```

#### User gửi tin nhắn cho Admin
```javascript
socket.emit('user:messageToAdmin', { 
    userId: 'user-id', 
    text: 'Nội dung tin nhắn' 
});
```

#### User gửi tin nhắn cho Seller
```javascript
socket.emit('user:messageToSeller', { 
    userId: 'user-id', 
    sellerId: 'seller-id', 
    text: 'Nội dung tin nhắn' 
});
```

#### Admin/Seller trả lời
```javascript
socket.emit('agent:message', { 
    conversationId: 'conversation-id', 
    text: 'Nội dung trả lời' 
});
```

#### Lấy tin nhắn cũ
```javascript
socket.emit('get:messages', { conversationId: 'conversation-id' });
```

### Server → Client

#### Queue Events
```javascript
socket.on('queue:waiting', (data) => {
    console.log(data.message); // "Chưa có CSKH rảnh, bạn đang ở hàng đợi."
});

socket.on('queue:processed', (data) => {
    console.log(data.message); // "CSKH đã sẵn sàng hỗ trợ bạn."
});
```

#### Conversation Events
```javascript
socket.on('conversation:started', (data) => {
    console.log(data.conversationId); // ID của conversation
    console.log(data.type); // "user-admin" hoặc "user-seller"
});
```

#### Message Events
```javascript
socket.on('message:new', (data) => {
    console.log(data.conversationId); // ID conversation
    console.log(data.message); // Thông tin tin nhắn
});

socket.on('messages:history', (data) => {
    console.log(data.conversationId); // ID conversation
    console.log(data.messages); // Array các tin nhắn cũ
});
```

## Database Schema

### Conversation Model
```javascript
{
    type: "user-seller" | "user-admin",
    buyer: ObjectId, // User ID
    seller: ObjectId, // Seller ID (nếu type = user-seller)
    assigned_to: ObjectId, // Admin ID (nếu type = user-admin)
    status: "pending" | "open" | "closed"
}
```

### Message Model
```javascript
{
    conversation: ObjectId, // Conversation ID
    senderType: "customer" | "seller" | "bot",
    sender: ObjectId, // User ID
    text: String,
    createdAt: Date
}
```

## Test

### Cách test hệ thống chat:

1. **Chạy server:**
```bash
npm start
```

2. **Test đơn giản:**
```bash
# Test user gửi tin nhắn
node test-socket.js

# Test admin (tự động disconnect sau 30s)
node test-admin-simple.js

# Test seller (tự động disconnect sau 30s)
node test-seller-simple.js
```

3. **Test queue system (nâng cao):**
```bash
# Test toàn bộ queue system
node test-queue.js
```

### Kịch bản test:

1. **User → Admin (có admin online):**
   - Chạy `test-admin.js` trước
   - Sau đó chạy `test-socket.js`
   - User sẽ được kết nối với admin ngay lập tức

2. **User → Admin (không có admin online):**
   - Chỉ chạy `test-socket.js`
   - User sẽ được đưa vào hàng đợi
   - Sau đó chạy `test-admin.js` để xử lý hàng đợi

3. **User → Seller:**
   - Chạy `test-seller.js` trước
   - Sau đó chạy `test-socket.js`
   - User sẽ được kết nối với seller ngay lập tức

## Frontend Integration

### Kết nối Socket
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// Authentication
socket.emit('auth', { userId: 'your-user-id', role: 'customer' });

// Lắng nghe events
socket.on('message:new', (data) => {
    // Hiển thị tin nhắn mới
    displayMessage(data.message);
});
```

### Gửi tin nhắn
```javascript
// Gửi cho admin
socket.emit('user:messageToAdmin', {
    userId: 'user-id',
    text: 'Tin nhắn của bạn'
});

// Gửi cho seller
socket.emit('user:messageToSeller', {
    userId: 'user-id',
    sellerId: 'seller-id',
    text: 'Tin nhắn của bạn'
});
```
