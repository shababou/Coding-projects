package liguapoulpe;

import java.util.ArrayList;
import java.io.Serializable;

/**
 * This class represents a team, with its skills and history.
 */
public class Team implements Serializable
{
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////ATTRIBUTES//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  // Skills of the team
  private int attack;
  private int defense;
  private int middle;
  private int collective;
  private int speed;
  private String teamName;
  private int indteam;
  // Caracteritics of the team
  private double happiness=5, Dh=0;
  private boolean gameOver = false;
  private String[][] comments = new String[5][2];
  private double[][] p = new double[3][3]; // Board of Markov's transitivities
  private int s = 1; // Kind of result during the last game
  private int n = 0; // Number of games played
  private int[][] WXF = new int[6][3]; // Scores
  private boolean prol;
  private ArrayList <String[]> agenda = new ArrayList<String[]>(); // Agenda of the team
  private int[] rankCar = new int[4];
  private Team next;

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////CONSTRUCTOR/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  public Team (String name, int a, int b, int c, int d, int e, int ind)
  {
    this.teamName = name;
    this.attack = a;
    this.defense = b;
    this.middle = c;
    this.collective = d;
    this.speed = e;
    this.indteam = ind;
    for(int j=0;j<3;j++){for(int i=0;i<6;i++){WXF[i][j] =0;}}
  }


  
  

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////SETTERS//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * To actualize the attack of the team */
  public void setAttack(int att){this.attack += att;}

  /**
   * To actualize the middle of the team */
  public void setMiddle(int mid){this.middle += mid;}

  /**
   * To actualize the defense of the team */
  public void setDefense(int def){this.defense += def;}

  /**
   * To actualize the collective of the team */
  public void setCollective(int col){this.collective += col;}

  /**
   * To actualize the speed of the team */
  public void setSpeed(int spd){this.speed += spd;}

  /**
   * To actualize the name of the team */
  public void setName(String name){this.teamName = name;}

   /**
   * To actualize the moral of the team */
  public void setHappiness(double note){happiness += note;}

  /**
   * To set if the team is still in competition */
  public void setGameOver(){gameOver = true;}

  /**
   * To compute the board of Markov's transitivities, based on moral activity */
    // V N D
   //V
   //N
   //D
  private void MarkovTrans()
  {
    if(Dh<0)
    {
      p[0][1] = Math.exp(Dh);
      p[0][0] = (1 - p[0][1]) / (Dh*10.);
      p[0][2] = 1 - p[0][0] -p[0][1];

      p[1][2] = Math.exp(0.9*Dh);
      p[1][1] = (1 - p[1][2]) / (Dh*10.);
      p[1][0] = 1 - p[1][2] -p[1][1];

      p[2][2] = Math.exp(Dh/2.);
      p[2][0] = (1 - p[2][2]) / (Dh*10.);
      p[2][1] = 1 - p[2][2] -p[2][0];
    }
    else if(Dh>0)
    {
      p[2][1] = Math.exp(-Dh);
      p[2][2] = (1 - p[2][1]) / (Dh*10.);
      p[2][0] = 1 - p[2][2] -p[2][0];
      p[1][0] = Math.exp(-0.9*Dh);
      p[1][2] = (1 - p[1][0]) / (Dh*10.);
      p[1][1] = 1 - p[1][2] -p[1][0];

      p[0][0] = Math.exp(-Dh/2.);
      p[0][2] = (1 - p[0][0]) / (Dh*10.);
      p[0][1] = 1 - p[0][0] -p[0][2];
    }
    else
    {
      for(int i=0; i<3; i++)
      {
        for(int j=0; j<3; j++)
        {
          p[i][j] = 0.333;
        }
      }
    }
  }
  /**Increments the number of games played */
  public void incN(){this.n=n+1;}

  /**
  * To compute the next concurrent*/
  public void setNextConcurrent(Team t){next=t;}

  /**
   * To give the kind of result of the last game */
  public void setLast(int s){this.s = s; n ++;}

  /**
   * To complete the WXF scores of the team: [WXF a b] */
  public void setWXFresults(int[] t)
  {
    for(int i=0; i<3; i++){WXF[n][i]=t[i];}//////}
  }

  /**
   * To complete the agenda of the team */
  public void setAgenda(String[] score)
  {
    agenda.add(n-1, score);
  }

  /**
   * To put the comments of the team about the last game played*/
  public void setComments(String[][] com)
  {
    for(int i=0; i<5; i++){comments[i][0] = com[i][0];comments[i][1] = com[i][1];}
  }

  /**
   * To set the effect of the comments of the happiness*/
  public void comToHap(String iC)
  {
    int c=Integer.parseInt(iC);
    double cth=happiness*(c/10.)*(c/10.)*(c/10.);
    setHappiness(cth);
  }

  /**
   * To compute the trainig mode with the inpout tab
     1-Att;2-Mid;3-Def;4-Col;5-Spd */
   public void setTraining(int[] tab)
  {
    int[] tabR=new int[5];
    double[] dif=new double[5];
    for(int i=0;i<5;i++){dif[i]=tab[i]-15;}
    tabR[0]=(int)((happiness*dif[0])/10.);
    tabR[1]=(int)((happiness*dif[1])/10.);
    tabR[2]=(int)((happiness*dif[2])/10.);
    tabR[3]=(int)((happiness*dif[3])/10.);
    tabR[4]=(int)((happiness*dif[4])/10.);
    setAttack(tabR[0]);setMiddle(tabR[1]);setDefense(tabR[2]);setCollective(tabR[3]);setSpeed(tabR[4]);
  }

  /**
   * FOR THE FIRST PHASE ONLY!!
     For ranking, to actualize the results of the team PTS, GF, GA, DIF */
  public void setRankingCaracteristics(int a, int b)
  {
    rankCar[1] += a ; rankCar[2] += b; rankCar[3] = rankCar[1] - rankCar[2]; // Points, goals for, goals against, difference
    if(a>b){rankCar[0] += 3;}
    if(a==b){rankCar[0] +=1;}
    else{rankCar[0] +=0;}
  }

  /**
   * FOR THE FINAL PHASES ONLY!!
     True if last game win or lost after prolongations */
  public void setProlongations(boolean prol){this.prol=prol;}

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////GETTERS/////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * To return the indicator of the team */
  public int getInd(){return indteam;}

  /** Returns the attack of the team**/
  public int getAtt(){return attack;}

  /**Returns the middle game of the team**/
  public int getMid(){return middle;}

  /** Returns the defense of the team**/
  public int getDef(){return defense;}

  /** Returns the collective game of the team**/
  public int getCol(){return collective;}

  /** Returns the speed of the team**/
  public int getSpd(){return speed;}

  /** Returns the Name of the team **/
  public String getName(){return teamName;}

  /**
   * To get the moral of the team */
  public double getHappiness(){return happiness;}

  /**
   * To chack if the team is still in competition */
  public boolean isGameOver(){return gameOver;}
  
  /**
   * To get the number of the last game played */
  public int getGameNumber(){return n;}

  /**
   * To show the probabilities to Win, Equal, or Fail the next game */
  public double[] getSpecNextGame()
  {
    MarkovTrans();
    double[] spec = new double[3];
    for(int i=0; i<3; i++){spec[i]=p[s][i];}
    return spec;
  }

  /**
  * To get the next team concurrent*/
  public Team getNextConcurrent(){return next;}

  /**
   * To see the WXF scores of the team
     [W(win)X(noob)F(fail) scoreFor scoreAgainst] */
  public int[][] getWXFresults(){System.out.println(this.getName()+""+WXF[n][0]+""+WXF[n][0]+""+WXF[n][0]);return WXF;}

  /**
   * To see the WXF scores of the team OF THE LAST GAME
     [scoreFor scoreAgainst] */
  public int[] getLastWXFresults()
  {
    int[] tab=new int[2];
    tab[0]=WXF[n][1];
    tab[1]=WXF[n][2];
    return tab;
  }

  /**
   * To see the agenda of the team
    1 line = 1 game
    1- TeamName1; 2- Score1; 3- Score2; 4- TeamName2 */
  public ArrayList<String[]> getAgenda(){return agenda;}

  /**
   * To see the comments of the team about the last game played*/
  public String[][] getComments(){return comments;}

  /**FOR THE FIRST PHASE ONLY !!
   * For ranking, to see the results of the team */
  public int[] getRankingCaracteristics(){return rankCar;}

  /**
   * FOR THE FINAL PHASES ONLY!!
     True if last game win or lost after prolongations */
  public boolean getProlongations(){return prol;}

}
