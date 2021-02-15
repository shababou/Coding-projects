
package DataJoueur;


import liguapoulpe.*;
import Reseaux.*;
import java.util.ArrayList;


/**
 * Cette classe contient les méthodes permettant la construction de l'IHM parieur.
 */


public class PlayerDataParieur
{
     private TCP_SERVER server;
     private Tournament t;
     private CentraleOfBets cob;
     
     private String IPserver ;
     private int numParieur,port ;
     private String nomParieur ;
     
     public String pathImage ;
     

     public PlayerDataParieur(TCP_SERVER _server,String _IPserver,int _port,String _nameParieur)
     {
         server = _server;
         IPserver = _IPserver;
         port = _port;

         t = server.getTournament();
         cob = t.getCOB();

         numParieur = server.getMyID();
         nomParieur = _nameParieur;
        
         //pathImage =  "/home/promo65/a.jacopin/NetBeansProjects/Last2/src/images/" ;

     }



/**
 * Les getters
 */
    public TCP_SERVER getServer() { return server; }

    public Tournament getTournament() { return t; }

    public String getPathImage() { return pathImage; }

    public int getNumPunter() { return numParieur; }

    public String getIPserver() { return IPserver; }

    public int getPort() { return port; }

   

/**
  * Les setters
  */ 
     public void setPathImage(String pathImage)
     {
        this.pathImage = pathImage;
     }

     public void setT(Tournament t)
     {
        this.t = t;
     }


    
//Méthodes plus spécifiques

 /**
 * Ecrans 4 et 4bis :
 * Méthode indiquant le nombre de paris en cours du joueur.
 * a revoir
 */

        public int nbParisEnCours()
        {
            
            ArrayList<Integer> paris = t.getCOB().getPunter(numParieur).getBets();
            
            int nbParisEnCours=0;
            for (int i=0;i<paris.size();i++)
            {
                if (paris.get(i) != 0)
                {
                    nbParisEnCours = nbParisEnCours + 1 ;
                }
            }
            return nbParisEnCours ;
        }


/**
 * Ecran 4bis :
 * Méthode qui renvoie un tableau avec les paris engagés et les mises du parieur.
 */
  public String[][] voirParis()
     {
         
         ArrayList<Integer> paris = t.getCOB().getPunter(numParieur).getBets();           //les 2 ArrayList ont rangé les paris et les mises correspondantes au même indice.
         ArrayList mises = t.getCOB().getPunter(numParieur).getAmount();
         String[][] agendaBeforeGames = t.getRoundBeforeGames();

         // Tableau à 4 colonnes
         // 1ère : équipeA -  2ème : équipeB - 3ème : le paris - 4ème : la mise
         String[][] bets = new String[paris.size()][4];
         for (int i=0 ; i<paris.size() ; i++)
         {
            bets[i][0] = agendaBeforeGames[i][0];                //on considère que le parieur parie dans l'ordre de l'agenda...
            bets[i][1] = agendaBeforeGames[i][3];

            if ((String.valueOf(paris.get(i))).equals("1"))  { bets[i][2] = " - Mise sur :" + agendaBeforeGames[i][0]+" - ";}
            if ((String.valueOf(paris.get(i))).equals("-1"))   { bets[i][2] = " - Mise sur :" + agendaBeforeGames[i][3]+" - ";}
            if ((String.valueOf(paris.get(i))).equals("0"))   { bets[i][2] = " - Mise sur : match nul - ";}

            bets[i][3] = String.valueOf(mises.get(i));
         }
         
         return bets;
     }


/**
 * Ecran 5 :
 * Méthode qui renvoie le nombre de vies de poulpe qui restent au parieur.
 */
     public int nbViesPoulpe()
     {
         this.cob = t.getCOB();
         int nbVies = cob.getPunter(numParieur).getNbPoulpes();
         return nbVies ;
     }


 /**
 *  Ecran 5 :
 *  Méthode qui renvoie le nombre de paris disponibles en temps réel. 
 */     
     public int nbParisDisponibles(int numPunter)
     {
        int nbParisDisp = t.getRoundBeforeGames().length;

        return nbParisDisp;
     }



     
  /**
  * Ecran 5 :
  * Méthode qui donne les paris disponibles sous forme d'un tableau de Strings de 2 colonnes (équipe A vs équipe B).
  * Si mise déjà sur le match i, dans le tableu, à la ligne i : "paris deja effectué" (colonne 1), "0" (colonne 2).
  */
     public String[][] voirParisDisponibles(int numPunter)
     {
        String[][] matchs4 = t.getRoundBeforeGames(); // c'est un tableau à 4 colonnes...
        ArrayList<Integer> amount = cob.getPunter(numParieur).getAmount(); //ArrayList des bets.
        String[][] paris = new String[matchs4.length][2];

        for (int i=0 ; i<amount.size(); i++)
        {
            if (amount.get(i)==0)
            {
                paris[i][0]=matchs4[i][0];
                paris[i][1]=matchs4[i][3];
            }
            else
            {
                paris[i][0]= "paris deja effectué";
                paris[i][1]= "0";
            }
        }

        for (int i=amount.size() ; i<matchs4.length; i++)
        {
            paris[i][0]=matchs4[i][0];
            paris[i][1]=matchs4[i][3];
        }

        return paris ;
     }




/**
 *  EcranGains
 *  Méthode qui renvoie les montants (en vies de poulpes) gagnés ou perdus par leparieur.
 */
     public String[] voirGains()
     {
        
        ArrayList gains = cob.getPunter(numParieur).getGains();        

        String[][] paris = t.getRoundAfterGames();
        int nb = gains.size();

        
        
        String[] resultats = new String[nb];
        
        for(int i=0;i<nb;i++)
        {
            resultats[i]= paris[i][0] + " vs " + paris[i][3] + " : " + (gains.get(i)) + " vie(s) de poulpe";
        }
        return resultats;
     }


/**
 *  Ecran 7 :
 *  Méthode qui renvoie la liste des équipes en compétition. numTour=server.getPhase();
 */
     public String[] listeEquipes(int numTour)
     { 
        String[] liste;
        if (numTour<4)
        {
            liste = t.getListTeams();
        }
        else    
        {
            String[] listeInitiale = t.getListTeams();
            int[]numEquipeQualif;
            numEquipeQualif = t.getQualifiedTeams();
            liste = new String[numEquipeQualif.length];

            int j=0;
            for (int i=0;i<numEquipeQualif.length;i++)
            {
                if (i==numEquipeQualif[j])
                {
                liste[j]= listeInitiale[i];
                j=j+1;
                }
            
            }
        }
        

         
        
        return liste;
     }




/**
 * Ecran E :
 * Méthode permettant de consulter les points de performances de l'équipe.
 * Un paramètre : le numéro de l'équipe.
 */

     public int[] voirCapacitesEquipe(int numEquipe)
     {
         int[] capacites = new int[5];

         capacites[0] = t.getCoach()[numEquipe].getTeam().getAtt();
         capacites[1] = t.getCoach()[numEquipe].getTeam().getDef();
         capacites[2] = t.getCoach()[numEquipe].getTeam().getCol();
         capacites[3] = t.getCoach()[numEquipe].getTeam().getMid();
         capacites[4] = t.getCoach()[numEquipe].getTeam().getSpd();

         return capacites;
     }

/**
 * Ecran E :
 * Méthode qui renvoie les matchs qui ont été joués par l'équipe E et les scores relatifs.
 * Prend en paramètre le numéro de l'équipe.
 */
     public String[] voirMatchsJouesEquipeE(int numEquipe)
     {
        ArrayList<String[]> agendaEquipe = t.getCoach()[numEquipe].getTeam().getAgenda();
        int nbMatchsJoues = agendaEquipe.size();
        String nameE = t.getCoach()[numEquipe].getTeam().getName();

        String[] matchsJoues = new String[nbMatchsJoues];
        for (int i=0;i<nbMatchsJoues;i++)
        {
            String nameAdverse = agendaEquipe.get(i)[3];
            String scores = agendaEquipe.get(i)[1] + "-" + agendaEquipe.get(i)[2] ;
            matchsJoues[i] =  nameE + " vs " + nameAdverse + " : " + scores;
        }
        return matchsJoues;
     }

/**
 * Ecran E :
 * Méthode qui affiche le nom du coach de l'équipe (paramètre : numéro de l'équipe).
 */
    public String afficheCoach(int numEquipe)
    {
        String nameCoach = t.getIemeCoach(numEquipe).getName();
        return nameCoach;
    }


/**
 * Ecran 8
 * Méthode qui permet de créer l'arbre du tournoi en fonction des phases.
 */
    public ArrayList<String[]> voirMatchs(int numPhase)
    {
        ArrayList<String[]> matchs=new ArrayList<String[]>();
        
        String[][] agendaA = t.getGroupA().getAgenda();
        String[][] agendaB = t.getGroupB().getAgenda();
        String[][] agendaC = t.getGroupC().getAgenda();
        String[][] agendaD = t.getGroupD().getAgenda();
        


        //1ere phase
        if (numPhase<3)
        {
            for (int i=0;i<6;i++)
            {
                String[] resultatsA = new String[2];
                resultatsA[0]=agendaA[i][0] + " vs " + agendaA[i][3];
                resultatsA[1]=agendaA[i][1] + " - " + agendaA[i][2];
                matchs.add(i, resultatsA);
            }
            for (int i=6;i<12;i++)
            {
                String[] resultatsB = new String[2];
                resultatsB[0]=agendaB[i-6][0] + " vs " + agendaB[i-6][3];
                resultatsB[1]=agendaB[i-6][1] + " - " + agendaB[i-6][2];
                matchs.add(i, resultatsB);
            }
            for (int i=12;i<18;i++)
            {
                String[] resultatsC = new String[2];
                resultatsC[0]=agendaC[i-12][0] + " vs " + agendaC[i-12][3];
                resultatsC[1]=agendaC[i-12][1] + " - " + agendaC[i-12][2];
                matchs.add(i, resultatsC);
            }
            for (int i=18;i<24;i++)
            {
                String[] resultatsD = new String[2];
                resultatsD[0]=agendaD[i-18][0] + " vs " + agendaD[i-18][3];
                resultatsD[1]=agendaD[i-18][1] + " - " + agendaD[i-18][2];
                matchs.add(i, resultatsD);
            }         
        }
        
        //2eme phase : quart de finale
        if (numPhase==3)
        {
            for (int i=0;i<6;i++)
            {
                String[] resultatsA = new String[2];
                resultatsA[0]=agendaA[i][0] + " vs " + agendaA[i][3];
                resultatsA[1]=agendaA[i][1] + " - " + agendaA[i][2];
                matchs.add(i, resultatsA);
            }
            for (int i=6;i<12;i++)
            {
                String[] resultatsB = new String[2];
                resultatsB[0]=agendaB[i-6][0] + " vs " + agendaB[i-6][3];
                resultatsB[1]=agendaB[i-6][1] + " - " + agendaB[i-6][2];
                matchs.add(i, resultatsB);
            }
            for (int i=12;i<18;i++)
            {
                String[] resultatsC = new String[2];
                resultatsC[0]=agendaC[i-12][0] + " vs " + agendaC[i-12][3];
                resultatsC[1]=agendaC[i-12][1] + " - " + agendaC[i-12][2];
                matchs.add(i, resultatsC);
            }
            for (int i=18;i<24;i++)
            {
                String[] resultatsD = new String[2];
                resultatsD[0]=agendaD[i-18][0] + " vs " + agendaD[i-18][3];
                resultatsD[1]=agendaD[i-18][1] + " - " + agendaD[i-18][2];
                matchs.add(i, resultatsD);
            }

            String[][] agendaQF = t.getGroupQF().getAgenda();
            for (int i=24;i<28;i++)
            {
                String[] resultatsQF = new String[2];
                resultatsQF[0]=agendaQF[i-24][0] + " vs " + agendaQF[i-24][3];
                resultatsQF[1]=agendaQF[i-24][1] + " - " + agendaQF[i-24][2];
                matchs.add(i, resultatsQF);
            }
        }



        //3eme phase la demi-finale
        if (numPhase==4)
        {
            for (int i=0;i<6;i++)
            {
                String[] resultatsA = new String[2];
                resultatsA[0]=agendaA[i][0] + " vs " + agendaA[i][3];
                resultatsA[1]=agendaA[i][1] + " - " + agendaA[i][2];
                matchs.add(i, resultatsA);
            }
            for (int i=6;i<12;i++)
            {
                String[] resultatsB = new String[2];
                resultatsB[0]=agendaB[i-6][0] + " vs " + agendaB[i-6][3];
                resultatsB[1]=agendaB[i-6][1] + " - " + agendaB[i-6][2];
                matchs.add(i, resultatsB);
            }
            for (int i=12;i<18;i++)
            {
                String[] resultatsC = new String[2];
                resultatsC[0]=agendaC[i-12][0] + " vs " + agendaC[i-12][3];
                resultatsC[1]=agendaC[i-12][1] + " - " + agendaC[i-12][2];
                matchs.add(i, resultatsC);
            }
            for (int i=18;i<24;i++)
            {
                String[] resultatsD = new String[2];
                resultatsD[0]=agendaD[i-18][0] + " vs " + agendaD[i-18][3];
                resultatsD[1]=agendaD[i-18][1] + " - " + agendaD[i-18][2];
                matchs.add(i, resultatsD);
            }

            String[][] agendaQF = t.getGroupQF().getAgenda();
            for (int i=24;i<28;i++)
            {
                String[] resultatsQF = new String[2];
                resultatsQF[0]=agendaQF[i-24][0] + " vs " + agendaQF[i-24][3];
                resultatsQF[1]=agendaQF[i-24][1] + " - " + agendaQF[i-24][2];
                matchs.add(i, resultatsQF);
            }

            String[][] agendaDF = t.getGroupSF().getAgenda();
            for (int i=28;i<30;i++)
            {
                String[] resultatsDF = new String[2];
                resultatsDF[0]=agendaDF[i-28][0] + " vs " + agendaDF[i-28][3];
                resultatsDF[1]=agendaDF[i-28][1] + " - " + agendaDF[i-28][2];
                matchs.add(i,resultatsDF);
            }
        }

        //4eme phase  la finale
        if (numPhase==5)
        {
            for (int i=0;i<6;i++)
            {
                String[] resultatsA = new String[2];
                resultatsA[0]=agendaA[i][0] + " vs " + agendaA[i][3];
                resultatsA[1]=agendaA[i][1] + " - " + agendaA[i][2];
                matchs.add(i, resultatsA);
            }
            for (int i=6;i<12;i++)
            {
                String[] resultatsB = new String[2];
                resultatsB[0]=agendaB[i-6][0] + " vs " + agendaB[i-6][3];
                resultatsB[1]=agendaB[i-6][1] + " - " + agendaB[i-6][2];
                matchs.add(i, resultatsB);
            }
            for (int i=12;i<18;i++)
            {
                String[] resultatsC = new String[2];
                resultatsC[0]=agendaC[i-12][0] + " vs " + agendaC[i-12][3];
                resultatsC[1]=agendaC[i-12][1] + " - " + agendaC[i-12][2];
                matchs.add(i, resultatsC);
            }
            for (int i=18;i<24;i++)
            {
                String[] resultatsD = new String[2];
                resultatsD[0]=agendaD[i-18][0] + " vs " + agendaD[i-18][3];
                resultatsD[1]=agendaD[i-18][1] + " - " + agendaD[i-18][2];
                matchs.add(i, resultatsD);
            }

            String[][] agendaQF = t.getGroupQF().getAgenda();
            for (int i=24;i<28;i++)
            {
                String[] resultatsQF = new String[2];
                resultatsQF[0]=agendaQF[i-24][0] + " vs " + agendaQF[i-24][3];
                resultatsQF[1]=agendaQF[i-24][1] + " - " + agendaQF[i-24][2];
                matchs.add(i, resultatsQF);
            }

            String[][] agendaDF = t.getGroupSF().getAgenda();
            for (int i=28;i<30;i++)
            {
                String[] resultatsDF = new String[2];
                resultatsDF[0]=agendaDF[i-28][0] + " vs " + agendaDF[i-28][3];
                resultatsDF[1]=agendaDF[i-28][1] + " - " + agendaDF[i-28][2];
                matchs.add(i,resultatsDF);
            }
            
            String[][] agendaF = t.getGroupF().getAgenda();
            String[] resultatsF = new String[2];
            resultatsF[0]=agendaF[1][0] + " vs " + agendaF[1][3];
            resultatsF[1]=agendaF[1][1] + " - " + agendaF[1][2];
            matchs.add(30,resultatsF);
        }

        return matchs;

    }
     
}

