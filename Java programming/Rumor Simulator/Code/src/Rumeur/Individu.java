/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package Rumeur;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Individu extends Thread
{
    Monde monde;
    private int nbAmis;
    private int rayon;
    private int largeur;
    private int hauteur;
    private int x;
    private int y;
    
    private int opinion = -1;
    private int interet;
    private int utilite;
    private boolean discret;
    private int indice;
    public boolean diffuse = false;
    
    private int mode;
    private boolean abonne = false;
    private boolean actif = false;
    
    public boolean fait = false;
    
    /**
     * 
     * @param indice
     * @param monde
     */
	
    public Individu(int indice , Monde monde)
    {
         this.indice = indice;
         this.monde = monde;
         this.largeur = monde.getPanel().getWidth();
         this.hauteur = monde.getPanel().getHeight();
         this.x = (int) (Math.random() * (largeur-20)) + 10;
         this.y = (int) (Math.random() * (hauteur-20)) + 10;
         this.interet = (int) (Math.random() * 10);
         int b = (int) ( Math.random()*3 ); 	
         if (b >1) {discret = false;}
         else discret = true;
    }

    public void setUtilite(int util){this.utilite = util;}
    public void setRayon(int rayon){this.rayon = rayon;}
    public void setNbAmis(int nbAmis){this.nbAmis = nbAmis;}    
    public void sabonne(){this.abonne = true;}
    public void sactive(){this.actif = true;}
    public void reset()
    {
        abonne = false;
        actif = false;
        nbAmis = 0;
        diffuse = false;
        fait = false;
    }
    
    public ArrayList<Individu> setAmis(int mode,ArrayList<Individu> population)
    {
        ArrayList amis = new ArrayList();
        if(mode==0||mode==1||mode==3)
        {
            double[][] distance = new double[population.size()][2];
            for(int i=0; i<population.size(); i++)
            {
                distance[i][0] = Math.sqrt(  (x-population.get(i).getX())*(x-population.get(i).getX())  +  (y-population.get(i).getY())*(y-population.get(i).getY())   );
                distance[i][1] = population.get(i).getIndice();
            }
            distance = tricroissant(distance,population.size());
            if(mode==0) for(int i=0; i<nbAmis; i++) amis.add( i , population.get((int)distance[i][1]) );      
            else if(mode==1||mode==3)
            {
                int j=0;
                for(int i=0; i<population.size(); i++)
                {
                    if(distance[i][0]<=rayon) 
                    {
                        amis.add( j , population.get((int)distance[i][1]) );
                        j++;
                    }  
                }
                if(mode==1) nbAmis = amis.size();
            }
        }
        if(mode==2||mode==3)
        {
            for(int i=0; i<nbAmis; i++)
            {
                int n = (int) (Math.random() * population.size());
                amis.add( i , population.get(n) );
                if(mode==3) amis.add(population.get(n));
            }
            if(mode==3) nbAmis = amis.size();
        }
        return amis;
    }
    
    public void traitement()
    {
	if(  (opinion*utilite<0) && (Math.abs(utilite)>=interet+Math.abs(opinion)) )
        {
            opinion = -opinion;
            //if(discret==false) 
            diffuse = true;
        }
        if( Math.abs(utilite)>Math.abs(opinion) )
        {
            if(discret==false) diffuse = true; 
        }
    }

    public int getIndice(){return indice;}
    public int getOpinion(){return opinion;}
    public int getInteret(){return interet;}
    public int getX(){return x;}
    public int getY(){return y;} 
    public boolean estActif(){return actif;}

    @Override
    public synchronized void run()
    {
        fait = true;
        int n = (int) (Math.random() * (1500-200) + 200 );
        while(true)
        {
            try 
            {
                sleep(n);
                traitement();
                if(diffuse==true)
                {
                    for (int i = 0; i < nbAmis; i++) 
                    {
                        //if(monde.getAmis(indice).get(i).isAlive()==false)
                        if((monde.getAmis(indice).get(i).isAlive()==false) && (monde.getAmis(indice).get(i).fait==false))
                        { 
                            monde.getAmis(indice).get(i).setUtilite(utilite);
                            if(actif == true){monde.getAmis(indice).get(i).sactive();}
                            //if(monde.getAmis(indice).get(i).isAlive()==false)monde.getAmis(indice).get(i).start();
                            if((monde.getAmis(indice).get(i).fait==false) && (monde.getAmis(indice).get(i).isAlive()==false))monde.getAmis(indice).get(i).start();
                        }    
                    }
                    this.yield();
                }
            } 
            catch (InterruptedException ex) 
            {
                Logger.getLogger(Individu.class.getName()).log(Level.SEVERE, null, ex);
            }
        } 
    }
     
   
    

        
        
        
    public double[][] tricroissant( double tab[][], int tab_size)
    {
        int i=0;                                                                      
        double tmp0=0;
        double tmp1=0;
        int j=0;                                                                      
        for(i = 0; i < tab_size; i++)                                          
        {
            for(j = 1; j < tab_size; j++)                         
            {
                if(tab[i][0] < tab[j][0])                                                         
                {
                    tmp0 = tab[i][0];     
                    tmp1 = tab[i][1]; 
                    tab[i][0] = tab[j][0]; 
                    tab[i][1] = tab[j][1]; 
                    tab[j][0] = tmp0;
                    tab[j][1] = tmp1;
                    j--;                                                              
                 }                                                                   
             }                                                                       
         }                                                                           
         tmp0 = tab[0][0]; 
         tmp1 = tab[0][1];
         for(i = 0; i < tab_size-1; i++)  
         {    
             tab[i][0] = tab[i+1][0];
             tab[i][1] = tab[i+1][1];
             tab[tab_size-1][0] = tmp0; 
             tab[tab_size-1][1] = tmp1; 
         }
         return tab;
    }
 

}
