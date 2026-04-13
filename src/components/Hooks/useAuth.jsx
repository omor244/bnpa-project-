import { useContext } from 'react'
import { AuthContext } from '../Auth/Providers/AuthContext'


const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
}

export default useAuth
