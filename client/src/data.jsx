import { MdUpcoming, MdOutlineManageHistory, MdOutlineSportsMartialArts } from "react-icons/md";
import { SiPastebin } from "react-icons/si";
import { nanoid } from 'nanoid';
import { IoTicketSharp } from "react-icons/io5";

const sublinks = [
    {
        pageId: nanoid(),
        page: 'Events',
        links: [
            {
                id: nanoid(),
                label: 'upcoming',
                icon: <MdUpcoming />,
                url: '/events?time=upcoming',
            },
            {
                id: nanoid(),
                label: 'past',
                icon: <SiPastebin />,
                url: '/events/?time=past',
            }
        ],
    },
    {
        pageId: nanoid(),
        page: 'Rankings',
        links: [
            {
                id: nanoid(),
                label: ' rankings',
                icon: <MdOutlineManageHistory />,
                url: '/rankings',
            }
        ],
    },
    {
        page: 'athletes',
        pageId: nanoid(),
        links: [
            {
                id: nanoid(),
                label: 'all athletes',
                icon: <MdOutlineSportsMartialArts />,
                url: '/athletes',
            },
        ],
    },
];

export default sublinks;
