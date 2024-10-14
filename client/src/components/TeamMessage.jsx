// import React from 'react';
// import { useMessageContext, useChannelStateContext, MessageList } from 'stream-chat-react';

// const CustomMessage = () => {
//     const { message, isMyMessage } = useMessageContext();
//     return (
//         <div className={`custom-message ${isMyMessage ? 'mine' : 'theirs'}`}>
//             <div className="user-info">
//                 {message.user.name}
//             </div>
//             <div className="message-text">
//                 {message.text}
//             </div>
//         </div>
//     );
// };

// const CustomMessageList = () => {
//     return (
//         <MessageList
//             Message={(messageProps) => <CustomMessage {...messageProps} />}
//         />
//     );
// };

// export default CustomMessageList;
