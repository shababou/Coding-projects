
package liguapoulpe;
import java.io.Serializable;

/**
 * This coach is managed by the computer.
 **/

public class CoachAuto extends Coach implements Serializable
{
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////ATTRIBUTES//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
    Dice d4; // for random decisions.
    String[] pays = new String[16];

    
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////CONSTRUCTOR/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

    public CoachAuto(String name, int nb)
    {
        super(name, nb);
        d4 = new Dice();
        pays[0]="France";
        pays[1]="Allemagne";
        pays[2]="Italie";
        pays[3]="Espagne";
        pays[4]="Norvège";
        pays[5]="Suède";
        pays[6]="Suisse";
        pays[7]="Angleterre";
        pays[8]="Pays-Bas";
        pays[9]="Slovaquie";
        pays[10]="Grèce";
        pays[11]="Russie";
        pays[12]="Croatie";
        pays[13]="Autriche";
        pays[14]="Hongrie";
        pays[15]="Lituanie";
        
        this.team.setName(pays[nb]);
        this.setProfil(); // A profile is selected randomly.
  }


  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////METHODS FOR AUTO-PROFILE///////////////////////////
  //////////////////////////////////////////////////////////////////////////////

    /**
     * Randomly selects which type of profile will be used and set it.
     */
    public void setProfil()
    {
        d4.roll6(); // Value between 1 and 6.
        int n = d4.getValue();

        rollTheDices();
        int pts = getPtsComp();

        int al1 = ((int)(6*Math.random()));
        int al2 = ((int)(12*Math.random()));

        if(n==1){setAttackProfil(pts,al1,al2);}
        if(n==2){setDefenseProfil(pts,al1,al2);}
        if(n==3){setSpeedProfil(pts,al1,al2);}
        if(n==4){setMiddleProfil(pts,al1,al2);}
        if(n==5){setCollectiveProfil(pts,al1,al2);}
        if(n==6){setEquiProfil(pts,al1,al2);}
    }

    /**
     * Sets a team's profile based on attack.
     * @param pts : the skill points calculated in the method setProfil().
     */
    private void setAttackProfil(int pts, int al1, int al2)
    {
        int def, mid, spd, att, col;
        att = (int)(pts/3); // A third of skill points are assigned to attack.

        // The other points are assigned to other competences with a variation due to chance.
        int others = (int)(pts/6);
        

        int signe1 = (int)(2*Math.random());
        if(signe1==0){def = others + al1; col = others + al2; spd = others - al1; mid = others - al2;}
        else {def = others - al1; col = others - al2; spd = others + al1; mid = others + al2;}

        team.setAttack(att);
        team.setDefense(def);
        team.setSpeed(spd);
        team.setMiddle(mid);
        team.setCollective(col);
    }

    /**
     * Sets a team's profile based on defense.
     * @param pts : the skill points calculated in the method setProfil().
     */
    private void setDefenseProfil(int pts, int al1, int al2)
    {
        int def, mid, spd, att, col;
        def = (int)(pts/3);

        int others = (int)(pts/6);
        

        int signe1 = (int)(2*Math.random());
        if(signe1==0){att = others + al1; col = others + al2; spd = others - al1; mid = others - al2;}
        else {att = others - al1; col = others - al2; spd = others + al1; mid = others + al2;}

        team.setAttack(att);
        team.setDefense(def);
        team.setSpeed(spd);
        team.setMiddle(mid);
        team.setCollective(col);
        
    }

    /**
     * Sets a team's profile based on speed.
     * @param pts : the skill points calculated in the method setProfil().
     */
    private void setSpeedProfil(int pts, int al1, int al2)
    {
        int def, mid, spd, att, col;
        spd = (int)(pts/3);

        int others = (int)(pts/6);
        

        int signe1 = (int)(2*Math.random());
        if(signe1==0){def = others + al1; col = others + al2; att = others - al1; mid = others - al2;}
        else {def = others - al1; col = others - al2; att = others + al1; mid = others + al2;}

        team.setAttack(att);
        team.setDefense(def);
        team.setSpeed(spd);
        team.setMiddle(mid);
        team.setCollective(col);
    }

    /**
     * Sets a team's profile based on middle game.
     * @param pts : the skill points calculated in the method setProfil().
     */
    private void setMiddleProfil(int pts, int al1, int al2)
    {
        int def, mid, spd, att, col;
        mid = (int)(pts/3);

        int others = (int)(pts/6);
     

        int signe1 = (int)(2*Math.random());
        if(signe1==0){def = others + al1; col = others + al2; spd = others - al1; att = others - al2;}
        else {def = others - al1; col = others - al2; spd = others + al1; att = others + al2;}

        team.setAttack(att);
        team.setDefense(def);
        team.setSpeed(spd);
        team.setMiddle(mid);
        team.setCollective(col);
    }

    /**
     * Sets a team's profile based on collective game.
     * @param pts : the skill points calculated in the method setProfil().
     */
    private void setCollectiveProfil(int pts, int al1, int al2)
    {
        int def, mid, spd, att, col;
        col = (int)(pts/3);

        int others = (int)(pts/6);
        

        int signe1 = (int)(2*Math.random());
        if(signe1==0){def = others + al1; att = others + al2; spd = others - al1; mid = others - al2;}
        else {def = others - al1; att = others - al2; spd = others + al1; mid = others + al2;}

        team.setAttack(att);
        team.setDefense(def);
        team.setSpeed(spd);
        team.setMiddle(mid);
        team.setCollective(col);
        
    }

   
    /**
     * Sets a well balanced team's profile.
     * @param pts : the skill points calculated in the method setProfil().
     */
    private void setEquiProfil(int pts, int al1, int al2)
    {
        int def, mid, spd, att, col;
        att = (int)(pts/5);

        int signe1 = (int)(2*Math.random());
        if(signe1==0){def = att + al1; col = att + al2; spd = att - al1; mid = att - al2;}
        else {def = att - al1; col = att - al2; spd = att + al1; mid = att + al2;}

        team.setAttack(att);
        team.setDefense(def);
        team.setSpeed(spd);
        team.setMiddle(mid);
        team.setCollective(col);
    }


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////METHODS FOR AUTO-TRAINING////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

    /**
     * Sets the training focusing on the major skill of the team.
     */
    public void trainTeam()
    {
        int n = d4.getValue();
        if(n==1){trainAttack();}
        if(n==2){trainDefense();}
        if(n==3){trainSpeed();}
        if(n==4){trainMiddle();}
        if(n==5){trainCollective();}
        if(n==6){trainEqui();}
    }

    /**
     * Sets a training based on attack.
     */
    private void trainAttack()
    {
        // To train your team you have to share 100 points between each caracteristic.
        int[] train = new int[5];
        train[0]=30; // In this case attack is promoted.
        train[1]=17;
        train[2]=18;
        train[3]=17;
        train[4]=18;

        this.team.setTraining(train);
    }

    /**
     * Sets a training based on defense.
     */
    private void trainDefense()
    {
        int[] train = new int[5];
        train[0]=18;
        train[1]=17;
        train[2]=30;
        train[3]=17;
        train[4]=18;

        this.team.setTraining(train);
    }

    /**
     * Sets a training based on middle.
     */
    private void trainMiddle()
    {
        int[] train = new int[5];
        train[0]=18;
        train[1]=30;
        train[2]=17;
        train[3]=17;
        train[4]=18;

        this.team.setTraining(train);
    }

    /**
     * Sets a training based on collective game.
     */
    private void trainCollective()
    {
        int[] train = new int[5];
        train[0]=18;
        train[1]=17;
        train[2]=17;
        train[3]=30;
        train[4]=18;

        this.team.setTraining(train);
    }

    /**
     * Sets a training based on speed.
     */
    private void trainSpeed()
    {
        int[] train = new int[5];
        train[0]=18;
        train[1]=17;
        train[2]=18;
        train[3]=17;
        train[4]=30;

        this.team.setTraining(train);
    }

    /**
     * Sets a well balanced training.
     */
    private void trainEqui()
    {
        int[] train = new int[5];
        train[0]=20;
        train[1]=20;
        train[2]=20;
        train[3]=20;
        train[4]=20;

        this.team.setTraining(train);
    }

    




}
