
package IHMWelcome;

import IHMParieur.Bouton;
import Reseaux.*;
import liguapoulpe.Tournament;

import java.awt.BorderLayout;
import java.awt.Color;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;



/**
 * Ecran qui lance le jeu.
 */


public class StartB extends JFrame
{
    private TCP_SERVER myTCP;
    private Tournament t;
    private String hostIPadress,myIPadress,pathImage;
    private int port;

    private Bouton create,join;
    private JLayeredPane layer0 ;
    private JLabel background;

    
    public StartB()
    {

        pathImage = "C:/Users/Murielle Molliet/Documents/NetBeansProjects/TheLast/src/images/" ;


       // myIPadress="10.64.100.127";
       // hostIPadress="10.64.100.128";
      myIPadress="localhost";
      hostIPadress="localhost";


      port=4444;
      t=new Tournament();
      myTCP = new TCP_SERVER(myIPadress,port,t);
      myTCP.start();


      addWindowListener(new WindowAdapter()
                {
                @Override
			public void windowClosing(WindowEvent e) {
				System.out.println("bye");
				dispose();
				System.exit(0);
			}
		});

                //Définit le titre de la fenêtre.
                this.setTitle("START");
                //Définit la taille de la fenêtre.
                this.setSize(600, 430);
                //Positionne la fenêtre au centre de l'écran.
                this.setLocationRelativeTo(null);
                //Empêche le redimensionnement de la fenêtre.
                this.setResizable(false);
	}


    /**
 * On construit le fond d'écran avec les composants (boutons et titres)
 */

	public void addBackgroundS()
	{

		layer0 = new JLayeredPane();

		//Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "poulpe_rose.jpg"));
		background.setBounds (0,0,600,420) ;
		background.setOpaque(true);
		layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);


                //Pour les boutons
                join = new Bouton (450,80,100,70);
                join.setText("Join");
                join.setBackground(Color.LIGHT_GRAY);
                join.addMouseListener(new java.awt.event.MouseAdapter()
                {
                 @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            new TCP_CLIENT(hostIPadress,port,"Salut!:"+myIPadress).start();
                            Welcome welcome = new Welcome(hostIPadress,port,myIPadress,myTCP);
                            welcome.addBackground();
                            welcome.setVisible(true);
                            
                     }
                    });

                create = new Bouton (50,80,100,70);
                create.setText("Create");
                create.setBackground(Color.PINK);
                create.addMouseListener(new java.awt.event.MouseAdapter()
                {
                 @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            Welcome welcome = new Welcome(hostIPadress,port,myIPadress,myTCP);
                            welcome.addBackground();
                            welcome.setVisible(true);
                     }
                 });




                 // On ajoute les composants
		layer0.add (join,new Integer (1));
		layer0.add (create,new Integer (1));

        }

        public static void main(String args[])
        {
            java.awt.EventQueue.invokeLater(new Runnable()
            {
                public void run()
                {
                    StartB s = new StartB();
                    s.addBackgroundS();
                    s.setVisible(true);

                }
            });
    }




}
