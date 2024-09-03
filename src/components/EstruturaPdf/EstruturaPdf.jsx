import { Document, Page, Text, View, StyleSheet, Image,Font } from '@react-pdf/renderer';


Font.register({  //registrando a fonte nao usual Lobster
    family: 'Lobster',
    src: '../../../public/fonts/Lobster-Regular.ttf',
  });

// estilização para o PDF
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: "Lobster",
        fontWeight: 400,
        fontStyle: 'normal'
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
        paddingBottom: 10,
    },
    content: {
        fontSize: 15,
        textAlign: 'justify',
    },
    image: {
        marginTop: 10,
    },
});

// Componente para a página com todos os textos juntos
const PaginaComTexto = ({ textos }) => (
    <Page style={styles.page}>
        <View style={styles.header}>
            <Text>PDF dinâmico</Text>
            <Text>Teste técnico desen. Junior</Text>
        </View>
        <View style={styles.content}>
            {textos.map((texto, index) => (
                <Text key={index}>• {texto}</Text>
            ))}
        </View>
    </Page>
);


// Componente para a página com uma imagem
const PaginaComImagem = ({ imagem }) => (
    <Page style={styles.page}>
        <View style={styles.header}>
            <Text>PDF dinâmico</Text>
            <Text>Teste técnico desen. Junior</Text>
        </View>
        <View style={styles.content}>
            {imagem && <Image style={styles.image} src={imagem} />}
        </View>
    </Page>
);

// Componente que estrutura o PDF
const EstruturaPdf = ({ conteudo }) => {
  
    const textos = conteudo.map(item => item.texto).filter(texto => texto); // Pegando todos os textos
    const imagens = conteudo.map(item => item.imagem).filter(imagem => imagem); // Pegando todas as imagens

    return (

        <Document>

            <PaginaComTexto textos={textos} />
                
            {imagens.map((imagem, index) => (
                <PaginaComImagem key={index} imagem={imagem} />
            ))}
   
        </Document>
    )
}
export default EstruturaPdf;
