<p align="center">
  <img src="https://user-images.githubusercontent.com/8251208/62000501-f7d15500-b0ae-11e9-9bb7-a7e8c93174b7.png" width="75%">
</p>

<h1 align="center">Escritório Pagarme</h1>

<p align="center">
  <sub>
    <sup>
      <a href="/README.md" align="center">[english version]</a>
    </sup>
  </sub>
</p>

<p align="center">
  Projeto altamente inspirado pelo <a href="https://github.com/ResultadosDigitais/matrix">Matrix</a>
  que tem por objetivo a criação de um ambiente de preseça virtual com videoconferência.
</p>

## Descrição

O projeto foi construído com o objetivo de permitir remotos se comunicar rapidamente e diretamente com não remotos sem a necessidade de agendamento ou criação de salas no Hangouts/Meet.

Objetivos do protótipo:

- [x] Login usando Google.
- [x] Sistema de presença que indica o status de um usuário.
- [x] Integração com sistema de vídeo usando Jitsi.
- [x] Restrição de login baseado em domínio usado.

### Tecnologias

O projeto tem como uma das premissas utilizar tecnologias ultra modernas e não depender de gerenciamento de servidores. Tendo isso em mente o projeto está sendo construído usando <a href="https://svelte.dev/" target="_blank">Svelte</a>, <a href="https://jitsi.org/" target="_blank">Jitsi</a>, <a href="https://firebase.google.com/docs/database" target="_blank">Firebase Realtime Database</a>, <a href="https://firebase.google.com/docs/functions" target="_blank">Firebase Functions</a> e <a href="http://now.sh">Zeit Now</a>.

## Como utilizar

O projeto está hospedado em <a href="https://escritorio.pagar.me" target="_blank">escritorio.pagar.me</a> entretanto para poder prosseguir com o login é necessário possuir um domínio do grupo Stone.co.

### Rodando localmente

1. Clone o repositório (ou fork).
2. Instale as dependências executando `docker-compose run install`.
3. Inicie o servidor local executando `docker-compose run client`.
4. Confira o endereço de Network exposto na saída do comando anterior, como abaixo:

```bash
  Your application is ready~! 🚀

    - Local:      http://localhost:5000
    - Network:    http://172.23.0.2:5000
```

5. Abra no seu browser o endereço indicado no **Network**.

## Contribuidores

| [<img src="https://avatars1.githubusercontent.com/u/4103305?v=3&s=115"><br><sub>@allangrds</sub>](https://github.com/allangrds) | [<img src="https://avatars1.githubusercontent.com/u/19209246?v=3&s=115"><br><sub>@jeanaugustoos</sub>](https://github.com/jeanaugustoos) | [<img src="https://avatars1.githubusercontent.com/u/8422610?v=3&s=115"><br><sub>@thor99</sub>](https://github.com/thor99) | [<img src="https://avatars1.githubusercontent.com/u/5989971?v=3&s=115"><br><sub>@MatheusVellone</sub>](https://github.com/MatheusVellone) | [<img src="https://github.com/devdrops.png" width="130px;"/><br><sub>@devdrops</sub>](https://github.com/devdrops) | [<img src="https://github.com/miglsoares.png" width="130px;"/><br><sub>@miglsoares</sub>](https://github.com/miglsoares) |
| :---: | :---: | :---: | :---: | :---: | :---: |

## Autor

| [<img src="https://avatars0.githubusercontent.com/u/8251208?v=3&s=115"><br><sub>@lucianopf</sub>](https://github.com/lucianopf) |
| :---: |
