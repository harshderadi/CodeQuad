import ChatsView from "@/components/sidebar/sidebar-views/ChatsView";
import FilesView from "@/components/sidebar/sidebar-views/FilesView";
import RunView from "@/components/sidebar/sidebar-views/RunView";
import SettingsView from "@/components/sidebar/sidebar-views/SettingsView";
import UsersView from "@/components/sidebar/sidebar-views/UsersView";
import TaskBoard from "@/components/taskboard"; // Adding TaskBoard!
import Review from "@/components/review";
//import AudioSummary from "@/components/audiosummary"; // New View Component for Audio Summary
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { VIEWS, ViewContext as ViewContextType } from "@/types/view";
import { ReactNode, createContext, useContext, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { LuCodepen, LuFiles } from "react-icons/lu";
import { PiChats, PiPlay, PiUsers,PiStackBold } from "react-icons/pi";
import { TbLayoutBoardSplit } from "react-icons/tb";
import { AiOutlineCode} from "react-icons/ai"; // New Icon for Audio Summary
import ApiGenerator from "@/components/apigenrate";
import Frameforge from "@/components/frameforge";



const ViewContext = createContext<ViewContextType | null>(null);

export const useViews = (): ViewContextType => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useViews must be used within a ViewContextProvider");
  }
  return context;
};

function ViewContextProvider({ children }: { children: ReactNode }) {
  const { isMobile } = useWindowDimensions();
  const [activeView, setActiveView] = useState<VIEWS>(VIEWS.FILES);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(!isMobile);
  const [viewComponents] = useState({
    [VIEWS.FILES]: <FilesView />,
    [VIEWS.CLIENTS]: <UsersView />,
    [VIEWS.SETTINGS]: <SettingsView />,
    [VIEWS.CHATS]: <ChatsView />,
    [VIEWS.RUN]: <RunView />,
    [VIEWS.TASKBOARD]: <TaskBoard />,
    [VIEWS.REVIEW]: <Review />, // Review View
     // New Audio Summary View
     [VIEWS.ApiGenerator]:<ApiGenerator />,
     [VIEWS.Frameforge]:<Frameforge/>
  });

  const [viewIcons] = useState({
    [VIEWS.FILES]: <LuFiles size={28} />,
    [VIEWS.CLIENTS]: <PiUsers size={30} />,
    [VIEWS.SETTINGS]: <IoSettingsOutline size={28} />,
    [VIEWS.CHATS]: <PiChats size={30} />,
    [VIEWS.RUN]: <PiPlay size={28} />,
    [VIEWS.TASKBOARD]: <TbLayoutBoardSplit size={28} />,
    [VIEWS.REVIEW]: <AiOutlineCode size={28} />, // Icon for Review
   // [VIEWS.AUDIOSUMMARY]: <AiOutlineSound size={28} />, // New Icon for Audio Summary
   [VIEWS.ApiGenerator]:<LuCodepen size={28} />,
   [VIEWS.Frameforge]:<PiStackBold size={28} />
  });

  return (
    <ViewContext.Provider
      value={{
        activeView,
        setActiveView,
        isSidebarOpen,
        setIsSidebarOpen,
        viewComponents,
        viewIcons,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export { ViewContextProvider };
export default ViewContext;
