#/bin/sh

x=1
while [ $x -le 100 ]
do
  echo "Welcome $x times"
  x=$(( $x + 1 ))
  sleep 2
  curl http://sensorapiturings.herokuapp.com/sendTemperature?temp="$x"\&hum="$x"
done