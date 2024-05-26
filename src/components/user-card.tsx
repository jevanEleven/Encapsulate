import { convertDate } from "@/utilities/utilities";
import { Icons, profileIcons } from "@/components/icons";

import user from "@/img/user.svg";

//hold off on defining the interface specifically until you know exactly what you want to do.

export default function UserCard(props: {
    username: string;
    joined: string;
    lastSeen: string | undefined;
    trophies: number;
}) {
    const { username, joined, lastSeen, trophies } = props;
    return (
            <div className="flex items-center bg-white p-6 pl-10 shadow-md">
                <profileIcons.genericPictureC className="w-20 h-20 rounded-full border-4 border-white shadow-md  transition-transform duration-300 transform hover:scale-110 mr-4 md:mr-8" />
                <div className="flex flex-col flex-grow pl-4">
                    <div className="flex items-center mb-1">
                        <h2 className="text-2xl font-semibold">{username}</h2>
                    </div>
                    <div className="flex flex-col text-gray-600 text-sm mb-2">
                        <span>Joined: {convertDate(joined)}</span>
                        <span>Last seen: {convertDate(lastSeen)}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center text-gray-600 text-sm">
                    <Icons.trophy className="w-10 h-10" />
                    <span>{trophies}</span>
                </div>
            </div>

    );
}


/*
<div className="flex items-center bg-gray-100 rounded-lg p-4 shadow-md">
      <profileIcons.genericPictureC className="w-16 h-16 rounded-full border-4 border-white shadow-md  transition-transform duration-300 transform hover:scale-110" />
      <div className="flex flex-col flex-grow">
        <div className="flex items-center mb-2">
          <h2 className="text-lg font-semibold">{username}</h2>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <span className="mr-2">Joined: {convertDate(joined)}</span>
          <span>Last seen: {convertDate(lastSeen)}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Icons.trophy className="ml-1" />
          <span>{trophies}</span>
        </div>
      </div>
    </div>*/