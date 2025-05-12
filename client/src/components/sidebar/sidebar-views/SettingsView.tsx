import Select from "@/components/common/Select";
import { useSettings } from "@/context/SettingContext";
import useResponsive from "@/hooks/useResponsive";
import { editorFonts } from "@/resources/Fonts";
import { editorThemes } from "@/resources/Themes";
import { langNames } from "@uiw/codemirror-extensions-langs";
import { ChangeEvent, useEffect } from "react";

function SettingsView() {
    const {
        theme,
        setTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        showGitHubCorner,
        setShowGitHubCorner,
        resetSettings,
    } = useSettings();
    const { viewHeight } = useResponsive();

    const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontFamily(e.target.value);
    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setTheme(e.target.value);
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setLanguage(e.target.value);
    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontSize(parseInt(e.target.value));
    const handleShowGitHubCornerChange = (e: ChangeEvent<HTMLInputElement>) =>
        setShowGitHubCorner(e.target.checked);

    useEffect(() => {
        // Set editor font family
        const editor = document.querySelector(
            ".cm-editor > .cm-scroller"
        ) as HTMLElement;
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`;
        }
    }, [fontFamily]);

    return (
        <div
            className="flex flex-col items-center gap-4 p-6 rounded-xl shadow-lg 
                       bg-gradient-to-b from-gray-900/80 to-gray-800/90 backdrop-blur-lg border border-gray-700"
            style={{ height: viewHeight }}
        >
            {/* Header */}
            <h1 className="text-2xl font-semibold text-gray-200 text-center">
                ⚙️ Settings
            </h1>

            {/* Font Selection */}
            <div className="flex w-full items-center gap-4">
                <Select
                    onChange={handleFontFamilyChange}
                    value={fontFamily}
                    options={editorFonts}
                    title="Font Family"
                />
                {/* Font Size */}
                <select
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="rounded-md border-none bg-gray-800 px-4 py-2 text-white outline-none transition-all duration-300 hover:bg-gray-700 focus:ring-2 focus:ring-indigo-400"
                    title="Font Size"
                >
                    {[...Array(13).keys()].map((size) => (
                        <option key={size} value={size + 12}>
                            {size + 12}
                        </option>
                    ))}
                </select>
            </div>

            {/* Theme Selection */}
            <Select
                onChange={handleThemeChange}
                value={theme}
                options={Object.keys(editorThemes)}
                title="Theme"
            />

            {/* Language Selection */}
            <Select
                onChange={handleLanguageChange}
                value={language}
                options={langNames}
                title="Language"
            />

            {/* Show GitHub Corner Toggle */}
            <div className="flex w-full items-center justify-between mt-4">
                <label className="text-gray-300">Show GitHub Corner</label>
                <label className="relative inline-flex cursor-pointer items-center">
                    <input
                        className="peer sr-only"
                        type="checkbox"
                        onChange={handleShowGitHubCornerChange}
                        checked={showGitHubCorner}
                    />
                    <div className="peer h-6 w-12 rounded-full bg-gray-700 outline-none transition-all duration-300
                                after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white 
                                after:transition-all after:duration-500 peer-checked:bg-indigo-500 peer-checked:after:translate-x-6">
                    </div>
                </label>
            </div>

            {/* Reset Button */}
            <button
                className="mt-auto w-full rounded-lg border-none bg-red-600 px-4 py-2 text-white outline-none 
                           transition-all duration-300 hover:bg-red-500 active:scale-95"
                onClick={resetSettings}
            >
                Reset to Default
            </button>
        </div>
    );
}

export default SettingsView;
