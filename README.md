# BACK DALCOL

Se voce ja tem uma instancia do elasticsearch, dados e uma query para teste, voce pode pular as instrucoes em PREPARANDO AMBIENTE.

## PREPARANDO AMBIENTE

Em um terminal, entre na pasta deste projeto e execute:

```bash
make elasticsearch
# Em outro terminal ou aba
make kibana
# Em outro terminal ou aba
npm install
```

Depois acesse:  
`http://localhost:5601/app/management/kibana/dataViews`

Clique em _Add sample data_  
na ultima opcao _Sample web logs_  
clique em _Add data_

## EXECUTANDO O PROJETO

Para verificar as configuracoes do projeto, observe os arquivos na pasta _./src/app/config_

Para utilizar a sua propria consulta, altere o conteudo do arquivo _./src/app/query/accessLog.js_

Para executar o projeto execute:

```bash
npm run dev
```

Para visualizar detalhadamente a interacao entre uma requisicao e a resposta, execute:

```bash
curl -v http://localhost:8000
```

## E PRA FINALIZAR

Se voce pulou as instrucoes em PREPARANDO AMBIENTE voce nao precisa executar o comando abaixo.

Apos terminar execute:

```bash
make stop.all
```

Para parar e encerrar os container utilizado.

## COMENTARIO

`JSON.stringify` é lento pra xuxu, o ideal é tu pegar o que tu quer do objeto diretamente e gerar o json seguindo corretamente todas as especificacoes do formato json.

Ou usar uma lib com opcao de tu informar um schema, referente as informacoes que tu quer extrair do objeto javascript, para simplificar e tornar o processo de fazer manutencao no codigo algo mais simples.

Gerar json de forma automatica e generica é sempre a opcao mais lenta, quando o assunto é gerar um json

## REFERENCIA

`https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/scroll_examples.html`
