# Q-and-A-API
Questions and Reviews API Rebuild

This project is part of a scalable microservice used to replace a legacy API for a growing e-commerce site due to an increase in traffic. This particular project is for the questions and answers portion of the API, and was deployed using AWS EC2 t2.micro instances.

## Built with:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

## Other tools:
- loader.io
- K6

## Notes/Accomplishments
- Seeded a PostgreSQL database with over 13 million records
- Locally optimized for 1000 requests per second with 0% error rate using hash indexing
- Used total of 5 EC2 t2.micro instances:
    - 1 database
    - 1 NGINX Load Balancer
    - 3 API Servers

## Test Results
- Deployed Results
- ![Untitled](https://user-images.githubusercontent.com/57540412/151482925-e5fd2d77-bd78-4205-88f9-9d8335219d51.png)

## Next Steps
- Judging from the rror logs it looks like promises are timing out towards the end during tests after 1000 clients per second, which leads me to believe I need to refactor my API to execute more complex queries and rely less on JavaScript to complete the requests
- Can use New Relic to double check thats where the bottleneck lies
