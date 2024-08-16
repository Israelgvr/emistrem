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
                routeLink: '/courses',
                label: 'Cursos'
            },
            {
                routeLink: '/login',
                label: 'Mis cursos'
            }
        ]
    },
    {
        routeLink: '',
        label: 'administracion',
        items: [
            {
                routeLink: '/categories',
                label: 'Categorias'
            },
            {
                routeLink: '/users',
                label: 'Usuarios'
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