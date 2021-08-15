import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function HomePage () {
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) {
        return <Redirect to="/" />
    }
    return (
        <div>
            Hello from the home page!
        </div>
    )
}
