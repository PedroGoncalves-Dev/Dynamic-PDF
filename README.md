# Instruções para Configuração do Projeto

Este guia irá te orientar sobre como configurar e iniciar o projeto em sua máquina local.

## Passos para Iniciar

1. *Abra o projeto no VS Code*

   - Baixe ou clone o repositório em sua máquina.
   - Abra o Visual Studio Code (VS Code).
   - No VS Code, vá até File > Open Folder e selecione a pasta do projeto.

2. *Instalar Dependências*

   - Abra o terminal de comando no VS Code. Você pode fazer isso indo em Terminal > New Terminal ou usando o atalho ` Ctrl + shift + ' ` (aspas simples).
   - No terminal, execute o comando abaixo para instalar todas as dependências necessárias:
   
     bash
     npm install
     

3. *Iniciar o Servidor de Desenvolvimento*

   - Após a instalação das dependências, inicie o servidor de desenvolvimento executando o seguinte comando no terminal:
   
     bash
     npm run dev
     

   - O terminal exibirá um link HTTP. Para abrir o projeto no navegador, segure a tecla Ctrl e clique com o botão esquerdo do mouse sobre o link.

##

## Objetivo da aplicação
"A aplicação foi desenvolvida para gerar um PDF com as informações inseridas pelos usuários. Cada texto digitado em uma caixa de texto diferente é convertido em um parágrafo, sendo todos os parágrafos gerados na mesma página do PDF. As imagens adicionadas, por sua vez, são renderizadas em páginas separadas." 

## Instruções de usu
"Para adicionar um novo parágrafo de texto, é necessário clicar no botão 'Adicionar Texto'. Isso abrirá uma nova caixa de texto onde você poderá digitar. O mesmo processo se aplica para adicionar imagens. Após inserir todo o conteúdo desejado, clique no botão 'Gerar PDF'. Um botão de download será exibido, e o PDF será aberto na página para visualização imediata, sem a necessidade de baixá-lo." 

## Tecnologias
"O projeto foi desenvolvido em React.js e faz uso de diversas bibliotecas para aprimorar a funcionalidade. A biblioteca 'react-hook-form' foi utilizada para gerenciar a validação e os dados dos formulários. A geração de PDFs foi realizada com '@react-pdf/renderer'. Para o roteamento, utilizamos 'react-router-dom'. Os ícones foram implementados com 'react-icons', e o componente de loading exibido quando o usuário clica em 'Gerar PDF' foi adicionado com o 'antd'. Já o css foi usado module.css." 


