## Descrição

API que consome cotações da API Frete Rápido.

## Tecnologias
- Linguagem: TypeScript - [Documentação](https://www.typescriptlang.org/)
- Framework: NestJS - [Documentação](https://docs.nestjs.com/)
- Banco de dados: MySQL - [Documentação](https://dev.mysql.com/doc/)

## Executando com o Docker

```bash
docker composer up -d
```
OBS: As portas 3000 e 3306 devem estar disponíveis.

## Instalação

```bash
npm install
```

## Executando o projeto

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Testes

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Padrão de commits
```shell
git commit -m "<tipo>: <descrição>"
```

| Tipo     | Descrição |
|----------| ------ |
| Fix      | Resolve um bug |
| Feat     | Inicia a implementação de uma funcionalidade | 
| Chore    |  Trabalho em progresso de uma funcionalidade | 
| Refactor |  Ajuste sem mudar lógica - refatoração | 
| Test     |  Implementa testes automatizados |
| Build    |   Ajuste em configurações de build |
| Docs     |  Insere documentação |

## Contato

- Autor - [Breno Machado](https://brenomachado.dev)
