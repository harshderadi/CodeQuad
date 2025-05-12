import { useRunCode } from "@/context/RunCodeContext";
import useResponsive from "@/hooks/useResponsive";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { LuCopy } from "react-icons/lu";
import { PiCaretDownBold } from "react-icons/pi";

function RunView() {
    const { viewHeight } = useResponsive();
    const {
        setInput,
        output,
        isRunning,
        supportedLanguages,
        selectedLanguage,
        setSelectedLanguage,
        runCode,
    } = useRunCode();

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = JSON.parse(e.target.value);
        setSelectedLanguage(lang);
    };

    const copyOutput = () => {
        navigator.clipboard.writeText(output);
        toast.success("Output copied to clipboard");
    };

    return (
        <div
            className="flex flex-col items-center gap-4 p-6 rounded-xl shadow-lg 
                       bg-gradient-to-b from-gray-900/80 to-gray-800/90 backdrop-blur-lg border border-gray-700"
            style={{ height: viewHeight }}
        >
            {/* Header */}
            <h1 className="text-2xl font-semibold text-gray-200">🚀 Run Code</h1>

            <div className="flex h-[90%] w-full flex-col gap-4">
                {/* Language Selector */}
                <div className="relative w-full">
                    <select
                        className="w-full rounded-lg border-none bg-darkHover px-4 py-2 text-white outline-none transition-all duration-300 hover:bg-gray-700"
                        value={JSON.stringify(selectedLanguage)}
                        onChange={handleLanguageChange}
                    >
                        {supportedLanguages
                            .sort((a, b) => (a.language > b.language ? 1 : -1))
                            .map((lang, i) => (
                                <option key={i} value={JSON.stringify(lang)}>
                                    {lang.language + (lang.version ? ` (${lang.version})` : "")}
                                </option>
                            ))}
                    </select>
                    <PiCaretDownBold
                        size={16}
                        className="absolute bottom-3 right-4 z-10 text-gray-400"
                    />
                </div>

                {/* Code Input */}
                <textarea
                    className="min-h-[150px] w-full resize-none rounded-lg border-none bg-darkHover p-3 text-white outline-none transition-all duration-300 hover:bg-gray-700 focus:ring-2 focus:ring-primary"
                    placeholder="Write your input here..."
                    onChange={(e) => setInput(e.target.value)}
                />

                {/* Run Button */}
                <button
                    className={`flex w-full justify-center rounded-lg p-3 font-semibold 
                                text-white transition-all duration-300 
                                ${isRunning ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 active:scale-95"}`}
                    onClick={runCode}
                    disabled={isRunning}
                >
                    {isRunning ? "Running..." : "▶ Run Code"}
                </button>

                {/* Output Section */}
                <div className="flex w-full items-center justify-between text-gray-300">
                    <span className="font-medium">📜 Output:</span>
                    <button onClick={copyOutput} title="Copy Output">
                        <LuCopy size={20} className="cursor-pointer text-white transition-all duration-300 hover:text-gray-400" />
                    </button>
                </div>

                {/* Output Display */}
                <div className="w-full flex-grow overflow-y-auto rounded-lg bg-darkHover p-3 text-white outline-none transition-all duration-300 hover:bg-gray-700">
                    <code>
                        <pre className="text-wrap">{output || "Your output will appear here..."}</pre>
                    </code>
                </div>
            </div>
        </div>
    );
}

export default RunView;
