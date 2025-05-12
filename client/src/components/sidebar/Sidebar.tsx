import SidebarButton from "@/components/sidebar/sidebar-views/SidebarButton"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { useViews } from "@/context/ViewContext"
import useResponsive from "@/hooks/useResponsive"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ACTIVITY_STATE } from "@/types/app"
import { SocketEvent } from "@/types/socket"
import { VIEWS } from "@/types/view"
import { IoCodeSlash } from "react-icons/io5"
import { MdOutlineDraw } from "react-icons/md"
import cn from "classnames"
import { Tooltip } from "react-tooltip"
import { useState } from "react"
import { motion } from "framer-motion"
import { tooltipStyles } from "./tooltipStyles"

function Sidebar() {
    const {
        activeView,
        isSidebarOpen,
        viewComponents,
        viewIcons,
        setIsSidebarOpen,
    } = useViews()
    const { minHeightReached } = useResponsive()
    const { activityState, setActivityState } = useAppContext()
    const { socket } = useSocket()
    const { isMobile } = useWindowDimensions()
    const [showTooltip, setShowTooltip] = useState(true)

    const changeState = () => {
        setShowTooltip(false)
        if (activityState === ACTIVITY_STATE.CODING) {
            setActivityState(ACTIVITY_STATE.DRAWING)
            socket.emit(SocketEvent.REQUEST_DRAWING)
        } else {
            setActivityState(ACTIVITY_STATE.CODING)
        }

        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    return (
        <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
            <motion.div
                className={cn(
                    "fixed bottom-0 left-0 z-50 flex h-[60px] w-full gap-4 self-end overflow-hidden border-t border-gray-800 bg-[#121826] p-2 md:static md:h-full md:w-[60px] md:min-w-[60px] md:flex-col md:border-r md:border-t-0 md:p-3 md:pt-6 rounded-lg shadow-lg",
                    {
                        hidden: minHeightReached,
                    }
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                {[
                    VIEWS.FILES,
                    VIEWS.CHATS,
                    VIEWS.RUN,
                    VIEWS.CLIENTS,
                    VIEWS.SETTINGS,
                    VIEWS.TASKBOARD,
                    VIEWS.REVIEW,
                    VIEWS.ApiGenerator,
                    VIEWS.Frameforge,
                ].map((view) => (
                    <SidebarButton key={view} viewName={view} icon={viewIcons[view]} />
                ))}

                {/* Button to switch between coding and drawing modes */}
                <div className="flex items-center justify-center h-fit">
                    <motion.button
                        className="flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out hover:bg-[#3D404A] p-2 shadow-md hover:scale-110"
                        onClick={changeState}
                        onMouseEnter={() => setShowTooltip(true)}
                        data-tooltip-id="activity-state-tooltip"
                        data-tooltip-content={
                            activityState === ACTIVITY_STATE.CODING
                                ? "Switch to Drawing Mode"
                                : "Switch to Coding Mode"
                        }
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {activityState === ACTIVITY_STATE.CODING ? (
                            <MdOutlineDraw size={32} className="text-white" />
                        ) : (
                            <IoCodeSlash size={32} className="text-white" />
                        )}
                    </motion.button>
                    {showTooltip && (
                        <Tooltip
                            id="activity-state-tooltip"
                            place="right"
                            offset={15}
                            className="!z-50"
                            style={tooltipStyles}
                            noArrow={false}
                            positionStrategy="fixed"
                            float={true}
                        />
                    )}
                </div>
            </motion.div>

            {/* Sidebar Content */}
            <motion.div
                className="absolute left-0 top-0 z-20 w-full flex-col bg-[#1A2333] md:static md:min-w-[300px] shadow-xl rounded-lg"
                style={isSidebarOpen ? {} : { display: "none" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {viewComponents[activeView]}
            </motion.div>
        </aside>
    )
}

export default Sidebar
