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
import { Content } from 'antd/es/layout/layout';


const GeradorPdf = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            conteudo: [
                { textoPdf: '', imgPdf: null } // já inicio os valores vazios
            ]
        }
    });

    const [pdfDados, setPdfDados] = useState([]); // deixo como array vazio para receber todos os cont.

    const { fields, append } = useFieldArray({
        control,
        name: 'conteudo',
    });

    const ultimoItemRef = useRef(null)
    const visualizarPdf = useRef(null)


    //aqui estou monitorando o form toda vez que ele aumentar clikcando add texto imagem, o scroll desça
    // automaticamente e tambem estou monitando quando clicka em gerar pdf ele vai automaticamente para visualizar pdf
    useEffect(() => {
        if(ultimoItemRef.current) {
            ultimoItemRef.current.scrollIntoView({ behavior: 'smooth'})
        }
        if (visualizarPdf.current) {
            visualizarPdf.current.scrollIntoView({ behavior: 'smooth'})
        }
    },[fields, pdfDados])


   

    const onSubmit = (data) => {
        const novasEntradas = data.conteudo.map((item) => {
            const reader = new FileReader();

            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve({
                        texto: item.textoPdf,
                        imagem: reader.result,
                    });
                };

                reader.readAsDataURL(item.imgPdf[0]); // estou convertendo a img para base64
            });
        });

        // aqui estou inserindo no array pdfDados todos os conteúdos que o usuário anexou
        Promise.all(novasEntradas).then((result) => {
            setPdfDados(result);
        });
    };

    return (
        <div className={styles.paginaPdf}>
            <h1>Gerador de PDF dinâmico</h1>
            <p>Insira um texto e uma imagem para poder gerar seu PDF...</p>

            <form className={styles.formPdf} onSubmit={handleSubmit(onSubmit)}>

                {/* aqui estarei fazendo um map, cada conteúdo inserido será salvo em um index */}
                {fields.map((field, index) => (
                    <div key={field.id} ref={index === fields.length -1 ? ultimoItemRef : null}>
                        <label>
                            <span>Texto:</span>

                            <textarea
                                {...register(`conteudo.${index}.textoPdf`, { required: 'Digite um texto' })}
                            />

                        </label>

                        {/* se o usuário não inserir um texto, transmito a msg para ele inserir */}
                        {errors.conteudo?.[index]?.textoPdf && (
                            <p className={styles.error}>{errors.conteudo[index].textoPdf.message}</p>
                        )}

                        <label>
                            <span>Insira sua imagem:</span>
                        </label>
                        <input
                            type="file"
                            {...register(`conteudo.${index}.imgPdf`, { required: 'Insira uma imagem, por favor' })}
                        />

                        {errors.conteudo?.[index]?.imgPdf && (
                            <p className={styles.error}>{errors.conteudo[index].imgPdf.message}</p>
                        )}

                    </div>
                ))}

                <div className={styles.botoesForm}>

                    {/* botão para ir adicionando os conteúdos */}
                    <button type="button" onClick={() => append({ textoPdf: '', imgPdf: null })}>
                        Adicionar texto e imagem
                    </button>

                    <input type="submit" value="Gerar PDF" />
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
