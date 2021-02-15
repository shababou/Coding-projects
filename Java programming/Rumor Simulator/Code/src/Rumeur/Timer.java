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
public class Timer extends Thread
{
    private int time;
    public boolean done = false;
    
    public Timer(int time)
    {
        this.time = time;
    }
    
    public void run()
    {
        while(time!=0)
        {
            try 
            {
                sleep(1);
                time--;
            } 
            catch (InterruptedException ex) 
            {
                Logger.getLogger(Timer.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
       done = true;
    }
}

