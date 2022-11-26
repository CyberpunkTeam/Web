build:
	docker build  . --rm  -t app-node
start:
	docker run --rm -it --name app-node -p 3000:3000 app-node
