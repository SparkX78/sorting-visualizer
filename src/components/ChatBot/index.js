import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';
export default function ChatBot() {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(ChatBubble, { onClick: () => setOpen(prev => !prev) }), open && _jsx(ChatWindow, {})] }));
}
