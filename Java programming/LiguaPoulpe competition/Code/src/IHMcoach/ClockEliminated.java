/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package IHMcoach;

import java.util.logging.Level;
import java.util.logging.Logger;
import liguapoulpe.*;

/**
 *
 * @author Gus
 */
public class ClockEliminated extends Thread {

    Tournament t;
    int nc;
    CH_8_FinalPhase CH8;

    public ClockEliminated(CH_8_FinalPhase CH8,Tournament t,int nc){


      this.t = t;
      this.nc = nc;
      this.CH8 = CH8;
    }


    @Override
    public void run()
    {
        while(1==1){

            try {
                this.sleep(1000);
            } catch (InterruptedException ex) {
                Logger.getLogger(ClockMatch.class.getName()).log(Level.SEVERE, null, ex);
            }

            //CH8.Refresh();



        }


      


    }
}

