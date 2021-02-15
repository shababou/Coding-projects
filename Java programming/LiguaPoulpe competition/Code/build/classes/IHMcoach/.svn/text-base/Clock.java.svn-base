

package IHMcoach;

import Reseaux.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.DefaultListModel;
import liguapoulpe.*;

/**
 *
 * Cette classe est une horloge qui sert a attendre pour les jopuers a la phase d'inscription
 */
public class Clock extends Thread
{
  int n;
  int j;
  int time;

  ////////////////////MODELS/////////////////
  DefaultListModel ListModelTeam;
  DefaultListModel ListModelCoach;


  Coach [] nomCoach;

  //Variables pour la partie reseau
  String hostIPadress,myIPadress;
  int port;
  TCP_SERVER myTCP;
  int myNV;


  CH_3_Lancerlacompetition CH3;
  String nomTeam;


  public Clock(String hostIPadress,int port,String myIPadress,TCP_SERVER myTCP,int time,DefaultListModel ListModelTeam,DefaultListModel ListModelCoach,CH_3_Lancerlacompetition CH3,int myNV){
      this.time=time;
      n=time;

      //On charge les valeurs
      this.ListModelTeam = ListModelTeam;
      this.ListModelCoach = ListModelCoach;
      this.myTCP = myTCP;
      this.port=port;
      this.myIPadress=myIPadress;
      this.hostIPadress=hostIPadress;
      this.myNV = myNV;
      this.CH3 = CH3;
  }

    @Override
  public void run()
  {
    //On utilise l'horloge pour faire un "refresh" des variables
    while(n!=0)
    {
            try {
                this.sleep(1000);
            } catch (InterruptedException ex) {
                Logger.getLogger(Clock.class.getName()).log(Level.SEVERE, null, ex);
            }
            nomCoach = myTCP.getTournament().getCoach();

            j=2;
            for(int i = 0;i < 16;i++){
                if(myTCP.getTournament().getIemeCoach(i).getState()){
                   ListModelCoach.set(j,nomCoach[i].getName());
                   ListModelCoach.set(j+1,"_______________________________________");
                   nomTeam = myTCP.getTournament().getCoach()[i].getTeam().getName();
                   ListModelTeam.set(j,nomTeam);
                   ListModelTeam.set(j+1,"_______________________________________");
                   j=j+2;
                }
            }
            n--;     
    }
      
        if(myNV==1){new TCP_CLIENT(hostIPadress,port,"start").start();}

        //Quand on a finit on degrise le bouton
        CH3.setButton();

  }

  
}
