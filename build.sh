#!/bin/sh
# Copyright (c) 2018 Red Hat, Inc.
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Eclipse Public License v1.0
# which accompanies this distribution, and is available at
# http://www.eclipse.org/legal/epl-v10.html

#rm -rf ./src/main.js
#cp -f ~/theia_launcher/theia_launcher.js ./src
#mv ./src/theia_launcher.js ./src/main.js 

docker build -t aandrienko/patch-theia-launcher:latest .
