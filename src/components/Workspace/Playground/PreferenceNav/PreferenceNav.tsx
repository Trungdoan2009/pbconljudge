import React, { useEffect, useState } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';
import { ISettings } from '../Playground';
import SettingsModal from '@/components/Modals/SettingsModal';

type PreferenceNavProps = {
    settings: ISettings;
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({ setSettings, settings }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreen= () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };
    useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);
    return (
        <div className='flex items-center justify-between bg-gray-200 h-12 px-4'>
            {/* Language Buttons */}
            <div className='flex items-center space-x-2'>
                <button
                    className='flex items-center rounded px-3 py-1.5 font-medium bg-dark-blue-s text-white' 
                >
                    <span className='text-xs'>JavaScript</span>
                </button>
            </div>

            {/* Settings and Fullscreen Buttons */}
            <div className="flex items-center space-x-2">
                <button className='relative flex items-center rounded p-2 hover:bg-dark-fill-3 group'
                onClick={() => setSettings({ ...settings, settingsModalIsOpen: true})}
                >
                    <AiOutlineSetting className='text-dark-gray-6 text-xl' />
                    <div className='absolute right-0 top-full mt-1 w-auto p-2 text-sm bg-gray-200 text-dark-layer-2 rounded-md shadow-md transform scale-0 group-hover:scale-100 transition-transform duration-150'>
                        Settings
                    </div>
                </button>

                <button className='relative flex items-center rounded p-2 hover:bg-dark-fill-3 grxoup' onClick={handleFullScreen}>
                    {!isFullScreen ? <AiOutlineFullscreen className='text-dark-gray-6 text-xl' /> : <AiOutlineFullscreenExit className='text-dark-gray-6 text-xl' /> }
                    <div className='absolute right-0 top-full mt-1 w-auto p-2 text-sm bg-gray-200 text-dark-layer-2 rounded-md shadow-md transform scale-0 group-hover:scale-100 transition-transform duration-150'>
                        Fullscreen
                    </div>
                </button>
            </div>
            {settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings} />}
        </div>
    );
};

export default PreferenceNav;
