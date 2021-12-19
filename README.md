# KEEP IT

### Keep It é uma API que busca auxilizar no aprendizado, memorização e na retenção de novos conteúdos pondo em prática a técnica de Spaced Memorization

# Spaced Memorization 🧠

É uma técnica de memorização que toma vantagem dos mecanismos de aprendizagem do cérebro para facilitar a aprendizagem e retenção de novos conteúdos. <br/> Segundo o psicólogo Hermann Ebbinghaus, repetir o estudo de uma matéria em intervalos cada vez mais espaçados faz o cérebro dar mais importância aquela informação e ajuda a reter-la por longos períodos de tempo.

![alt text](https://149664534.v2.pressablecdn.com/wp-content/uploads/2018/12/learning-v1.png)

# Workflow

Cada usuário cria uma conta que é armazenada na API e então pode criar

### Cartas

* Contém uma pergunta e uma resposta (vai ser usado para testar o conhecimento do usuário)
* A data da última vez q o usuário respondeu a carta e a próxima vez q ela deve ser respondida

### Decks

* São agrupamentos de Carta para juntar cartas de uma mesma matéria

### Attempts

* São as tentativas de solucionar uma das cartas
* Caso a tentativa seja bem sucedida, é aumentado o intervalo para a próxima iteração, caso contrário, o intervalo continua o mesmo

Ou seja, se o usuário busca memorizar o comando `arr.sort((a,b) => return a - b)` que ordena um array do menor valor para o maior valor ele pode criar um Deck "Javascript" com uma carta com a pergunta: "Como ordenar um Array?" e revisitar essa carta depois de 1 dia, 1 semana, 2 semanas e 1 mês.

Há uma rota na aplicação pra justamente mostrar quais são as próximas atividades que devem ser feitas, facilitando a organização das notas e impulsionando o aprendizado de todos que utilizarem o aplicativo.


# Tecnologias

## Node, Typescript, Prisma, Express