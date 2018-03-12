"use strict";
/*
 * Copyright (c) 2018 Red Hat, Inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */
const fs = require("fs");
const cp = require("child_process");
const theiaRoot = '/home/theia';
const theiaPath = theiaRoot + '/package.json';

const defaultTheia = `/home/default/theia`;
const defaultConfig = require(`${defaultTheia}/package.json`);

process.chdir(theiaRoot);

let theiaConfig;

//cp.execSync(`${theiaRoot}/cleanUp.sh`);
//if (fs.existsSync(theiaPath)) {
//    handlePromise(callRun());
//}
//else {
    console.log("begin work")
    let pluginString = process.env.THEIA_PLUGINS;
    let pluginList = [];
    if (pluginString && pluginString.length !== 0) {
	    console.log("Run with plugins " + pluginString);
        let arr = pluginString.split(',');
        pluginList = [...arr];
        theiaConfig = defaultConfig;
        let dep = theiaConfig.dependencies;
        for (let d of pluginList) {
            if (d.indexOf(":") > -1) {
                let newDep = d.split(":");
                let depName = newDep[0].trim();
                let depVersion = newDep[1].trim();
                dep[depName] = depVersion;
                continue;
            }
            if (!dep.hasOwnProperty(d)) {
                dep[d] = "latest";
            }
        }
        fs.writeFileSync(theiaPath, JSON.stringify(theiaConfig));
        handlePromise(callYarn().then(callBuild).then(callRun));
    } else {
	    console.log("Launch default Theia");
        //cp.execSync(`cp -r ${defaultTheia}/\* ${theiaRoot}`);
        cp.execSync(`rsync -rv ${defaultTheia}/ ${theiaRoot} --exclude 'node_modules' --exclude 'yarn.lock'`);
        handlePromise(callRun());
    }

//}

function promisify(command, p) {
    return new Promise((resolve, reject) => {
        p.stdout.on('data', data => process.stdout.write(data.toString()));
        p.stderr.on('data', data => process.stderr.write(data.toString()));
        p.on('error', reject);
        p.on('close', code => {
            if (code === 0) {
                resolve();
            }
            else {
                reject(new Error(command + ' failed with the exit code ' + code));
            }
        });
    });
}
function callYarn() {
    return promisify('yarn', cp.spawn('yarn'));
}
function callBuild() {
    return promisify('yarn theia build', cp.spawn('yarn', ['theia', 'build']));
}
function callRun() {
    return promisify('yarn theia start', cp.spawn('yarn', ['theia', 'start', '/projects', '--hostname=0.0.0.0']));
}
function handlePromise(p) {
    p.catch(error => {
        console.error(error);
    }).catch(() => {
    });
}
