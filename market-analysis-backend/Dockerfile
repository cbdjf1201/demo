FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY market-analysis-backend/pom.xml ./pom.xml
COPY market-analysis-backend/src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/target/market-analysis-backend-0.0.1-SNAPSHOT.jar app.jar
COPY ["House Price Dataset.csv", "/app/House Price Dataset.csv"]
ENV HOUSING_DATASET_PATH="/app/House Price Dataset.csv"
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
