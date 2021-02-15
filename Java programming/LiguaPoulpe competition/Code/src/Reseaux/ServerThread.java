
package Reseaux;
import liguapoulpe.*;
import java.net.*;
import java.io.*;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Cette classe permet de traiter les messages reçus des interfaces graphiques
 * et d'actualiser l'objet tournoi de chaque participant en conséquence.
 */

class ServerThread extends Thread
{
  Socket sock;
  ObjectInputStream entree;
  TCP_SERVER myTCP;
  int port;
  Tournament t;
  ArrayList<String> listIPadress = new ArrayList<String>();
  int n;// Index for players
  int nc;// Index for coachs
  int np;// Index for punters
  Clock clock;

  public ServerThread(String IP, Socket socket,TCP_SERVER myTCP,int port,Tournament t)
  {
    this.sock=socket;
    this.myTCP=myTCP;
    this.port=port;
    this.t=t;
    this.listIPadress = myTCP.getListIPadress();
    this.n=myTCP.getn();
    this.nc=myTCP.getnc();
     this.np=myTCP.getnp();
    try
    {
      entree=new ObjectInputStream(sock.getInputStream());
    }
    catch(IOException e) { }
  }

  public void run()
  {
    Object obj=null;
    try
    {
      try
      {
        obj = entree.readObject();
      }
      catch(ClassNotFoundException ex)
      {
        Logger.getLogger(ServerThread.class.getName()).log(Level.SEVERE, null, ex);
      }
      
      inputProcess(obj);
      sock.close();
    }
    catch (IOException e) {e.printStackTrace();}
  }

  private void inputProcess(Object obj)
  {

    if(obj instanceof String)
    {
        // Recuperation du message dans un tableau
        String delims = ":";
        String[] tokens = ((String)obj).split(delims);

        // On va ensuite comparer la première partie du message avec différentes "clés", afin de déterminer les actions à réaliser.


        // Commun
        if(tokens[0].equals("Salut!"))
        {
          listIPadress.add(n,tokens[1]);
          myTCP.setListIPadress(listIPadress);
          n++;
          myTCP.setn(n);
          new TCP_CLIENT(tokens[1],port,t).start();          
        }


        else if(tokens[0].equals("choice"))
        {
          if(tokens[2].equals("1"))
          {
            nc++;
            myTCP.setnc(nc);
          }
          if(tokens[2].equals("2"))
          {
            
            np++;
            myTCP.setnp(np);
             
          }
        }


        else if(tokens[0].equals("setID"))
        {
          myTCP.setMyID(Integer.parseInt(tokens[1]));
        }


        else if(tokens[0].equals("start"))
        {
            
            t.completeCoach();

            t.startTournament();
            t.getIsStarted();
            myTCP.setTournament(t);
            for(int i=0;i<listIPadress.size();i++)
                {
                    new TCP_CLIENT(listIPadress.get(i),port,t).start();
                }
            myTCP.nextPhase(0);
            for(int i=0;i<listIPadress.size();i++)
                {
                    new TCP_CLIENT(listIPadress.get(i),port,"nextPhase:0").start();
                    //new TCP_CLIENT(listIPadress.get(i),port,"nextPhase").start();
                }

            int nvalc = t.getNVal();
            if(nvalc==16)
            {
                for(int i=0;i<listIPadress.size();i++)
                {
                    new TCP_CLIENT(listIPadress.get(i),port,"forbidden").start();
                }
            }
        }


        else if(tokens[0].equals("nextRound"))
        {
            int k=Integer.parseInt(tokens[1]);
            t.nextRound();
            myTCP.setTournament(t);

            String[][] round = t.getRoundAfterGames();
            for(int ki = 0; ki<t.getCOB().getPuntersList().size();ki++)
            {
                t.getCOB().generateGains(ki, round);
                myTCP.setTournament(t);
                t.getCOB().getPunter(ki).unValidate();
                myTCP.setTournament(t);
            }
                
            for(int i=0;i<listIPadress.size();i++)
            {
                new TCP_CLIENT(listIPadress.get(i),port,t).start();
            }

            myTCP.nextPhase(k);

            for(int i=0;i<listIPadress.size();i++)
            {
                new TCP_CLIENT(listIPadress.get(i),port,"nextPhase:"+k).start();
            }
        }


        else if(tokens[0].equals("forbidden"))
        {
          myTCP.isForbidden(true);
        }


        else if(tokens[0].equals("nextPhase"))
        {
          int k=Integer.parseInt(tokens[1]);
          myTCP.nextPhase(k);
        }

       

        //Coach 
        else if(tokens[0].equals("setCoachName"))
        {
          new TCP_CLIENT(tokens[1],port,"setID:"+myTCP.getTournament().getNumberOfCoachPLayer()).start();
          t.setCoach(tokens[2]);
          myTCP.setTournament(t);
          for(int i=0;i<listIPadress.size();i++)
          {
            new TCP_CLIENT(listIPadress.get(i),port,t).start();
          }
        }

        else if(tokens[0].equals("setTeamName"))
        {
          int k=Integer.parseInt(tokens[1]);
          t.getCoach()[k].getTeam().setName(tokens[2]);
          myTCP.setTournament(t);
          for(int i=0;i<listIPadress.size();i++)
          {
            new TCP_CLIENT(listIPadress.get(i),port,t).start();
          }
        }

        else if(tokens[0].equals("setTeamCara"))
        {
            int k = Integer.parseInt(tokens[1]);
            int a = Integer.parseInt(tokens[2]);
            int m = Integer.parseInt(tokens[3]);
            int d = Integer.parseInt(tokens[4]);
            int c = Integer.parseInt(tokens[5]);
            int s = Integer.parseInt(tokens[6]);
            ((CoachPlayer)(t.getCoach()[k])).setTeamComp(a,d,m,c,s);
            myTCP.setTournament(t);
            for(int i=0;i<listIPadress.size();i++)
            {
              new TCP_CLIENT(listIPadress.get(i),port,t).start();
            }
        }

         else if(tokens[0].equals("setSpeak"))
        {
            int k = Integer.parseInt(tokens[1]);
            int choice = Integer.parseInt(tokens[2]);
            ((CoachPlayer)(t.getCoach()[k])).speakToTeam(choice);
            myTCP.setTournament(t);
            for(int i=0;i<listIPadress.size();i++)
            {
              new TCP_CLIENT(listIPadress.get(i),port,t).start();
            }
        }

         else if(tokens[0].equals("setTraining"))
         {
             int k = Integer.parseInt(tokens[1]);
             int[] train = new int[5];
             train[0]=Integer.parseInt(tokens[2]);
             train[1]=Integer.parseInt(tokens[3]);
             train[2]=Integer.parseInt(tokens[4]);
             train[3]=Integer.parseInt(tokens[5]);
             train[4]=Integer.parseInt(tokens[6]);
             t.getCoach()[k].getTeam().setTraining(train);

         }

         else if(tokens[0].equals("validateCoach"))
        {
            
           t.getCoach()[Integer.parseInt(tokens[1])].validateCoach();
           myTCP.setTournament(t);
           for(int j=0;j<listIPadress.size();j++)
           {
            new TCP_CLIENT(listIPadress.get(j),port,t).start();
          }
         }
         else if(tokens[0].equals("invalidateCoach"))
        {
           t.getCoach()[Integer.parseInt(tokens[1])].invalidateCoach();
            
           myTCP.setTournament(t);
           for(int j=0;j<listIPadress.size();j++)
           {
            new TCP_CLIENT(listIPadress.get(j),port,t).start();
          }
        }

       
        //Punter
        else if(tokens[0].equals("new punter")) // ajouter un nouveau parieur dans la liste.
        {
          t.getCOB().addPunter(Integer.parseInt(tokens[2]),tokens[1]);
          
          
          myTCP.setTournament(t);

          for(int i=0;i<listIPadress.size();i++)
          {
            new TCP_CLIENT(listIPadress.get(i),port,t).start();
          }
        }


        else if(tokens[0].equals("miser")) // Ajouter un pari (résultat + montant)
        {
          int k = Integer.parseInt(tokens[1]); // nbPunter
          int i = Integer.parseInt(tokens[2]); // nbBet
          int res = Integer.parseInt(tokens[3]); // result
          int amount = Integer.parseInt(tokens[4]); // amount
          int l = t.getCOB().getPunter(k).getBets().size();

          if(i<l-1)
          {
              t.getCOB().getPunter(k).getAmount().remove(i); // Si la ligne avait été remplie avec un zéro par défaut, il faut l'effacer puis la réécrire.
              t.getCOB().getPunter(k).getBets().remove(i);
              myTCP.setTournament(t);
          }

          t.getCOB().getPunter(k).setAmout(i, amount);
          myTCP.setTournament(t);
          t.getCOB().getPunter(k).setBets(i, res);
          myTCP.setTournament(t);

          for(int j=0;j<listIPadress.size();j++)
          {
            new TCP_CLIENT(listIPadress.get(j),port,t).start();
          }
        }


        else if(tokens[0].equals("validateP"))
        {
            t.getCOB().getPunter(Integer.parseInt(tokens[1])).validate();
            myTCP.setTournament(t);

            for(int j=0;j<listIPadress.size();j++)
          {
            new TCP_CLIENT(listIPadress.get(j),port,t).start();
          }
        }

        
        else if(tokens[0].equals("completer")) // Pour "completer" les lignes de pari nécessaires si on ne pari pas dans l'ordre.
        {
           int nb = Integer.parseInt(tokens[1]);
            
           for(int i =2; i<tokens.length; i++)
            {
                int k =Integer.parseInt(tokens[i]);
                t.getCOB().getPunter(nb).setAmout(k, 0);
                myTCP.setTournament(t);
                t.getCOB().getPunter(nb).setBets(k, 0);
                myTCP.setTournament(t);
         
            }
        }


       

      }
    
      if(obj instanceof Tournament)
      {
        t=(Tournament)obj;
        myTCP.setTournament(t);
      }
  }

  
}
