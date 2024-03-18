import { useEffect, type ReactNode } from "react";

export default function Modal({ title = "Add Email", isOpen, closeModal, children }: { title: string, isOpen: boolean, closeModal: () => void, children: ReactNode }) {
    useEffect(() => {
        // Add event listener to handle scroll behavior when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => {
                // Clean up event listener when modal is closed
                document.body.style.overflow = 'auto';
            }
        }
    }, [isOpen]);

    return (
        <div className='relative'>
            {isOpen === true ? (
                <div className='fixed top-0 left-0 w-screen h-screen bg-zinc-900/90'>
                    <div className='bg-white absolute z-10 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-8 rounded-xl overflow-y-scroll space-y-8'>
                        {/* <div className='bg-white absolute z-10 top-10 bottom-10 left-[50%] -translate-x-[50%] w-[95%] m-auto lg:w-full max-w-[800px] max-h-[90%] sm:max-h-[900px] p-4 md:p-[44px] rounded-xl overflow-y-scroll space-y-8'> */}
                        <header className='bg-white flex flex-col gap-4 z-50'>
                            <div className='flex items-center justify-between'>
                                <h2 className={`text-xl `}>{title}</h2>
                                <button className={`text-sm text-[#F25555] w-14 h-14 rounded-full hover-hover:hover:underline`} onClick={closeModal}>Close</button>
                            </div>
                        </header>
                        {children}
                    </div>
                    <button onClick={closeModal} className='absolute top-0 right-0 bottom-0 left-0 cursor-zoom-out' />
                </div>
            ) : null}
        </div>
    )
}