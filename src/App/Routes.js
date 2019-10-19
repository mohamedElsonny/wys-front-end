import { lazy } from 'react'

export default {
  home: lazy(() => import('../pages/home')),
  register: lazy(() => import('../pages/register')),
  bye: lazy(() => import('../pages/bye')),
  login: lazy(() => import('../pages/login'))
}
