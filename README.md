# Tornando as coisa mais simples com Azure functions e Node.JS

Exemplos utilizados na palestra: **Tornando as coisa mais simples com Azure functions e Node.JS** realizada no TDC (The Developers Conference) 2018, edição de Porto Alegre, na trilha de Node.JS.

Se trata de uma apresentação sobre Serverless e o funcionamento das Azure Functions, ecossistemas e funcionalidades, com exemplos de código e um pouco mais.

## Observação

Todos os exemplos a seguir utilizando a v2 das Azure Functions

## Exemplo 1 - Upload + Azure Cognitive Service + Leitura Azure Storage

Aplicação consiste em dois diretórios:

* tdc-poa-2018-sample1: Aplicativo de funções completo, com configurações de _Proxy_ e compartilhamento de código entre as diferente _Functions_
    * Árvore de diretórios:
        ``` bash
        tdc-poa-2018-sample1
        ├───.vscode
        ├───http-request # Código compartilhado para consumo de Cognitive Service
        ├───image-service # Código compartilhado para consumo dos serviços de Storage, necessário rodar 'npm install'
        ├───list-images # Função de consumo das imagens carregadas
        ├───static
        │   └───resources # Arquivos estáticos providos no Proxy
        └───UploadImage # Função que gerencia upload de Imagem
        ```

* tdc-poa-front: front-end do exemplo, utilizando **Angular** e **Fetch API** para consumo dos endpoints das functions

O aplicativos de funções deve ser publicado no Azure ou rodados utilizando o VS Code, porém os serviços de Storage devem ser definidos (CDN também), assim como os *ApplicationSettings* utilizados pelo App.

Variáveis a serem declaradas:

* BLOB_URL - Endereço de consumo dos serviços de blobStore
* COGNITIVE_SECRET - AppKey pertencente ao CognitiveService publicado
* STORE_SECRET - Key para consumo dos serviços de Storage

## Exemplo 2 - Utilizando módulos NPM nas functions (Express)

Utilizando **Express.js** para gerenciar os verbos e rotas existentes no seu aplicativo de funções.

Deve ser rodado o comando para instalação das dependências e deste modo o aplicativo de funções já pode ser publicado ou testado utilizando o CLI das functions:

```bash
    npm install
```

## Slides

* [Plaforma SlideShare](https://www.slideshare.net/MatheusDonizeteMatos/tornando-as-coisas-mais-simples-com-azure-functions-e-nodejs)
* [Plataforma Slides.com](https://slides.com/matheusdonizete/deck-10-12)
* [Opção como PDF](/azure-functions-nodejs.pdf)
* [Opção como PPT](/azure-functions-nodejs.pptx)