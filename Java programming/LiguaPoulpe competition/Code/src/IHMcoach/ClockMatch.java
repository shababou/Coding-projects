/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package IHMcoach;

import Reseaux.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.DefaultListModel;
import liguapoulpe.*;

/**
 *
 * On utilise cette classe pour les matchs
 */
public class ClockMatch extends Thread
{
  int n;
  CH_4_TournoiPremierePhase CH4;
  TCP_SERVER myTCP;
  boolean OK=false;

  public ClockMatch(int time,CH_4_TournoiPremierePhase CH4,TCP_SERVER myTCP){
      n=time;
      this.CH4 = CH4;
      this.myTCP=myTCP;
  }

  public ClockMatch(int time,TCP_SERVER myTCP){
      n=time;
      this.myTCP=myTCP;
  }

    @Override
  public void run()
  {
    while(n!=0)
    {
            try {
                this.sleep(1000);
            } catch (InterruptedException ex) {
                Logger.getLogger(Clock.class.getName()).log(Level.SEVERE, null, ex);
            }
           n--;
           int nValC = myTCP.getTournament().getNVal();
           int nValP = myTCP.getTournament().getCOB().getNVal();
           int nbP = myTCP.getTournament().getCOB().getPuntersList().size();
           //if( (nValC==16) && (nValP==nbP) ){OK=true;break;}
           if( (nValC==16) ){OK=true;break;}
    }

  }

    public boolean getOK(){return OK;}
}
