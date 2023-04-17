import { IMenu } from '../models/menuModel'

const Menu: IMenu[] = [
  {
    title: "Principal",
    path: null,
    icon: null,
    active: false,
    child: [
      {
        title: "Dashboard",
        path: "/",
        icon: "home",
        active: false
      }
    ]
  },
  {
    title: "Finances",
    path: null,
    icon: null,
    active: false,
    child: [
      {
        title: "Posts list",
        path: "/posts",
        icon: "article",
        active: false
      },
    ],
  },
  {
    title: "Admin",
    path: null,
    icon: null,
    active: false,
    child: [
      {
        title: "Users",
        path: "/users",
        icon: "people",
        active: false,
        child: [
          {
            title: "User list",
            path: "/users/list",
            icon: null,
            active: false
          },
          {
            title: "Permissions",
            path: "/users/permissions",
            icon: null,
            active: false
          },
          {
            title: "Roles",
            path: "/users/roles",
            icon: null,
            active: false
          },
        ]
      },
      {
        title: "Settings",
        path: "/settings",
        icon: "settings",
        active: false,
      }
    ]
  }
]

export default Menu