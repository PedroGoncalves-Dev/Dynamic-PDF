import { useState, useEffect, useRef } from 'react';
import styles from './GeradorPdf.module.css';
//ant design
import { Spin,Button } from 'antd';

// hook useform
import { useFieldArray, useForm } from 'react-hook-form';

// react-pdf/renderer
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

// components
import EstruturaPdf from '../../components/EstruturaPdf/EstruturaPdf';



const GeradorPdf = () => {

    const { register, handleSubmit, control,reset, formState: { errors } } = useForm({
        defaultValues: {
            conteudo:[
                { textoPdf: '', imgPdf: null } // já inicio os valores vazios
            ]
        }
    });

    const [pdfDados, setPdfDados] = useState([]); // deixo como array vazio para receber todos os conteudo.
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState()

    const { fields, append } = useFieldArray({
        control,
        name: 'conteudo',
    });

    
    const ultimoItemRef = useRef(null)
    const visualizarPdf = useRef(null)

    


     // Foca no topo da página ao carregar
     useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Monitorando o formulário: ao adicionar mais texto ou imagem, o scroll desce automaticamente.
    // Além disso, ao clicar em 'Gerar PDF', o scroll direciona automaticamente para a visualização do PDF
    useEffect(() => {
        if (fields.length > 1 && ultimoItemRef.current) {
            ultimoItemRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [fields]);

    useEffect(() => {
        if (pdfDados.length > 0 && visualizarPdf.current) {
            visualizarPdf.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [pdfDados]);


   

    const onSubmit = async (data) => {
        const novasEntradas = data.conteudo.map((item) => {
          
        if (item.imgPdf && item.imgPdf.length > 0) {
            const reader = new FileReader();

            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve({
                        texto: item.textoPdf || '',  // Caso o item seja uma imagem, o texto será vazio
                        imagem: reader.result,
                    });
                };

                reader.readAsDataURL(item.imgPdf[0]); // estou convertendo a img para base64
            });
        } else {
            return Promise.resolve({
                texto: item.textoPdf || '',
                imagem: null,
            });
        }
            
        });

        // aqui estou inserindo no array pdfDados todos os conteúdos que o usuário anexou
        Promise.all(novasEntradas).then((result) => {
            setPdfDados(result);
        });


        // aqui estou enviado o pdf para api
        setLoading(true) //inicio um estado de loading
        try {
            const res = await fetch('endereço da api', {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(pdfDados)
            })

            const resDados = await res.json()

            if(resDados.ok) {
                console.log('PDF enviado para api com sucesso')
            } else {
                console.log('Erro ao enviar o PDF para api')
                // setErro("Erro de req") como nao ira enviar mesmo para uma api deixei comentado
            }
            
        } catch (error) {
            console.log(error.message)
            
        } finally {
            setLoading(false)
            reset()
        }
    };

    return (
        <div className={styles.paginaPdf} >
            <h1>Gerador de PDF dinâmico</h1>
            <p>Insira um texto e uma imagem para poder gerar seu PDF...</p>

            <form className={styles.formPdf} onSubmit={handleSubmit(onSubmit)}>

                {/* aqui estarei fazendo um map, cada conteúdo inserido será salvo em um index */}
                {fields.map((field, index) => (
                    <div key={field.id} ref={index === fields.length - 1 ? ultimoItemRef : null}>

                        {/* // aqui é cada texto adicionado */}
                        {field.textoPdf !== undefined && (
                            <label>
                                <span>Texto:</span>
                                <textarea
                                    placeholder='Adicione o conteúdo que você deseja incluir no PDF'
                                    {...register(`conteudo.${index}.textoPdf`, { required: 'Digite um texto' })}
                                />
                                
                                {/* se o usuário não inserir um texto, transmito a msg para ele inserir */}
                                {errors.conteudo?.[index]?.textoPdf && (
                                    <p className={styles.error}>{errors.conteudo[index].textoPdf.message}</p>
                                )}
                            </label>
                        )}

                       
                        {/* aqui é cada img adicionado */}
                        {field.imgPdf !== undefined && (
                            <label>
                                <span>Insira sua imagem:</span>
                                <input 
                                    type="file"
                                    {...register(`conteudo.${index}.imgPdf`, { required: 'Insira uma imagem, por favor' })}
                                />
                                {errors.conteudo?.[index]?.imgPdf && (
                                    <p className={styles.error}>{errors.conteudo[index].imgPdf.message}</p>
                                )}
                            </label>
                        )}

                    </div>
                ))}

                <div className={styles.botoesForm}>

                    {/* botão para ir adicionando os conteúdos */}
                    <button 
                        type="button" 
                        onClick={() => append({ textoPdf: '' })}
                        title='Clique se quiser inserir mais texto'
                    >
                        Adicionar Texto
                    </button>

                    <button 
                        type="button" 
                        onClick={() => append({ imgPdf: [] })}
                        title='Clique se quiser inserir uma imagem'
                    >
                        Adicionar Imagem
                    </button>

                    {/* checo laoding pro 'usu' nao ficar apertando o botao enquanto esta enviando para api */}
                    {!loading ? (

                        <input type="submit" value="Gerar PDF" title='Clique para gerar o pdf e envia-lo para api' />
                        
                    ) : (

                        <Spin />

                    )}

                    {erro &&
                        <p className={styles.erro}>Falha ao enviar PDF para api</p>
                        }
                </div>
            </form>

            {/* aqui faço uma condição (se o array pdfDados tiver mais que um objeto) */}
            {pdfDados.length > 0 && (
               <div ref={visualizarPdf} className={styles.containerPdf}>

                    <h2>Visualizar PDF</h2>

                    <div className={styles.downloadLink}>
                        <PDFDownloadLink
                            document={<EstruturaPdf conteudo={pdfDados} />}
                            fileName="pdfDinamico.pdf"
                        >
                            {({ loading }) => (loading ? (
                                <Spin />
                            ) : <Button type="primary" className={styles.botaoPdf}>Baixar PDF</Button>)}
                        </PDFDownloadLink>
                    </div>

                    <div className={styles.pdf}>
                        <PDFViewer width="100%" height="600">
                            <EstruturaPdf conteudo={pdfDados} />
                        </PDFViewer>
                    </div>

                </div>
            )}
        </div>
    );
};

export default GeradorPdf;
