import styles from './RodaPe.module.css'
import { Link } from 'react-router-dom';
// icones
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { PiMicrosoftOutlookLogoBold } from "react-icons/pi";

const RodaPe = () => {

    return(

        <div className={styles.rodaPe}>
            <div className={styles.conteudoRodaPe}>

                <h1>
                    <PiMicrosoftOutlookLogoBold size={15}/>
                    pedro_developer@outlook.com
                </h1>

                <div>
                    <ul>
                        <li> <Link to='https://www.linkedin.com/in/pedrodev-goncalves'> <FaLinkedin size={20} /> </Link></li>
                        <li><FaSquareInstagram size={20} /></li>
                        <li> <Link to='https://github.com/PedroGoncalves-Dev' ><FaGithub size={20} /> </Link></li>
                    </ul>
                </div>

                <p>&copy;2024 Pedro Henrique Gonçalves. Todos os direitos reservados</p>
            </div>
        </div>
    )
}

export default RodaPe;