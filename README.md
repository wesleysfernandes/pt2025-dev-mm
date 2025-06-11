# Payment checkout

## Variáveis de ambiente

<p>Apenas uma variável de ambiente está no .env, o endereço da API feita com Spring. Por padrão a porta está 8080</p>
<p>Na pasta frontend, criar .env com a seguinte linha:</p>
<p><code>PAYMENT_API_URL=http://localhost:8080/api</code></p>
<p>Com isso o frontend estará conectado com o backend após inicialização dos dois serviços.</p>

## Iniciar backend

<p>Dentro da pasta backend:</p>
<p><code>./mvn spring-boot:run</code></p>

## Iniciar frontend

<p>Dentro da pasta frontend</p>
<p><code>npm i</code></p>
<p><code>npm run dev</code></p>
