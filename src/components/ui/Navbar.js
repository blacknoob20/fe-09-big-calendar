import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const Navbar = () => {
    const disptach = useDispatch();
    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        console.log('Salir');
        disptach(startLogout());
    }

    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>{name}</span>
            <button className='btn btn-outline-danger'>
                <i className='fas fa-sign-out-alt'></i>
                <span onClick={handleLogout}>Salir</span>
            </button>
        </div>
    )
}
