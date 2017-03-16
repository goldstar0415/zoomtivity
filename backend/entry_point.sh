#!/usr/bin/env bash

#chmod -R 777 /data/tmp/php && chown -R 80:80 /data/ && composer install && \
env | sed "s/\(.*\)=\(.*\)/env[\1]='\2'/" > /data/conf/php-fpm-www-docker-env.conf && \
    echo "Sleep 20s..." && sleep 20 && \
    supervisorctl restart php-fpm && \
    /config/bootstrap.sh
