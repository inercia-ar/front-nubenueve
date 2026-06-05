#!/usr/bin/env bash

> export.txt

find . -type f ! -name "export.txt" | while read FILE; do
echo "|| componente: $(basename "$FILE") -------------------------------------" >> export.txt
echo "" >> export.txt
cat "$FILE" >> export.txt
echo "" >> export.txt
echo "" >> export.txt
echo "---" >> export.txt
echo "" >> export.txt

done