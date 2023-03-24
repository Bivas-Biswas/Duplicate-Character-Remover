import { useLocation } from 'react-router-dom'

const usePathName = () => {
  const location = useLocation()
  return location.pathname
}

export default usePathName
