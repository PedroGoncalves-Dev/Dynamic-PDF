import styles from './Sobre.module.css'

const Sobre = () => {

    return(
        <div className={styles.sobre}>
            <section>

                <h1>Objetivo da aplicação</h1>
                <p>
                    "A aplicação foi desenvolvida para gerar um PDF com as informações inseridas pelos usuários. 
                    Cada texto digitado em uma caixa de texto diferente é convertido em um parágrafo, 
                    sendo todos os parágrafos gerados na mesma página do PDF. As imagens adicionadas, 
                    por sua vez, são renderizadas em páginas separadas."
                </p>
            </section>

            <section>
                <h1>Instruções de usu</h1>
                <p>
                    "Para adicionar um novo parágrafo de texto, é necessário clicar no botão 'Adicionar Texto'. 
                    Isso abrirá uma nova caixa de texto onde você poderá digitar. 
                    O mesmo processo se aplica para adicionar imagens. Após inserir todo o conteúdo desejado, 
                    clique no botão 'Gerar PDF'. Um botão de download será exibido, 
                    e o PDF será aberto na página para visualização imediata, sem a necessidade de baixá-lo."
                </p>
            </section>
            <section>
                <h1>Tecnologias</h1>
                <p>
                    "O projeto foi desenvolvido em React.js e faz uso de diversas bibliotecas para aprimorar a 
                    funcionalidade. A biblioteca 'react-hook-form' foi utilizada para gerenciar a validação e os 
                    dados dos formulários. A geração de PDFs foi realizada com '@react-pdf/renderer'. 
                    Para o roteamento, utilizamos 'react-router-dom'. Os ícones foram implementados com 'react-icons', 
                    e o componente de loading exibido quando o usuário clica em 'Gerar PDF' foi adicionado com o 'antd'.
                    Já o css foi usado module.css."
                </p>
            </section>
        </div>
    )
}

export default Sobre;