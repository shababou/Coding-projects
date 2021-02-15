
package liguapoulpe;
import java.io.Serializable;
import Reseaux.*;


/**
 * To countdown before next round.
 */
public class Clock extends Thread implements Serializable

{
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////ATTRIBUTES//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
    int t; // Time indicated by the clock.
    boolean flag; // Indicates if time is over.


  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////CONSTRUCTOR/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
    /**
     *@param time : Countdown is initializated at "time" seconds.
     */
    public Clock(int time)
    {  
        this.t = time ;
        this.flag = false;
    }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////GETTERS/////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
    /**
     * To know if time is over.
     */
    public boolean getFlag(){return flag;} // true si l'horloge est finie


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////OTHER METHODS////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

     /**
     * Starts the countdown.
     */
    synchronized public void run()
    {
        while(true)
        {
            if(t==0){flag=true;break;}
            try {this.wait(1000);} catch (InterruptedException e) {e.printStackTrace();}
            this.t--;
        }
    }

}

