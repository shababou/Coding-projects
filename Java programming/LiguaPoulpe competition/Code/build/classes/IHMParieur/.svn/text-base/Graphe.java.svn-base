
package IHMParieur;


import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Polygon;

import javax.swing.JFrame;
import javax.swing.JPanel;



/**
 * La classe Graphe permet de tracé le graphique des compétences de l'équipe E
 */


public class Graphe extends JPanel
{
     private int a,d,c,s,x,y,l,m;
     private double pas,theta ;

/**
  * Le constructeur avec les paramètres (qui sont des entiers)
  * relatifs aux compétences d'attaque, de défense, de jeu collectif, de milieu et de vitesse.
  * Il faut ensuite donner l'abcsisse et l'ordonnée du graphe, ainsi que sa largeur (c'est un carré) et l'échelle du graphe.
  */
     
     public Graphe(int attack,int defense,int collective,int middle,int speed,int abscisse,int ordonnee,int largeur)
     {
         a=attack;
         d=defense;
         c=collective;
         m=middle;
         s=speed;

         System.out.println(a);

         int max = a;
         if (max<d){max=d;}
         if (max<c){max=c;}
         if (max<m){max=m;}
         if (max<s){max=s;}
         System.out.println(max);

         x=abscisse;
         y=ordonnee;
         l=largeur;
  
         pas=l/(2*max);
         System.out.println(max);
         System.out.println(pas);
      
         theta = 72*Math.PI/180;
         
         this.setBounds(x,y,l,l);
         this.setVisible(true);
     }
         

     public void paint(Graphics g)
     {
        super.paintComponent(g);
        Graphics2D g2d = (Graphics2D) g;
      
        // Origine du repère.
        int x0 = l/2;
        int y0 = l/2;
        
        // Axes du repère.
        int xO2 = (int)(x0 - x0 * Math.sin(theta)+1);
        int yO2 = (int)(y0 - y0 * Math.cos(theta)+1);
        int xO3 = (int)(x0 - x0 * Math.sin(theta/2));
        int yO3 = (int)(y0 + y0 * Math.cos(theta/2)+1);
        int xO4 = (int)(x0 + x0 * Math.sin(theta/2));
        int xO5 = (int)(x0 + x0 * Math.sin(theta));

        g2d.drawLine(x0,10,x0,y0);
        g2d.drawLine(xO2,yO2,x0,y0);
        g2d.drawLine(xO3,yO3,x0,y0);
        g2d.drawLine(xO4,yO3,x0,y0);
        g2d.drawLine(xO5,yO2,x0,y0);



        // Echelles des axes.
        for (int i=1; i<=(l/(2*pas)) ; i++)
        {
            //Axe OO1
            int y1 = (int)(y0 - i*pas);
            g2d.fillOval(x0,y1,3,3);
            
            //Axe OO2
            int x2 = (int)(x0 - i*pas*Math.sin(theta));
            int y2 = (int)(y0 - i*pas*Math.cos(theta));
            g2d.fillOval(x2,y2,3,3);

            //Axe OO3
            int x3 = (int)(x0 - i*pas*Math.sin(theta/2));
            int y3 = (int)(y0 + i*pas*Math.cos(theta/2));
            g2d.fillOval(x3,y3,3,3);

            //Axe OO4
            int x4 = (int)(x0 + i*pas*Math.sin(theta/2));
            int y4 = (int)(y0 + i*pas*Math.cos(theta/2));
            g2d.fillOval(x4,y4,3,3);

            //Axe OO5
            int x5 = (int)(x0 + i*pas*Math.sin(theta));
            int y5 = (int)(y0 - i*pas*Math.cos(theta));
            g2d.fillOval(x5,y5,3,3);

        }

        
        g2d.setPaint(Color.red);

        //Coordonnées des points de performances
        int xA = x0;
        int yA = (int)(y0-a*pas);
        int xD = (int)(x0 - d*pas* Math.sin(theta));
        int yD = (int)(y0 - d*pas* Math.cos(theta));
        int xC = (int)(x0 - c*pas* Math.sin(theta/2));
        int yC = (int)(y0 + c*pas* Math.cos(theta/2));
        int xM = (int)(x0 + m*pas* Math.sin(theta/2));
        int yM = (int)(y0 + m*pas* Math.cos(theta/2));
        int xS = (int)(x0 + s*pas* Math.sin(theta));
        int yS = (int)(y0 - s*pas* Math.cos(theta));

        int[] abscisses = {xA,xD,xC,xM,xS};
        int[] ordonnees = {yA,yD,yC,yM,yS};

        //Tracé des points
        //L'attaque
        g2d.fillOval(xA,yA,5,5);
        //La défense
        g2d.fillOval(xD,yD,5,5);
        //Le collectif
        g2d.fillOval(xC,yC,5,5);
        //Le milieu
        g2d.fillOval(xM,yM,5,5);
        //La vitesse
        g2d.fillOval(xS,yS,5,5);


        // Pour relier les points
        Polygon p = new Polygon(abscisses,ordonnees,5);
        g2d.setPaint(Color.blue);
        g2d.drawPolygon(p);


        // Pour le nom des axes
        g2d.drawString("Attaque",x0+5,15);
        g2d.drawString("Défense",xO2+5,yO2-5);
        g2d.drawString("Collectif",xO3-40,yO3-5);
        g2d.drawString("Milieu",xO4+5,yO3-5);
        g2d.drawString("Vitesse",xO5-45,yO2-5);
     }
}
