package liguapoulpe;


import java.util.ArrayList;
import java.io.Serializable;

/**
 * Simulates the system of group for the tournament.
 */
public class Group implements Serializable
{ // We work with rank for first phase, with teams for the other phases //
    
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////ATTRIBUTES//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  ArrayList<Team> teams = new ArrayList<Team>();
  int iG; // Indicates N° of the phase
  private String[][] agendaGroup;
  Games g;
  int[] QLTeams;
  // Specific attributes for first phase
  int n=0;
  private Team[] rank = new Team[4];
  String[][] ranking = new String[5][5];

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////CONSTRUCTOR/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  public Group(ArrayList<Team> teams, int iG)
  {
    this.teams = teams;
    this.iG=iG;
    if(iG<=3)
    {
      agendaGroup = new String[6][4];
      ranking[0][0] = "TEAM"; ranking[0][1] = "PTS"; ranking[0][2] = "GF"; ranking[0][3] = "GA"; ranking[0][4] = "DIF";
    }
    else{agendaGroup = new String[teams.size()/2][4];}
    setAgenda();
  }

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////SETTERS//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * To start the next games of the group **/
  public void nextGame()
  {
    Team[] t = new Team[teams.size()];
    // For the first phase
    if(iG==1){ for(int i=0; i<4; i++){t[i] = teams.get(i);} }
    else if(iG==2){t[0]=teams.get(0); t[1]=teams.get(3); t[2]=teams.get(1); t[3]=teams.get(2);}
    else if(iG==3){t[0]=teams.get(0); t[1]=teams.get(2); t[2]=teams.get(1); t[3]=teams.get(3);}
    // For the other phases
    else{for(int i=0; i<teams.size(); i++){t[i] = teams.get(i);} System.out.println("iG"+iG); }
    // Commun
    if(iG<=3){for(int i=0; i<teams.size(); i++){rank[i] = t[i];} } // For the first phase
    g = new Games(t);
    g.setScore();
    if(iG<=3){setRanking();} // For the first phase
    actualizeAgenda(n, getScores());
    if(iG<3){n+=2; iG++;} // For the first phase
  }

  /**
   * To establish the whole agenda of the group **/
  private void setAgenda()
  {
    Team[] t = new Team[teams.size()];
    // For the first phase
    if(iG<=3)
    {
      for(int i=0; i<6; i+=2)
      {
        if(i==0){ for(int j=0; j<teams.size(); j++){t[j] = teams.get(j);} }
        if(i==2){t[0]=teams.get(0); t[1]=teams.get(3); t[2]=teams.get(1); t[3]=teams.get(2);}
        if(i==4){t[0]=teams.get(0); t[1]=teams.get(2); t[2]=teams.get(1); t[3]=teams.get(3);}
        agendaGroup[i][0] = t[0].getName();
        agendaGroup[i][1] = " ";
        agendaGroup[i][2] = " ";
        agendaGroup[i][3] = t[1].getName();
        agendaGroup[i+1][0] = t[2].getName();
        agendaGroup[i+1][1] = " ";
        agendaGroup[i+1][2] = " ";
        agendaGroup[i+1][3] = t[3].getName();
      }
    }
    // For the other phases
    else
    {
      for(int i=0; i<teams.size(); i++){t[i] = teams.get(i);}
      int ii=0;
      for(int i=0; i<teams.size(); i+=2)
      {
        agendaGroup[ii][0] = t[i].getName();
        agendaGroup[ii][1] = " ";
        agendaGroup[ii][2] = " ";
        agendaGroup[ii][3] = t[i+1].getName();
        ii++;
      }
    }
  }

  /**
  * To actualize the whole agenda of the group **/
  private void actualizeAgenda(int i, String[][] scores)
  {
    int ii=0; int end;
    if(iG<=3){int j=i; end=j+1;} // For the first phase
    else{end=teams.size()/2-1;} // For the other phases
    // Commun
    for(int j=i; j<=end; j++)
    {
      agendaGroup[j][1] = scores[ii][0];
      agendaGroup[j][2] = scores[ii][1];
      ii++;
    }
  }

  /**
  * To set the indicators of the qualified teams **/
  public void setIndOfQualifiedTeams()
  {
    if(iG==3) // For first phase
    {
      QLTeams = new int[2];
      for(int i=0;i<2; i++){QLTeams[i]=rank[i].getInd();rank[2].setGameOver();rank[3].setGameOver(); }
    }
    else // For the other phases
    {
      QLTeams = new int[teams.size()/2];
      int ii=0;
      for(int i=0; i<teams.size(); i++)
      {
        int nb = teams.get(i).getGameNumber(); // Number of played games by the team
        if( teams.get(i).getWXFresults()[nb][0] == 0 ){QLTeams[ii] = teams.get(i).getInd(); ii++;}
        else{teams.get(i).setGameOver();}
      }
    }
  }

  /** FOR FIRST PHASE ONLY !!
   * To establish the ranking of the group **/
  private void setRanking()
  {
    // To rearange the ranking by number of points
    int[][] np = new int[4][2];
    for(int i=0; i<4; i++){np[i][0] = Integer.valueOf(rank[i].getRankingCaracteristics()[0]) ; np[i][1]=i;}
    rankUpToDown(np);
    Team[] ranknp = new Team[4];
    for(int i=0; i<4; i++) {ranknp[i] = rank[i];}
    for(int i=0; i<4; i++){rank[i] = ranknp[np[i][1]];}
     // Look for cases of equalities with points: lets'do with goal average(dif)
      int i=0;
      int beg=0, end=0;
      while(i<3)
      {
        end = i;
        if(np[i][0]==np[i+1][0])
        {
          int j=i; beg=j;
          while(j<3 && (np[j][0]==np[j+1][0])){j=j+1;}
          end=j;
          int size = end-beg+1 ;
          int[][] dif = new int[4][2];
          for(int ii=beg; ii<=end; ii++){dif[ii][0] = Integer.valueOf(rank[ii].getRankingCaracteristics()[3]) ; dif[ii][1]=ii;}
          rankUpToDown(dif);
          Team[] rankdif = new Team[size];
          int kk=0;
          for(int k=beg; k<=end; k++)
          {
            rankdif[kk] = rank[dif[k][1]];
            kk ++;
          }
          kk=0;
          for(int k=beg; k<=end; k++)
          {
            rank[k] = rankdif[kk];
            kk ++;
          }
            // Look for cases of equalities with goal average: lets'do with goals for(gf)
            int begg=beg; int endd=begg;
            for(int ii=beg; ii<end;)
            {
              endd = ii;
              if(dif[ii][0]==dif[ii+1][0])
              {
                j=ii; begg=ii;
                while(j<end && (dif[j][0]==dif[j+1][0])){j=j+1;}
                endd=j;
                //System.out.println("index "+ begg + " " + endd);
                int sizze = endd-begg+1 ;
                int[][] gf = new int[sizze][2];
                for(int iii=begg; iii<=endd; iii++){gf[iii-begg][0] = Integer.valueOf(rank[iii].getRankingCaracteristics()[1]) ; gf[iii-begg][1]=iii;}
                rankUpToDown(gf);
                //for(int aa=0; aa<gf.length; aa++){System.out.println(gf[aa][0] + " " + gf[aa][1]);}
                Team[] rankgf = new Team[sizze];
                int kkf=0;
                for(int k=begg; k<=endd; k++)
                {
                  rankgf[kkf] = rank[gf[kkf][1]];
                  kkf ++;
                }
                kkf=0;
                for(int k=begg; k<=endd; k++)
                {
                  rank[k] = rankgf[kkf];
                  kkf ++;
                }
              }
              ii=endd+1;
           }
        }
        i=end+1;
      }
  }

  public void setNextConcurrent()
  {
    if(iG==1)
    {
      for(int i=0; i<teams.size(); i+=2)
      {
        teams.get(i).setNextConcurrent(teams.get(i+1));teams.get(i+1).setNextConcurrent(teams.get(i));
      }
    }
    else if(iG==2)
    {
      teams.get(0).setNextConcurrent(teams.get(3));teams.get(3).setNextConcurrent(teams.get(0));
      teams.get(1).setNextConcurrent(teams.get(2));teams.get(2).setNextConcurrent(teams.get(1));
    }
    else if(iG==3)
    {
      teams.get(0).setNextConcurrent(teams.get(2));teams.get(2).setNextConcurrent(teams.get(0));
      teams.get(1).setNextConcurrent(teams.get(3));teams.get(3).setNextConcurrent(teams.get(1));
    }
    if(iG>3)
    {
      for(int i=0; i<teams.size(); i+=2)
      {
        teams.get(i).setNextConcurrent(teams.get(i+1));teams.get(i+1).setNextConcurrent(teams.get(i));
      }
    }
        
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////GETTERS/////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
  * To see the tems of the group **/
  public ArrayList<Team> getTeams(){return teams;}

  /**
  * To see the whole agenda of the group
    1 line = 1 game
    1- TeamName1; 2- Score1; 3- Score2; 4- TeamName2 **/
  public String[][] getAgenda(){return agendaGroup;}

  /**
  * To get the scores of the step
    1 line = 1 game and: 1- Score1; 2- Score2;
    2 lines for the first phase **/
  public String[][] getScores()
  {
    String[][] a ;
    if(iG<=3){a = new String[2][2];} // for first phase
    else{a = new String[teams.size()/2][2];}// For the other phases
    // Commun
    int ii=0;
    for(int i=0; i<teams.size(); i+=2)
    {
     a[ii][0] = g.getScore(i,i+1)[1];// Firt score game
     a[ii][1] = g.getScore(i,i+1)[2];
     ii++;
    }
    return a;
  }

  /**
  * To get the indicators of the qualified teams **/
  public int[] getQualifiedTeams(){return QLTeams;}

  /** FOR FIRST PHASE ONLY !!
   * To get the ranking of the group **/
  public String[][] getRanking()
  {
    for(int i=1; i<=4; i++)
    {
      ranking[i][0] = rank[i-1].getName();
      ranking[i][1] = Integer.toString(rank[i-1].getRankingCaracteristics()[0]);
      ranking[i][2] = Integer.toString(rank[i-1].getRankingCaracteristics()[1]);
      ranking[i][3] = Integer.toString(rank[i-1].getRankingCaracteristics()[2]);
      ranking[i][4] = Integer.toString(rank[i-1].getRankingCaracteristics()[3]);
    }
    return ranking;
  }


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////TOOLS////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * To classificate a list from best to worst **/
  private int[][] rankUpToDown(int[][] tab)
  {
    for (int i=0; i<tab.length; i++)
    {
      int max=tab[i][0];
      int indmax=i;
      for (int j=i+1; j<tab.length; j++)
      {
        if (tab[j][0]>max)
        {
          max=tab[j][0];
          indmax=j;
        }
      }
    int a=tab[i][0] ; int ind=tab[i][1];
    tab[i][0]=tab[indmax][0] ; tab[i][1]=tab[indmax][1];
    tab[indmax][0]=a ; tab[indmax][1]=ind;
    }
   return tab;
  }
}
