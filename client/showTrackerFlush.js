/* Print a message to the console each time the Tracker system flushes.
   Allow us to see the current flush cycle's unique id via Tracker._flushNum
*/
Tracker._flushNum = 0
Tracker._incFlushNum = ()=> Tracker._flushNum++
Tracker._logFlushNum = ()=>
  console.log(`Tracker flush #${Tracker._flushNum}`,
              (new Date().getTime() & (Math.pow(2,22) - 1)))
Tracker._runFlush = _.compose(Tracker._incFlushNum, Tracker._runFlush)
Tracker._runFlush = _.compose(Tracker._logFlushNum, Tracker._runFlush)
