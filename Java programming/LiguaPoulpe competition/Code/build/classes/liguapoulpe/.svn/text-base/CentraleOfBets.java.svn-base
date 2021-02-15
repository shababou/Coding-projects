
package liguapoulpe;

import java.util.ArrayList;
import java.io.Serializable;
/**
 * Manages all the actions of the punters : records their bets and calculates their gains.
 */

public class CentraleOfBets implements Serializable
{
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////ATTRIBUTES//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
    public ArrayList<Punter> punters; // All punters participating in the game.
    int nval;

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////CONSTRUCTOR/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

    public CentraleOfBets()
    {
        punters = new ArrayList<Punter>();
        nval = 0;
    }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////GETTERS/////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a specific punter.
   * @param i : the number of the coach you want to see.
   **/
  public Punter getPunter(int i) {return punters.get(i);}

  /**Returns the ArrayList of punters.**/
  public ArrayList getPuntersList() { return this.punters;}


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////SETTERS//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
     /**
     * Adds a punter in the Array.
     * @param i : the number used to identify the punter.
     * @param name : the name of the punter, entered by the player.
     */
    public void addPunter(int i, String name)
    {
        Punter punter = new Punter(name,i);
        punters.add(i, punter); 
    }

   
  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////OTHER METHODS////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

    /**
     * Converts the results of the game into an array the system can interpret.
     * Return this array.
     * @param roundGames : the results of the game (see class Games).
     **/
    private int[] convertResults(String[][] roundGames) // roundGames : équipeA/scoreA/scoreB/équipeB
    {
        int l = roundGames.length;
        int[] res = new int[l];

        for (int k=0; k<l; k++)
        {
            int a = Integer.parseInt(roundGames[k][1]);
            int b = Integer.parseInt(roundGames[k][2]);

            // The scores of the two teams are compared.
            if(a>b){res[k]=1;} // If team A won, 1 is written.
            if(a==b){res[k]=0;} // If there was a draw, 0 is written.
            if(a<b){res[k]=-1;} // If team B won, -1 is written.
        }
        return res;
    }


    /**
     * Modifies the "nbPoulpes" of a punter by comparing the results of the games with the bets of the punter.
     * @param nbPunter : number of concerned punter.
     * @param roundGames : results of the current round.
     * */
    public void generateGains(int nbPunter, String[][] roundGames)
    {
        int [] res = convertResults(roundGames);
        getPunter(nbPunter).resetGains(); // The last gains of the punter are erased.

        int l = res.length;
        int n = getPunter(nbPunter).getBets().size();
        
        // lengths of res and bets are compared in case there is a problem.
        if(n>=l){ getPunter(nbPunter).setGains(calcultateGains(res, l, nbPunter)); }
        else { getPunter(nbPunter).setGains(calcultateGains(res, n, nbPunter));}


        getPunter(nbPunter).calculatePoulpe(); // Then we call the method setGains() that modifies the nbPoulpe of the punter.

        getPunter(nbPunter).resetBets(); // The bets and the amounts of the last rounds are erased (there could be less games in the next round).


    }

    /**
     * Calculates the gains of a punter. This method can be called only by the method generateGaind.
     * @param res : results of the currend round.
     * @param l : lenght to be considered for the calculation.
     * @param nbPunter : number of the concerned punter.
     */
    private ArrayList calcultateGains(int[] res, int l, int nbPunter)
    {
        ArrayList<Integer> bets = getPunter(nbPunter).getBets();
        ArrayList g =new ArrayList();
        ArrayList<Integer> amout = getPunter(nbPunter).getAmount();
        for(int k=0; k<l; k++)
            {
                if(bets.get(k)==1) // If the punter has bet the Team A would win.
                {
                    if(res[k]==1){g.add(k, 2*amout.get(k));} // If Team A won, he wins the double of his bet.
                    if(res[k]==0){g.add(k,0);} // If the game was draw, he wins nothing.
                    if(res[k]==-1){g.add(k,0);}
                }

                if(bets.get(k)==-1) // If team B won.
                {
                    if(res[k]==1){g.add(k,0);}
                    if(res[k]==0){g.add(k,0);}
                    if(res[k]==-1){g.add(k, 2*amout.get(k));}
                }

                if(bets.get(k)==0) // If the game was draw.
                {
                    if(res[k]==1){g.add(k, 0);}
                    if(res[k]==0){g.add(k,2*amout.get(k));}
                    if(res[k]==-1){g.add(k, 0);}
                }


            }
        return g;
    }

    public int getNVal()
    {
        this.nval = 0;
        int l = punters.size();

        for(int k=0; k<l; k++)
        {
            if(this.punters.get(k).getState()) {this.nval++;}
        }
        return nval;
    }

    public void unValidatePunters()
    {
        int l = this.punters.size();
        for(int k=0; k<l; k++) {this.punters.get(k).unValidate();}
    }



}
