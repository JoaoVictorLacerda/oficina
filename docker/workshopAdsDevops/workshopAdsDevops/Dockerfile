FROM maven:3.9.3-amazoncorretto-17 AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests=true

FROM openjdk:17.0.1-oracle
COPY --from=build /home/app/target/workshopAdsDevops-0.0.1-SNAPSHOT.jar /usr/local/lib/workshopAdsDevops.jar
EXPOSE 5000
ENTRYPOINT ["java","-jar","/usr/local/lib/workshopAdsDevops.jar"]