#!/bin/bash

set -e

YARNRC_PATH="/home/theia/.yarnrc";
# YARNRC_PATH=$(pwd)/.yarnrc;

[ -z "${LOCAL_NPM_REGISTRY}" ] && \
    rm -rf ${YARNRC_PATH} && \
    exit 0;

[ -z "${PACKAGE_SCOPE}" ] && \
    rm -rf ${YARNRC_PATH} && \
    exit 0;

touch ${YARNRC_PATH};
printf "\"@${PACKAGE_SCOPE}:registry\" \"${LOCAL_NPM_REGISTRY}\"\\n\"registry\" \"http://registry.npmjs.org/\""  > ${YARNRC_PATH};

exit 0
