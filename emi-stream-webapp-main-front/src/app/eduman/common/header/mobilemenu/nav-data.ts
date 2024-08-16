import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: '',
        label: 'Inicio'
    },
    {
        routeLink: '',
        label: 'Cursos',
        items: [
            {
                routeLink: '/course-3',
                label: 'Cursos'
            }
            {
                routeLink: '/course-3',
                label: 'Mis Cursos'
            }
        ]
    },
    {
        routeLink: '',
        label: 'Instructor',
        items: [
            {
                routeLink: '/',
                label: 'Instructores'
            },
            {
                routeLink: '/',
                label: 'Perfil Instructor'
            },
            {
                routeLink: '/',
                label: 'Perfil estudiante'
            }
        ]
    },
    {
        routeLink: '',
        label: 'Informacion',
        items: [
            {
                routeLink: '/about',
                label: 'Sobre Nosotros'
            },
        ]
    }
];