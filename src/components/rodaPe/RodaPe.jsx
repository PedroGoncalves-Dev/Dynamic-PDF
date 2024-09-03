import styles from './RodaPe.module.css'

const RodaPe = () => {

    return(

        <div className={styles.rodaPe}>
            <div className={styles.conteudoRodaPe}>

                <h1>Pedro Henrique Goncalves</h1>

                <div>
                    <ul>
                        <li>Linkedin</li>
                        <li>Instagram</li>
                        <li>GitHub</li>
                    </ul>
                </div>

                <p>&copy;2024 Pedro Henrique Gonçalves. Todos os direitos reservados</p>
            </div>
        </div>
    )
}

export default RodaPe;