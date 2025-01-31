import {useEffect} from "react";
import {classNames, pngFillColors, svgPaths} from "./severity-styles";

const Alert = ({
    message = "",
    severity = "info",
    timeout = 0,
    handleDismiss = null,
}) => {
    useEffect(() => {
        if (timeout > 0 && handleDismiss){
            const timer = setTimeout(() => {
                handleDismiss()
            }, timeout * 1000)
            return () => clearTimeout(timer);
        }
    }, [handleDismiss, timeout]);

    return (
        message?.length && (
            <div
                className={classNames[severity] + "rounded-b px-4 mb-4 shadow-md pointer-events-auto"}
                role="alert"
            >
                <div className="flex justify-center items-center">

                    <div className="">
                        <svg className={"fill-current h-6 wr-6 w-10 mt-1 "  + pngFillColors[severity]}>
                            <path d={svgPaths[severity]}/>
                        </svg>
                    </div>

                    <div className="flex-initial flex flex-row items-center">
                        <p className={"font-bold"}>{message}</p>
                    </div>
                    <div className="ml-auto flex align-center">
                        {handleDismiss && (
                            <button
                                className="text-sm font-bold"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleDismiss()
                                }}>

                                <svg
                                    className="fill-current h-6 w-6 text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >

                                    <path
                                        d="M6.83 5L10 8.17 13.17 5 15 6.83 11.83 10 15 13.17 13.17 15 10 11.83 6.83 15 5 13.17 8.17 10 5 6.83 6.83 5z"/>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    )
}

const AlertsWrapper = ({children}) => {
    return (
        <div className="fixed top-0 right-0 p-4 z-50 pointer-events-none max-w-sm min-w-fit w-full">
            {children}
        </div>
    )
}

export {Alert, AlertsWrapper}
