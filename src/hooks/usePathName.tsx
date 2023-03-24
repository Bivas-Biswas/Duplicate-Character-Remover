import { useLocation } from 'react-router-dom'

const usePathName = () => {
  const location = useLocation()
  const pathname = location.pathname

  if (pathname === '/') return 'home'

  return pathname.slice(1)
}

export default usePathName
