
package liguapoulpe;
import java.io.Serializable;

/**
 * To manage a generic Coach. The superclass Coach has two subclasses : CoachPlayer and CoachAuto.
 */

public class Coach implements Serializable
{
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////ATTRIBUTES//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
    private String name;
    private int nbCoach; // To identify the coach.
    public int pts_Comp; // This is the total number of points that the coach will have to share between the skills of his team.
    public Team team;
    private Dice d1; // The three dices are used to calclates pts_Comp.
    private Dice d2;
    private Dice d3;
    private boolean ready; // This boolean indicates that the coach and his team are ready for the next round.
    

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////CONSTRUCTOR/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

    public Coach(String name, int nb)
    {
        this.name=name;
        this.nbCoach = nb;
        pts_Comp=0;
        team = new Team("Lambda",0,0,0,0,0,this.nbCoach); // A "Lambda" team is created, it will be modified througth the IHM or with an automatic method.
        d1 = new Dice();
        d2 = new Dice();
        d3 = new Dice();
        ready = false;
   }


  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////GETTERS/////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

    /**Returns the name of the coach.**/
    public String getName() { return this.name; }

    /**Returns the number of the coach.**/
    public double getNbCoach() { return nbCoach; }

    /**Returns the skill points**/
    public int getPtsComp() { return this.pts_Comp; }

    /**Returns the team**/
    public Team getTeam() { return this.team; }

    /**Returns the state of the coach : if he is ready or not.**/
    public boolean getState() { return this.ready; }

   

  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////OTHER METHODS////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

    /**
     * Rolls three dices and calculates how many skill points the coach will have to share between the different competences of his team.
     */
    public void rollTheDices()
    {
        d1.roll6(); // Value between 1 and 6.
        d2.roll67(); // 6 or 7.
        d3.roll678(); // Value between 6 and 8.

        int D1=d1.getValue();
        int D2=d2.getValue();
        int D3=d3.getValue();

        this.pts_Comp = ((D2*D3)+D1)*2;
    }

    /** Indicates that the coach is ready.**/
    public void validateCoach() { this.ready=true; }
    public void invalidateCoach() { this.ready=false; }

}
