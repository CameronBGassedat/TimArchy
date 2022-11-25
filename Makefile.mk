DOCKER_USERNAME ?= username
APPLICATION_NAME ?= hello-world
LOCAL_IMAGE_NAME ?= local-container
CLOUD_MYSQL_IMAGE_NAME ?= mysql-container
CLOUD_PROMOTHEUS_IMAGE_NAME ?= promotheus-container

cloud:
	docker build . -t ./Cloud/[CLOUD_PROMOTHEUS_IMAGE_NAME]
	docker build . -t ./Cloud/[CLOUD_MYSQL_IMAGE_NAME]
	docker run ./Cloud/[CLOUD_PROMOTHEUS_IMAGE_NAME]
	docker run ./Cloud/[CLOUD_MYSQL_IMAGE_NAME]

	docker-compose ./Cloud/docker-compose.yml up

local:
	docker build . -t ./Local/[LOCAL_IMAGE_NAME]
	docker run ./Local/[LOCAL_IMAGE_NAME]

# clean-cloud:
#  	docker down 