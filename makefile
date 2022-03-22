DEV_NETWORK=dev
ES_CONTAINER_NAME=dev-elasticsearch-srv
ES_PORT1=9200
ES_PORT2=9300
KIBANA_CONTAINER_NAME=dev-kibana-srv
KIBANA_PORT=5601

elasticsearch:
	-@docker network create ${DEV_NETWORK}
	@sleep 2
	docker run --rm -ti --name ${ES_CONTAINER_NAME} --hostname ${ES_CONTAINER_NAME} \
		-e "xpack.security.enabled=false" -e "discovery.type=single-node" \
		--network ${DEV_NETWORK} \
		-p ${ES_PORT1}:9200 -p ${ES_PORT2}:9300 \
	docker.io/elasticsearch:8.1.0

kibana:
	-@docker network create ${DEV_NETWORK}
	@sleep 2
	docker run --rm -ti --name ${KIBANA_CONTAINER_NAME} --hostname ${KIBANA_CONTAINER_NAME} \
		-e "ELASTICSEARCH_HOSTS=http://${ES_CONTAINER_NAME}:9200" \
		--network ${DEV_NETWORK} \
		-p ${KIBANA_PORT}:5601 \
	docker.io/kibana:8.1.0

stop.all:
	-docker stop ${KIBANA_CONTAINER_NAME}
	-docker stop ${ES_CONTAINER_NAME}
	@sleep 2
	docker network rm ${DEV_NETWORK}
