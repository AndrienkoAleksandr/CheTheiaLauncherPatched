#!/bin/bash

# docker run -p 3000:3000 -ti -v $(pwd)/src:/theia_launcher aandrienko/patch-theia-launcher bash
docker run -p 3000:3000 -e LOCAL_NPM_REGISTRY=http://${your.local.ip}:4873/ -ti aandrienko/patch-theia-launcher /bin/bash