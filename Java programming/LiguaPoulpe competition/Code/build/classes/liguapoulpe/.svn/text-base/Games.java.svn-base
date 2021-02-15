package liguapoulpe;

import java.util.ArrayList;
import java.io.Serializable;

/**
 * Does the reults for n games computed in order
 */
public class Games implements Serializable
{
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////ATTRIBUTES//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  Team[] t; // Array of the teams wwhich are going to play
  private int[] score; // Array of the results
  private int n=0;

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////CONSTRUCTOR/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  public Games(Team[] t)
  {
    this.t = t;
    score = new int[t.length];
  }

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////SETTERS//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * To establish the scores based on the skills of the teams **/
  public void setScore()
  {
    for(int i=0 ; i<t.length; i+=2)
    {
      t[i].setProlongations(false);t[i+1].setProlongations(false);
      int a; int b;
      if(t[i].getMid()-t[i+1].getMid()>2)
      {
        if(t[i].getCol()>t[i+1].getCol())
        {
          if(t[i].getAtt()>t[i+1].getDef())
          {
            if(t[i].getAtt()-t[i+1].getDef()>10){a = 3 ; b = 0;}
            else if(t[i].getAtt()-t[i+1].getDef()>8){a = 2 ; b = 0;}
            else{a = 1 ; b = 0;}
          }
          else
          {
            a = 0 ; b = 0;
          }
       }
       else
       {
         if(t[i].getSpd()>t[i+1].getSpd())
         {
           if(t[i].getAtt()>t[i+1].getDef())
           {
             if(t[i].getAtt()-t[i+1].getDef()>8){a = 2 ; b = 0;}
             else{a = 1 ; b = 0;}
           }
           else
           {
             a = 0; b = 0;
           }
         }
         else
         {
           if(t[i+1].getSpd()-t[i].getSpd()>5)
           {
             if(t[i].getDef()<t[i+1].getAtt())
             {
               if(t[i+1].getAtt()-t[i].getDef()>10){a = 0 ; b = 2;}
               else if(t[i+1].getAtt()-t[i].getDef()>8){a = 0 ; b = 1;}
               else{a = 0 ; b = 0;}
             }
             else
             {
               a = 0 ; b = 0;
             }
           }
           else
           {
             a = t[i].getAtt()-t[i+1].getDef();
             b = t[i+1].getAtt()-t[i].getDef(); if(b>10){b=3;};
             if(a<0){a=0;}
             if(a>10){a=3;}
             else if(a>8){a=2;}
             else{a=1;}
             if(b<0){b=0;}
             if(b>10){b=3;}
             else if(b>8){b=2;}
             else{b=1;}
           }
         }
       }
    }
    else if(t[i+1].getMid()-t[i].getMid()>2)
    {
      if(t[i+1].getCol()>=t[i].getCol())
      {
        if(t[i+1].getAtt()>t[i].getDef())
        {
          if(t[i+1].getAtt()-t[i].getDef()>10){b = 3 ; a = 0;}
          else if(t[i+1].getAtt()-t[i].getDef()>8){b = 2 ; a = 0;}
          else{b = 1 ; a = 0;}
        }
        else
        {
          a = 0 ; b = 0;
        }
      }
      else
      {
        if(t[i+1].getSpd()>t[i].getSpd())
        {
          if(t[i+1].getAtt()>t[i].getDef())
          {
            if(t[i+1].getAtt()-t[i].getDef()>8){b = 2 ; a = 0;}
            else{b = 1 ; a = 0;}
          }
          else
          {
            a = 0; b = 0;
          }
        }
        else
        {
          if(t[i].getSpd()-t[i+1].getSpd()>5)
          {
            if(t[i+1].getDef()<t[i].getAtt())
            {
              if(t[i].getAtt()-t[i+1].getDef()>10){b = 0 ; a = 2;}
              else if(t[i].getAtt()-t[i+1].getDef()>8){b = 0 ; a = 1;}
              else{b = 0 ; a = 0;}
            }
            else
            {
              b = 0 ; a = 0;
            }
          }
          else
          {
            b = t[i+1].getAtt()-t[i].getDef();
            a = t[i].getAtt()-t[i+1].getDef();
            if(b<0){b=0;}
            if(b>10){b=3;}
            else if(b>8){b=2;}
            else{b=1;}
            if(a<0){a=0;}
            if(a>10){a=3;}
            else if(a>8){a=2;}
            else{a=1;}
          }
        }
      }
    }
    else
    {
      b = t[i+1].getAtt()-t[i].getDef();
      if(b<0){b=0;}
      if(b>15){b=3;}
      else if(b>12){b=2;}
      else{b=1;}
      a = b;
    }
    // Real scores
    score[i]=a; score[i+1]=b;
    // Modifications taking into account happiness and the random aspect
    double[] s1 = t[i].getSpecNextGame();
    double[] s2 = t[i+1].getSpecNextGame();
    if(a>b){  if(s1[0]*s2[2]<s1[2]*s2[0]){score[i]=a; score[i+1]=b+setRandom();}  } // Proba que 1 gagne et 2 perde plus faible que celle de l'inverse
    else if(a<b){  if(s2[0]*s1[2]<s2[2]*s1[0]){score[i]=b+setRandom(); score[i+1]=a+setRandom();}  }
    else
    {
      if( Math.abs(s1[1]-s2[1]) < 0.1 ) // Probability to have a well-balanced game
      {
        if(s1[0]*s2[2]<s1[2]*s2[0]){score[i]=a+setRandom(); score[i+1]=b+setRandom();}
        if(s1[0]*s2[2]>s1[2]*s2[0]){score[i]=a+setRandom(); score[i+1]=b+setRandom();}
      }
    }
    // Set WXF scores
    if(score[i]<score[i+1])
    {
      t[i].setLast(2); 
        int sc1[] = {2,score[i],score[i+1]};
               
        t[i].setWXFresults(sc1);
      t[i+1].setLast(0);
        int sc2[] = {0,score[i+1],score[i]};
        t[i+1].setWXFresults(sc2);
    }
    else if(score[i]>score[i+1])
    {
      t[i].setLast(0); 
        int sc1[] = {0,score[i],score[i+1]};
        t[i].setWXFresults(sc1);
      t[i+1].setLast(2);
        int sc2[] = {2,score[i+1],score[i]};
        t[i+1].setWXFresults(sc2);
    }
    else
    {         // Prologations section
         if( (t[i].getGameNumber()>=3) && (t[i+1].getGameNumber()>=3) )
         {
           System.out.println("PROLONGATIONS !!");
           int prol1; int prol2;
           if(setRandom()==1){prol1=setRandom()+1;prol2=0;}
           else{prol2=setRandom()+1;prol1=0;}
           score[i]=score[i]+prol1;score[i+1]=score[i+1]+prol2;
           if(score[i]>score[i+1])
           {
             t[i].setLast(0);
              int sc1[] = {0,score[i],score[i+1]};
              t[i].setWXFresults(sc1);
             t[i+1].setLast(2);
              int sc2[] = {2,score[i+1],score[i]};
              t[i+1].setWXFresults(sc2);
           }
           else
           {
             t[i].setLast(2);
              int sc1[] = {2,score[i],score[i+1]};
              t[i].setWXFresults(sc1);
             t[i+1].setLast(0);
              int sc2[] = {0,score[i+1],score[i]};
              t[i+1].setWXFresults(sc2);
           }
           t[i].setProlongations(true);
           t[i+1].setProlongations(true);
         }
      else
      {
      t[i].setLast(1);
       int sc1[] = {1,score[i],score[i+1]};
       t[i].setWXFresults(sc1);
      t[i+1].setLast(1);
       int sc2[] = {1,score[i+1],score[i]};
       t[i+1].setWXFresults(sc2);
      }
    }
    // To actualize results
    t[i].setRankingCaracteristics(score[i],score[i+1]); t[i+1].setRankingCaracteristics(score[i+1],score[i]); // For the first phase
    String[] ag1= new String[4];
    ag1[0]=t[i].getName(); ag1[1]=String.valueOf(score[i]); ag1[2]=String.valueOf(score[i+1]); ag1[3]=t[i+1].getName();
    t[i].setAgenda(ag1);
    String[] ag2= new String[4];
    ag2[0]=t[i+1].getName(); ag2[1]=String.valueOf(score[i+1]); ag2[2]=String.valueOf(score[i]); ag2[3]=t[i].getName();
    t[i+1].setAgenda(ag2);
    setComments(i); setComments(i+1);
   }
   setMoral();
  }

  /**
   * To send the commentaries of the team number n **/
   public void setComments(int n)
   {
      // System.out.println(t[n].getName());
     String[][] com = new Commentaries(t[n]).sendCommentaries();
     t[n].setComments(com);
   }

  /**
   * To establish the moral of the teams **/
   private void setMoral()
   {
     double note;
     for(int i=0; i<t.length; i+=2)
     {
       note = 2*(score[i]-score[i+1]);
       t[i].setHappiness(note/10.);
       t[i+1].setHappiness(-note/10.);
     }
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////GETTERS/////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * To see the score of the game between Team n1 and Team n2, IN A NUMERICAL WAY*/
  public String[] getScore(int n1, int n2)
  {
    String[] tab = new String[4];
    tab[0] = t[n1].getName();     tab[1] = String.valueOf(score[n1]);
    tab[2] = String.valueOf(score[n2]);
    tab[3] = t[n2].getName();
    return  tab;
  }

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////TOOLS////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  /**
   * To run random number between 0, 1 and 2 **/
   private int setRandom()
   {
     return (int)(Math.random()*2);
   }
   
}
