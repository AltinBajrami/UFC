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
                url: '/events/upcoming',
            },
            {
                id: nanoid(),
                label: 'past',
                icon: <SiPastebin />,
                url: '/product/past',
            },
            {
                id: nanoid(),
                label: 'tickets',
                icon: <IoTicketSharp />,
                url: '/product/tickets',
            },
            {
                id: nanoid(),
                label: 'Manage event',
                icon: <MdOutlineManageHistory />,
                url: '/events/manage',
            },
        ],
    },
    {
        pageId: nanoid(),
        page: 'Rankings',
        links: [
            {
                id: nanoid(),
                label: 'manage rankings',
                icon: <MdOutlineManageHistory />,
                url: '/rankings/manage',
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
                url: '/resources/starters',
            },
            {
                id: nanoid(),
                label: 'manage athletes',
                icon: <MdOutlineManageHistory />,
                url: '/athletes/manage',
            },
        ],
    },
];

export default sublinks;
