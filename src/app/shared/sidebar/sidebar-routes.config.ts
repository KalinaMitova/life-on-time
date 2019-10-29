import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [


    {
        path: '/goals/all', title: 'My Goals', icon: 'ft-target', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: []
    },

    {
        path: '/wellbeing', title: 'My Wellbeing', icon: 'ft-headphones', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/wellbeing/relax-me', title: 'Relax me', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/wellbeing/inspire-me', title: 'Inspire me', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/wellbeing/teach-me', title: 'Teach me', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '/ideas', title: 'My ideas', icon: 'ft-clipboard', class: '', badge: '', badgeClass: '', isExternalLink: false,
        submenu: []
    },
    { path: '/calendar', title: 'Calendar', icon: 'ft-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    {
        path: '/progress-dashboard', title: 'Progress', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    { path: '/help', title: 'Help', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

];



// {
//     path: '', title: 'My Goals', icon: 'ft-target', class: 'has-sub', badge: '1', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
//         submenu: [
//             { path: 'javascript:;', title: 'Second Level', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
//             {
//                 path: '', title: 'Second Level Child', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
//                 submenu: [
//                     { path: 'javascript:;', title: 'Third Level 1.1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
//                     { path: 'javascript:;', title: 'Third Level 1.2', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
//                 ]
//             },
//         ]
// },
