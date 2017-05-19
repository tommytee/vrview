
function testSwitch ( scenes ) {

  var testRunning = false, count = 1, arrayCnt = 0, delay = 500;
  var inTimer, array = [], span, input, sw;

  Object.keys( scenes ).forEach(function (name) {
    array.push( name )
  })

  input = document.createElement('input')
  input.type = 'checkbox'
  input.id = 'on-off-test'

  span = document.createElement('span')
  span.classList.add( 'slider')

  sw = document.createElement('label')
  sw.classList.add('switch')
  sw.appendChild( input )
  sw.appendChild( span )
  sw.addEventListener('change', testLoading)

  document.body.appendChild( sw )

  function testLoading ( e ) {

    if ( e.target.checked && ! testRunning) {

      testRunning = true

      inTimer = setInterval(function () {

        console.log( 'load #', ++count );

        if ( testRunning )
          loadScene( array[ arrayCnt++ ] )

        if ( arrayCnt === array.length )
          arrayCnt = 0

      }, delay)

    } else if ( inTimer ) {

      console.log( 'stopping' );

      testRunning = false
      clearInterval( inTimer )

    }

  }

}