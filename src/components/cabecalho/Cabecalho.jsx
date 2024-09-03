
import styles from './Cabecalho.module.css'

import { NavLink,Link } from 'react-router-dom';

const Cabecalho = () => {

    return(
        <div className={styles.cabecalho}>
         
            <div>

                <Link to='/'>

                    <h1>dynamic <span>pdf</span></h1>
                
                </Link>
                
                <h2>Teste técnico Desenvolvedor junior</h2>

                <nav>
                    <ul>
                        <NavLink to='/'>
                            <li>Criar PDF</li>
                        </NavLink>
                        <NavLink to='/sobre'>
                            <li>Sobre</li>
                        </NavLink>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Cabecalho;