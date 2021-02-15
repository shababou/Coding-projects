package liguapoulpe;
import java.util.ArrayList;
import java.io.Serializable;

/**
 * To manage a Punter.
 */

public class Punter implements Serializable
{
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////ATTRIBUTES//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
    public int nb; //This number identifies the punter.
    private int nbPoulpes;
    private String punterName;
    private ArrayList<Integer> bets ; //This array contains the punter's bets for one round.
    private ArrayList<Integer> amount; //How many Pulp the punter bet on each match.
    private ArrayList<Integer> gains; //Gains for the last game.
    private boolean ready; // This boolean is true when the punter has finished to bet.

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////CONSTRUCTOR/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
    public Punter(String name, int nb)
    {
        this.punterName = name;
        this.nbPoulpes = 50;
        this.bets = new ArrayList<Integer>();
        this.amount = new ArrayList<Integer>();
        this.gains = new ArrayList<Integer>();
        this.nb = nb;
        this.ready = false;
    }
    
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////GETTERS/////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
    
    /** Returns the name of the punter **/
    public String getName() {return this.punterName;}

    /** Returns the number of the coach **/
    public int getNb() {return this.nb;}

    /** Returns the number of Poulpe's lives **/
    public int getNbPoulpes() {return this.nbPoulpes;}

    /** Returns the list of bets **/
    public ArrayList getBets() {return this.bets;}

    /** Returns the list of amounts **/
    public ArrayList getAmount() {return this.amount;}

    /** Returns the list of gains **/
    public ArrayList getGains() {return this.gains;}

    /** Returns the state of the punter (true if he is ready) **/
    public boolean getState() {return this.ready;}


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////SETTERS//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
    
    /** Setter for the name of the coach **/
    public void setName(String name) {this.punterName = name;}

    /** Setter for the number of Poulpe's lives **/
    public void setBnP(int nb) {this.nbPoulpes = nb;}

    /**
     * Adds a bet in the list.
     * @param i : the number of the match (represented by a different line in the array).
     * @param res : -1 if team A win, 1 if team B win, 0 else. See Class game for more details.
     */
    public void setBets(int i, int res)
    {bets.add(i, res);}


    /**
     * Adds the amount of a bet in the list.
     * @param i : number of the bet.
     * @param am : amount of the bet.
     */
    public void setAmout(int i, int am)
    {
        amount.add(i, am);
        this.nbPoulpes = this.nbPoulpes - am;
    }

    /**
     * Sets gains by copying an arraylist.
     * @param g : an ArrayList of integer you want to be your gains.
     */
    public void setGains(ArrayList<Integer> g)
    { this.gains = g; }

    /**
     * Validates the punter (method called when the punter closes his bets).
     */
    public void validate()
    { this.ready=true; }

    /**
     * Unvalidates the punter (method called when results are calculated).
     */
    public void unValidate()
    { this.ready=false; }

    /**
     * This method update the nbPoulpes with the results of the last round.
     */
    public void calculatePoulpe()
    {
        int sum  = 0;
        for (int k=0; k<gains.size(); k++)
        {sum = sum + gains.get(k) ;}
        this.nbPoulpes = this.nbPoulpes + sum;
    }

    /**
     * Erases the bets and amounts of the punter.
     */
    public void resetBets()
    {
        this.bets = new ArrayList<Integer>();
        this.amount = new ArrayList<Integer>();
    }

    /**
     * Erases the gains of the punter.
     */
    public void resetGains()
    {
        this.gains = new ArrayList<Integer>();
    }


}
