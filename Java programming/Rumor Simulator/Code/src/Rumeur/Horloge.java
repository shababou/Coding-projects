/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package Rumeur;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Simon
 */
public class Horloge extends Thread
{
    int time;
    int current = 0;
    Monde monde;
    boolean done = false;
    
    public Horloge(int time,Monde monde)
    {
        this.time = time;
        this.monde = monde;
    }
    
    public void run()
    {
        while(time!=0)
        {
            try 
            {
                sleep(200);
                monde.affichage();
                time--;
                current++;
            } 
            catch (InterruptedException ex) 
            {
                Logger.getLogger(Horloge.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        done = true;
    }

}
