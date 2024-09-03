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
        fontSize: 12,
        textAlign: 'justify',
    },
    image: {
        marginTop: 10,
    },
});

// Componente para a página com o cabeçalho fixo
const PaginaComCabecalho = ({ texto, imagem }) => (
    <Page style={styles.page}>
        <View style={styles.header}>
            <Text>PDF dinâmico</Text>
            <Text>Teste técnico desen. Junior</Text>
        </View>

        <View style={styles.content}>
            <Text>{texto}</Text>
            {imagem && <Image style={styles.image} src={imagem} />}
        </View>
    </Page>
);

// Componente que estrutura o PDF
const EstruturaPdf = ({ conteudo }) => (
    <Document>
        {conteudo.map((item, index) => (
            <>
                <PaginaComCabecalho key={index} texto={item.texto}  />
                <PaginaComCabecalho key={index} imagem={item.imagem} />
            </>
        ))}
    </Document>
);

export default EstruturaPdf;
