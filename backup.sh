#!/bin/sh
git add .tmp/disk.db;
git ci -m 'backup';
git push origin master;


