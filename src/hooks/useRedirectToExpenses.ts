import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const useRedirectToExpenses = () => {

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        
        //navigate(`/${params.groupid}/transactions`)
        navigate(`/groups/active/${params.groupid}/expenses`)
    }, [])

    return null;
}
