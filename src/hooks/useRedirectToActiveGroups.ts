import { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'

export const useRedirectToActiveGroups = () => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/groups/active`)
    }, [])

    return null;
}
