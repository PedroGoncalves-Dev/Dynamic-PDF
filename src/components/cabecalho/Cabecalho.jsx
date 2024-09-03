import styles from './Cabecalho.module.css'

import { NavLink,Link } from 'react-router-dom';

const Cabecalho = () => {

    return(
        <div className={styles.cabecalho}>
            <div>

                <Link to='/'>

                    <h1>PDF <span>dinâmico</span></h1>
                
                </Link>
                
                <h2>Teste tecnico Desenvolvedor junior</h2>

                <nav>
                    <ul>
                        <NavLink to='/'>
                            <li>Home</li>
                        </NavLink>
                        <NavLink to='/'>
                            <li>Criar PDF</li>
                        </NavLink>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Cabecalho;