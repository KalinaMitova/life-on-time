import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/progress-dashboard', title: 'Progress', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'My Goals', icon: 'ft-target', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            // { path: '/goals/health-wellbeing', title: 'Health and Wellbeing', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/goals/personal-development', title: 'Personal Development', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/goals/relationships', title: 'Relationships', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/goals/physical-activity', title: 'Physical Activity', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/goals/financial', title: 'Financial', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '/', title: 'My ideas', icon: 'ft-clipboard', class: '', badge: '', badgeClass: '', isExternalLink: false,
        submenu: []
    },
    {
        path: '/', title: 'My Wellbeing', icon: 'ft-headphones', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: 'javascript:;', title: 'Relax me', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: 'javascript:;', title: 'Inspire me', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: 'javascript:;', title: 'Teach me', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
    },
    { path: '', title: 'Calendar', icon: 'ft-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '', title: 'Help', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

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
