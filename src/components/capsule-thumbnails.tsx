/**
 * Module contaning components for capsule thumbnail displays.
 */

import {
    convertDate,
    isUnlocked,
    CapsuleData,
    abbreviateText,
} from "@/utilities/utilities";
import { Icons } from "@/components/icons";

/**
 * Simple, single-row "card" for viewing capsules.
 * @param props
 * @returns
 */
export function CapsuleRow(props: CapsuleData) {
    const { title, createdAt, unlockDate } = props;
    const unlocked = isUnlocked(unlockDate);

    return (
        <div className="max-w-xs w-full bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <div className="flex items-center">
                <img
                    className="h-16 w-16 object-cover"
                    src={"https://www.svgrepo.com/show/334497/capsule.svg"}
                    alt="Placeholder"
                />
                <div className="ml-2 w-full">
                    <div className="font-bold text-sm mb-1">Name: {title}</div>
                    <div className="flex text-xs">
                        <div className="w-1/2">
                            Created At: <br /> {convertDate(createdAt)}
                        </div>
                        {unlocked ? (
                            <div className="w-1/2">
                                Unlocked At: <br />{" "}
                                {`${convertDate(unlockDate)}`}
                            </div>
                        ) : (
                            <div className="w-1/2">
                                Unlocking On: <br />{" "}
                                {`${convertDate(unlockDate)}`}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * More sophisticated card for viewing capsules.
 * @param props
 */
export function CapsuleCard(props: CapsuleData) {
    const { title, unlockDate, likeNumber, commentNumber } = props;
    const unlocked = isUnlocked(unlockDate);

    return (
        <div className="bg-white max-w-xs w-[320px] rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                    {abbreviateText(25, title)}
                </div>
                <div className="flex justify-between">
                    {!unlocked? <span className="text-gray-700 text-sm">
                        Unlocks on: {convertDate(unlockDate)}
                    </span>
                    :
                    <span className="text-gray-700 text-sm">
                        Unlocked on: {convertDate(unlockDate)}
                    </span>}
                </div>
            </div>
            <div className="px-6 pt-4 pb-4">
                <div className="flex">
                    <div className="w-1/3 flex flex-col items-center">
                        <Icons.heart className="mb-2 w-8 h-8" />
                        <p className="text-gray-600 text-sm">{likeNumber}</p>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icons.comment className="mb-2 w-8 h-8" />
                        <p className="text-gray-600 text-sm">{commentNumber}</p>
                    </div>
                    {unlocked ? (
                        <div className="w-1/3 flex flex-col items-center">
                            <Icons.locked className="mb-2 w-8 h-8" />
                            <p className="text-gray-600 text-sm">locked</p>
                        </div>
                    ) : (
                        <div className="w-1/3 flex flex-col items-center">
                            <Icons.unlocked className="mb-2 w-8 h-8" />
                            <p className="text-gray-600 text-sm">unlocked</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
