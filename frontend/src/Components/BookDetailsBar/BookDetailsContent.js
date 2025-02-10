import DetailsDropdown from "./Dropdown/DetailsDropdown";
import OverviewDropdown from "./Dropdown/OverviewDropdown";
import ReviewDropdown from "./Dropdown/ReviewDropdown";

export default function BookDetailsContent({tabs, selectedTab}) {
    const getTabIndex = tabs.indexOf(selectedTab)

    const direction = [[<OverviewDropdown/>], [<DetailsDropdown/>], [<ReviewDropdown/>]]

    return (

        <>
            <div className="flex flex-col gap-2">

                {direction[getTabIndex]}

            </div>
        </>

)
}