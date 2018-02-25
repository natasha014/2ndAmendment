window.onload = function() {
  console.log("The script has loaded")
  var socket = io();
  var smoothie = new SmoothieChart({
    grid: { strokeStyle:'rgb(250, 235, 215)', fillStyle:'rgb(0, 128, 128)',
          lineWidth: 1, millisPerLine: 1000, verticalSections: 6, },
          labels: { fillStyle:'rgb(0, 128, 128)' }
  });
  smoothie.streamTo(document.getElementById("mycanvas"), 100 /*delay*/);
  var line1 = new TimeSeries();
  var line2 = new TimeSeries();
  var line3 = new TimeSeries();
  var line4 = new TimeSeries();

  setInterval(function() {
    socket.on('mellow activity', function(msg1) {
      console.log("Mellow activity: " + msg1);
      // line1.append(new Date().getTime(), msg1);
    });

    socket.on('concentration activity', function(msg2) {
      console.log("Concentration activity: "+ msg2);
      // line2.append(new Date().getTime(), msg2);
    });

    socket.on('jaw clench activity', function(msg3) {
      console.log("Jaw clench activity: " + msg3);
      line3.append(new Date().getTime(), msg3);
    });

    socket.on('eeg activity', function(msg4) {
      console.log("EEG activity: " + msg4);
      line4.append(new Date().getTime(), msg4);
    });
  }, 1000);

  // Add to SmoothieChart
  smoothie.addTimeSeries(line1,
    { strokeStyle:'rgb(255, 255, 0)', fillStyle:'rgba(0, 255, 0, 0.3)', lineWidth:3 });
  smoothie.addTimeSeries(line2,
    { strokeStyle:'rgb(100, 149, 237)', fillStyle:'rgba(100, 149, 237, 0.3)', lineWidth:3 });
  smoothie.addTimeSeries(line3,
    { strokeStyle:'rgb(139, 0, 139)', fillStyle:'rgba(139, 0, 139, 0.3)', lineWidth:3 });
  smoothie.addTimeSeries(line4,
    { strokeStyle:'rgb(169, 169, 169)', fillStyle:'rgba(169, 169, 169, 0.3)', lineWidth:3 });

}
