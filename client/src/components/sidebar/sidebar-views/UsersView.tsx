import Users from "@/components/common/Users";
import { useAppContext } from "@/context/AppContext";
import { useSocket } from "@/context/SocketContext";
import useResponsive from "@/hooks/useResponsive";
import { USER_STATUS } from "@/types/user";
import toast from "react-hot-toast";
import { GoSignOut } from "react-icons/go";
import { IoShareOutline } from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function UsersView() {
    const navigate = useNavigate();
    const { viewHeight } = useResponsive();
    const { setStatus } = useAppContext();
    const { socket } = useSocket();

    const copyURL = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            toast.success("🔗 URL copied to clipboard!");
        } catch (error) {
            toast.error("⚠️ Unable to copy URL");
            console.error(error);
        }
    };

    const shareURL = async () => {
        const url = window.location.href;
        try {
            await navigator.share({ url });
        } catch (error) {
            toast.error("⚠️ Unable to share URL");
            console.error(error);
        }
    };

    const leaveRoom = () => {
        socket.disconnect();
        setStatus(USER_STATUS.DISCONNECTED);
        navigate("/", { replace: true });
    };

    return (
        <div
            className="flex flex-col p-6 rounded-xl shadow-lg 
                       bg-gradient-to-b from-gray-900/80 to-gray-800/90 backdrop-blur-lg border border-gray-700"
            style={{ height: viewHeight }}
        >
            {/* Header */}
            <h1 className="text-2xl font-semibold text-gray-200 text-center">
                👥 Users
            </h1>

            {/* Users List */}
            <Users />

            {/* Actions */}
            <div className="flex flex-col items-center gap-6 pt-6">
                <div className="flex w-full gap-4">
                    {/* Share URL button */}
                    <button
                        className="flex flex-grow items-center justify-center rounded-lg bg-gray-800 p-3 text-white transition-all duration-300 hover:bg-gray-700 active:scale-95"
                        onClick={shareURL}
                        title="Share Link"
                    >
                        <IoShareOutline size={24} />
                    </button>

                    {/* Copy URL button */}
                    <button
                        className="flex flex-grow items-center justify-center rounded-lg bg-gray-800 p-3 text-white transition-all duration-300 hover:bg-gray-700 active:scale-95"
                        onClick={copyURL}
                        title="Copy Link"
                    >
                        <LuCopy size={22} />
                    </button>

                    {/* Leave room button */}
                    <button
                        className="flex flex-grow items-center justify-center rounded-lg bg-red-600 p-3 text-white transition-all duration-300 hover:bg-red-500 active:scale-95"
                        onClick={leaveRoom}
                        title="Leave Room"
                    >
                        <GoSignOut size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UsersView;
