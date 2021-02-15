
package liguapoulpe;
import java.io.Serializable;

/**
 * Represents a real coach. All its caractéristics are managed by the player.
 */


public class CoachPlayer extends Coach implements Serializable
{
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////CONSTRUCTOR/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
    public CoachPlayer(String name, int nb)
    {
        super(name, nb);
    }


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////OTHER METHODS////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

    /**
     * With this method, the coach can affect the happiness of the team. On the IHM he hasthe choice between 5 different ways to speak to his team.
     * @param choice : is the number of the comment the coach decided to make.
     */
    public void speakToTeam(int choice)
   {
       String[][] com = this.team.getComments();
       String alt = com[choice][1];
       this.team.comToHap(alt) ;
   }


    /**
     * Sets the team's skills with the allocation made by the player.     
     * @param a : attack
     * @param b : defense
     * @param c : middle
     * @param d : collective
     * @param e : speed
     */
   public void setTeamComp(int a, int b, int c, int d, int e)
    {
        this.team.setAttack(a);
        this.team.setDefense(b);
        this.team.setMiddle(c);
        this.team.setCollective(d);
        this.team.setSpeed(e);

    }

   

  


}
