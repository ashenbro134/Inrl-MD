FROM quay.io/inrlwabot/inrl:latest
RUN git https://github.com/ashenbro134/Inrl-MD/root/ashenbro134
WORKDIR /root/inrl/
RUN yarn install --network-concurrency 1
EXPOSE 8000
CMD ["npm", "start"]
