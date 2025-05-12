import ChatInput from "@/components/chats/ChatInput";
import ChatList from "@/components/chats/ChatList";
import useResponsive from "@/hooks/useResponsive";

const ChatsView = () => {
    const { viewHeight } = useResponsive();

    return (
        <div
            className="relative flex w-full flex-col gap-4 p-6 rounded-xl shadow-lg 
                       bg-gradient-to-b from-gray-900/80 to-gray-800/90 backdrop-blur-lg border border-gray-700"
            style={{ height: viewHeight }}
        >
            {/* Chat Header */}
            <div className="flex items-center justify-between text-gray-200">
                <h1 className="text-xl font-semibold tracking-wide">💬 Group Chat</h1>
                <button className="p-2 text-gray-300 transition duration-300 hover:text-white">
                    <i className="ri-more-2-fill text-xl"></i> {/* Remix Icon */}
                </button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <ChatList />
            </div>

            {/* Chat Input (Floating Style) */}
            <div className="sticky bottom-0">
                <ChatInput />
            </div>
        </div>
    );
};

export default ChatsView;
