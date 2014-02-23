#!/bin/bash
grep -vi ^debate $1 |
  grep -v ^dabate |
  grep -v ^debete |
  grep -v ^debaet |
  grep -v mododebate |
  grep -v laninezcuenta |
  grep -v eleccion2014 |
  grep -v eleccionescr |
  grep -v votocr |
  grep -v ^voto201 > tmp
mv tmp $1
