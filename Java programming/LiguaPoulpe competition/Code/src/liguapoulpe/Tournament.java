package liguapoulpe;

import java.util.ArrayList;
import java.util.Collections;

import java.io.Serializable;
/**
 * This class is the central class of the package. It contains all the necessary
 * elements for the simulation of a tournament.
 */
public class Tournament implements Serializable
{
  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////ATTRIBUTES/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  int nr =  0; // Number of round
  int nc =  0; // Number of concurrents
  int nval = 0; // Number of coach validated
  int nbCP = 0;
  boolean firstDone =  false;
  boolean isStarted = false;
  Coach[] coachs = new Coach[16];
  private Group A;
  private Group B;
  private Group C;
  private Group D;
  private Group QF; // QuaterFinals group
  private Group SF; // SemiFinals group
  private Group F; // Final group
  private String[][] agenda =  new String[31][4];
  private String[][] roundBeforeGames;
  private String[][] roundAfterGames;
  private int[] QLTeams; // Qualified teams
  private CentraleOfBets cob;

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////CONSTRUCTOR/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  public Tournament()
  {
      for(int i=0;i<16;i++){coachs[i] = new CoachPlayer("Unknown",i);}
      this.cob = new CentraleOfBets();
  }


  //////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////SETTERS///////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
  * To register all human coachs */
  public void setCoach(String name)
  {
    coachs[nc] = new CoachPlayer(name,nc);
    nc++;
    nbCP++;
  }
 
  /**
  * To complete the list with bot coachs */
  public void completeCoach()
  {
    for (int k=nbCP; k<16; k++)
    {
      String nom = "Ordinateur" +(k);
        coachs[k] = new CoachAuto(nom, k);
        coachs[k].validateCoach();
        nc++;
    }
  }

  /**
   * Prepares the tournament without running any game : it creates the group, the agenda...
   */
  public void startTournament()
  {
      this.isStarted = true;
     prepareFirstPhase(coachs);
     A.setNextConcurrent();
     B.setNextConcurrent();
     C.setNextConcurrent();
     D.setNextConcurrent();
     setAgenda();
     setRoundBeforeGames();
    for(int i=0;i<16;i++)
    {
      String[][] com = new Commentaries(coachs[i].getTeam()).sendCommentaries();
      coachs[i].getTeam().setComments(com);
     }
  }
  
  /**
  * To start the next round of the competition */
  public void nextRound()
  {
    nr++;
      System.out.println(""+ nr);
    if(nr<=3) // First phase
    {
      A.nextGame();
      B.nextGame();
      C.nextGame();
      D.nextGame();
      if(nr<3)
      {
        A.setNextConcurrent();
        B.setNextConcurrent();
        C.setNextConcurrent();
        D.setNextConcurrent();
      }
      if(nr==3)
      {
        setQualifiedTeams();
        prepareQFPhase(QLTeams);
        QF.setNextConcurrent();
      }
    }
    else if(nr==4) // QuarterFinals phase
    {
      System.out.println("bef");
      QF.nextGame();
      System.out.println("af");
      setQualifiedTeams();
      prepareSFPhase(QLTeams);
      SF.setNextConcurrent();
    }
    else if(nr==5) // SemiFinals phase
    {
      SF.nextGame();
      setQualifiedTeams();
      prepareFPhase(QLTeams);
      F.setNextConcurrent();
    }
    else // Final phase
    {
      F.nextGame();
      setAgenda();
      setRoundAfterGames();
    }
    setAgenda();
    /*for(int i=0;i<31;i++)
    {
      for(int j=0;j<4;j++) {   System.out.println(getAgenda()[i][j]);}
    }*/
    setRoundAfterGames();
    if(nr<=5){setRoundBeforeGames();}
  }

  /**
  * To prepare the first phase */
  private void prepareFirstPhase(Coach[] coachs)
  {
    int[][] tab = new int[16][2];
    for(int i=0; i<16; i++)
    {
      tab[i][0] = coachs[i].getTeam().getAtt() + coachs[i].getTeam().getDef() + coachs[i].getTeam().getMid() + coachs[i].getTeam().getSpd() + coachs[i].getTeam().getCol();
      tab[i][1] = coachs[i].getTeam().getInd();
    }
    rankUpToDown(tab); // Ranking by technical skills
    Coach[] rank = new Coach[16];
    for(int i=0; i<16; i++) {rank[i] = coachs[i];}
    for(int i=0; i<16; i++){coachs[i] = rank[tab[i][1]];}
    ArrayList<Coach> firstHat = new ArrayList(); for(int i=0; i<=3; i++){firstHat.add(i,rank[i]);} // First hat = best teams
    ArrayList<Coach> secondHat = new ArrayList(); for(int i=4; i<=7; i++){secondHat.add(i-4,rank[i]);}
    ArrayList<Coach> thirdHat = new ArrayList(); for(int i=8; i<=11; i++){thirdHat.add(i-8,rank[i]);}
    ArrayList<Coach> fourthHat = new ArrayList(); for(int i=12; i<=15; i++){fourthHat.add(i-12,rank[i]);}
    Collections.shuffle(firstHat); // To put hat groups randomly
    Collections.shuffle(secondHat);
    Collections.shuffle(thirdHat);
    Collections.shuffle(fourthHat);
    ArrayList<Team> a = new ArrayList<Team>();
    a.add(0,firstHat.get(0).getTeam()); a.add(1,secondHat.get(0).getTeam()); a.add(2,thirdHat.get(0).getTeam()); a.add(3,fourthHat.get(0).getTeam());
    A = new Group(a,1);
    ArrayList<Team> b = new ArrayList<Team>();
    b.add(0,firstHat.get(1).getTeam()); b.add(1,secondHat.get(1).getTeam()); b.add(2,thirdHat.get(1).getTeam()); b.add(3,fourthHat.get(1).getTeam());
    B = new Group(b,1);
    ArrayList<Team> c = new ArrayList<Team>();
    c.add(0,firstHat.get(2).getTeam()); c.add(1,secondHat.get(2).getTeam()); c.add(2,thirdHat.get(2).getTeam()); c.add(3,fourthHat.get(2).getTeam());
    C = new Group(c,1);
    ArrayList<Team> d = new ArrayList<Team>();
    d.add(0,firstHat.get(3).getTeam()); d.add(1,secondHat.get(3).getTeam()); d.add(2,thirdHat.get(3).getTeam()); d.add(3,fourthHat.get(3).getTeam());
    D = new Group(d,1);
    firstDone = true;
  }

  /**
  * To prepare the quarterFinals phase */
  private void prepareQFPhase(int[] ind)
  {
    ArrayList<Team> a = new ArrayList<Team>();
    for(int i=0; i<8; i++){  a.add( i,getIemeCoach(ind[i]).getTeam()  );}
    QF = new Group(a,4);
  }

  /**
  * To prepare the semiFinals phase */
  private void prepareSFPhase(int[] ind)
  {
    ArrayList<Team> a = new ArrayList<Team>();
    for(int i=0; i<4; i++){  a.add( i,getIemeCoach(ind[i]).getTeam()  ); }
    SF = new Group(a,5);
  }

  /**
  * To prepare the final phase */
  private void prepareFPhase(int[] ind)
  {
    ArrayList<Team> a = new ArrayList<Team>();
    for(int i=0; i<2; i++){  a.add( i,getIemeCoach(ind[i]).getTeam()  ); }
    F = new Group(a,6);
  }

  /**
   * To establish the general agenda [game][elts] 
     1 line = 1 game
     1- teamName1; 2- score1; 3- score2; 3- teamName2 */
  public void setAgenda() 
  {
    if(nr<=3) // First phase
    {
     for(int i=0;i<2; i++){ for(int j=0; j<4; j++){agenda[i][j] = A.getAgenda()[i][j];} }
     for(int i=2; i<4; i++){ for(int j=0; j<4; j++){agenda[i][j] = B.getAgenda()[i-2][j];} }
     for(int i=4; i<6; i++){ for(int j=0; j<4; j++){agenda[i][j] = C.getAgenda()[i-4][j];} }
     for(int i=6; i<8; i++){ for(int j=0; j<4; j++){agenda[i][j] = D.getAgenda()[i-6][j];} }
     for(int i=8; i<10; i++){ for(int j=0; j<4; j++){agenda[i][j] = A.getAgenda()[i-8+2][j];} }
     for(int i=10; i<12; i++){ for(int j=0; j<4; j++){agenda[i][j] = B.getAgenda()[i-10+2][j];} }
     for(int i=12; i<14; i++){ for(int j=0; j<4; j++){agenda[i][j] = C.getAgenda()[i-12+2][j];} }
     for(int i=14; i<16; i++){ for(int j=0; j<4; j++){agenda[i][j] = D.getAgenda()[i-14+2][j];} }
     for(int i=16; i<18; i++){ for(int j=0; j<4; j++){agenda[i][j] = A.getAgenda()[i-16+4][j];} }
     for(int i=18; i<20; i++){ for(int j=0; j<4; j++){agenda[i][j] = B.getAgenda()[i-18+4][j];} }
     for(int i=20; i<22; i++){ for(int j=0; j<4; j++){agenda[i][j] = C.getAgenda()[i-20+4][j];} }
     for(int i=22; i<24; i++){ for(int j=0; j<4; j++){agenda[i][j] = D.getAgenda()[i-22+4][j];} }
     if(nr==3) // QuarterFinals phase before games
     {
       for(int i=24; i<28; i++){ for(int j=0; j<4; j++){agenda[i][j] = QF.getAgenda()[i-24][j];} }
     }
    }
    else if(nr==4) // QuaterFinals phase
    {
      for(int i=24; i<28; i++){ for(int j=0; j<4; j++){agenda[i][j] = QF.getAgenda()[i-24][j];} } // QuarterFinals phase after games
      for(int i=28; i<30; i++){ for(int j=0; j<4; j++){agenda[i][j] = SF.getAgenda()[i-28][j];} } // SemiFinals phase before games
    }
    else if(nr==5) // SemiFinals phase
    {
      for(int i=28; i<30; i++){ for(int j=0; j<4; j++){agenda[i][j] = SF.getAgenda()[i-28][j];} } // SemiFinals phase after games
      for(int j=0; j<4; j++){agenda[30][j] = F.getAgenda()[0][j];} // Fianl phase before games
    }
    else // FinalPhase
    {
      for(int j=0; j<4; j++){agenda[30][j] = F.getAgenda()[0][j];}
    }
  }

  /**
   * To establish the list of coming games 
   */
  private void setRoundBeforeGames()
  {
    if(nr<3){roundBeforeGames = new String[8][4];}
    else if(nr==3){roundBeforeGames = new String[4][4];}
    else if(nr==4){roundBeforeGames = new String[2][4];}
    else{roundBeforeGames = new String[1][4];}
    if(nr==0) // First phase: round 1
    {
      for(int i=0; i<8; i++){ for(int j=0; j<4; j++){roundBeforeGames[i][j] = getAgenda()[i][j];} }
    }
    else if(nr==1) // First phase: round 2
    {
      for(int i=0; i<8; i++){ for(int j=0; j<4; j++){roundBeforeGames[i][j] = getAgenda()[i+8][j];} }
    }
    else if(nr==2) // First phase: round 3
    {
      for(int i=0; i<8; i++){ for(int j=0; j<4; j++){roundBeforeGames[i][j] = getAgenda()[i+16][j];} }
    }
    else if(nr==3) // QuaterFinals phase
    {
      for(int i=0; i<4; i++){ for(int j=0; j<4; j++){roundBeforeGames[i][j] = getAgenda()[i+24][j];} }
    }
    else if(nr==4) // SemiFinals phase
    {
      for(int i=0; i<2; i++){ for(int j=0; j<4; j++){roundBeforeGames[i][j] = getAgenda()[i+28][j];} }
    }
    else // Final phase
    {
      for(int j=0; j<4; j++){roundBeforeGames[0][j] = getAgenda()[30][j];}
    }
  }

  /**
   * To establish the list of the last games
   */
  private void setRoundAfterGames()
  {
    if(nr<=3){roundAfterGames = new String[8][4];}
    else if(nr==4){roundAfterGames = new String[4][4];}
    else if(nr==5){roundAfterGames = new String[2][4];}
    else{roundAfterGames = new String[1][4];}
    if(nr==1) // First phase: round 1
    {
      for(int i=0; i<8; i++){ for(int j=0; j<4; j++){roundAfterGames[i][j] = getAgenda()[i][j];} }
    }
    else if(nr==2) // First phase: round 2
    {
      for(int i=0; i<8; i++){ for(int j=0; j<4; j++){roundAfterGames[i][j] = getAgenda()[i+8][j];} }
    }
    else if(nr==3) // First phase: round 3
    {
      for(int i=0; i<8; i++){ for(int j=0; j<4; j++){roundAfterGames[i][j] = getAgenda()[i+16][j];} }
    }
    else if(nr==4) // QuaterFinals phase
    {
      for(int i=0; i<4; i++){ for(int j=0; j<4; j++){roundAfterGames[i][j] = getAgenda()[i+24][j];} }
    }
    else if(nr==5) // SemiFinals phase
    {
      for(int i=0; i<2; i++){ for(int j=0; j<4; j++){roundAfterGames[i][j] = getAgenda()[i+28][j];} }
    }
    else // Final phase
    {
      for(int j=0; j<4; j++){roundAfterGames[0][j] = getAgenda()[30][j];}
    }
  }

  /**
   * To establish the list of the indicators of the qualified teams
   */
  private void setQualifiedTeams()
  {
   if(nr<4)
   {
     QLTeams = new int[8];
     A.setIndOfQualifiedTeams();
     B.setIndOfQualifiedTeams();
     C.setIndOfQualifiedTeams();
     D.setIndOfQualifiedTeams();
     QLTeams[0]=A.getQualifiedTeams()[0];
     QLTeams[1]=B.getQualifiedTeams()[1];
     QLTeams[2]=A.getQualifiedTeams()[1];
     QLTeams[3]=B.getQualifiedTeams()[0];
     QLTeams[4]=C.getQualifiedTeams()[0];
     QLTeams[5]=D.getQualifiedTeams()[1];
     QLTeams[6]=C.getQualifiedTeams()[1];
     QLTeams[7]=D.getQualifiedTeams()[0];
   }
   else if(nr==4)
   {
     QLTeams = new int[4];
     QF.setIndOfQualifiedTeams();
     for(int i=0; i<4; i++){QLTeams[i]=QF.getQualifiedTeams()[i];}
   }
   else
   {
     QLTeams = new int[2];
     SF.setIndOfQualifiedTeams();
     for(int i=0; i<2; i++){QLTeams[i]=SF.getQualifiedTeams()[i];}
   }
  }

  //////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////GETTERS///////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  public boolean getIsStarted() {return this.isStarted;}
  /**
   * To give the number of the phase
   */
  public int getNumberPhase(){return nr;}
  /**
   * To give the list of coachs
   */
  public Coach[] getCoach(){return coachs;}

  public int getNumberOfCoachPLayer(){return nc;}
  
  /**
  * To return the coach associated to the indicator n°i
  */
  public Coach getIemeCoach(int i)
  {
    int n=0;
    while( (n<16) && (coachs[n].getNbCoach()!=i)){n++;}
    return coachs[n];
      
  }

  /**
   * To give the list of the coach's names
   */
  public String[] getListCoach()
  {
    String[] listCoach = new String[16];
    for(int k=0; k<16; k++)
    {
      listCoach[k] = this.coachs[k].getName();
    }
    return listCoach;
  }

   /**
   * To give the list of the team's names
   */
   public String[] getListTeams()
   {
     String[] list = new String[16];
     for(int k=0; k<16; k++)
     {
       list[k] = this.coachs[k].getTeam().getName();
     }
     return list;
   }

   public Group getGroupIemeCoach(int i)
   {
     Group OK = A;
     Boolean found=false;
     for(int n=0; n<4; n++){ if(A.getTeams().get(n).getInd()==i) {OK=A;found=true;} }
     if(found==false){ for(int n=4; n<8; n++){ if(B.getTeams().get(n-4).getInd()==i) {OK=B;found=true;} } }
     if(found==false){ for(int n=8; n<12; n++){ if(C.getTeams().get(n-8).getInd()==i) {OK=C;found=true;} } }
     if(found==false){ for(int n=12; n<16; n++){ if(D.getTeams().get(n-12).getInd()==i) {OK=D;found=true;} } }
     return OK;
   }

   /**
   * To give the whole agenda of the competition
     1 line = 1 game
     1- teamName1; 2- score1; 3- score2; 3- teamName2 */
   public String[][] getAgenda(){return agenda;}

   /**
   * To get the list of coming games */
   public String[][] getRoundBeforeGames(){return roundBeforeGames;}

   /**
   * To get the list of the last games */
   public String[][] getRoundAfterGames(){return roundAfterGames;}

   /**
   * To return the indicators of the qualified teams
   */
   public int[] getQualifiedTeams(){return QLTeams;}

   public Group getGroupA(){return A;}
   public Group getGroupB(){return B;}
   public Group getGroupC(){return C;}
   public Group getGroupD(){return D;}
   public Group getGroupQF(){return QF;}
   public Group getGroupSF(){return SF;}
   public Group getGroupF(){return F;}

   public CentraleOfBets getCOB(){return this.cob;}

   /**
   * To return the comments associated to the coach with the indicator i
   */
   public String[][] getComments(int i) {return coachs[i].team.getComments();}

   public int getNVal()
   {
      this.nval=0;
      for(int k=0; k<16; k++)
      {
          if(getCoach()[k].getState()) {this.nval++;}
      }
      return this.nval;
   }
   
  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////TOOLS////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
  * To classificate a list from best to worst
  */
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
