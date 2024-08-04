import React from 'react';
import { BsChevronUp } from 'react-icons/bs';

type EditorFooterProps = {
    handleSubmit: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleSubmit }) => {
    return (
        <div className='flex bg-gray-100 absolute bottom-0 z-10 w-full px-4 py-3 border-t border-gray-300'>
            <div className='flex items-center space-x-6'>
                <button className='flex items-center px-4 py-2 bg-gray-200 text-sm font-medium text-dark-blue-s rounded-lg transition-colors hover:bg-gray-300 focus:outline-none'>
                    Console
                    <BsChevronUp className='ml-2 fill-current' />
                </button>
            </div>
            <div className='flex items-center ml-auto space-x-4'>
                <button
                    className='px-4 py-2 bg-gray-200 text-sm font-medium text-dark-blue-s rounded-lg transition-colors hover:bg-gray-300 focus:outline-none'
                    onClick={handleSubmit}
                >
                    Run
                </button>
                <button
                    className='px-4 py-2 bg-dark-green-s text-sm font-medium text-white rounded-lg transition-colors hover:bg-green-600 focus:outline-none'
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default EditorFooter;
