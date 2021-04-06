# kafka-node-boilerplate

The repo contains a sample Kafa + Node.js setup with Producers consumers and admin

## Kafka and Zookeeper Setup

### 1. Setup Zookeeper

docker run -d \
--name zookeeper \
-p 2181:2181 \
jplock/zookeeper

### 2. Setup Kafka

docker run -d \
--name kafka \
-p 7203:7203 \
-p 9092:9092 \
-e KAFKA_ADVERTISED_HOST_NAME=192.168.0.170 \
-e ZOOKEEPER_IP=192.168.0.170 \
ches/kafka

- Note : 192.168.0.170 replace this with the present IP address of the machine
