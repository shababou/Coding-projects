package IHMParieur;


import liguapoulpe.Clock;

import DataJoueur.PlayerDataParieur;
import Reseaux.TCP_SERVER;

import java.awt.BorderLayout;
import java.awt.Color;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;




/**
 * L'écran 2 est un écran de présentation du jeu.
 */


public class Ecran2 extends JFrame
{
    // Pour communiquer avec le serveur Parieur
    private PlayerDataParieur dataP ;
    private TCP_SERVER server;


    // Les composants de la fenêtre.
    public String pathImage ;

    private JLayeredPane layer0 ;
    private Bouton go ;
    private LabelOutils titre,felicitation,felicitation2,nbVies,explication,acces ;
    private JLabel background;




    public Ecran2(PlayerDataParieur _dataP)
	{
                dataP = _dataP ;
                pathImage = dataP.getPathImage();
                server = dataP.getServer();
                dataP.setT(server.getTournament());

		addWindowListener(new WindowAdapter() {
            @Override
			public void windowClosing(WindowEvent e) {
				System.out.println("bye");
				dispose();
				System.exit(0);
			}
		});

                //Définit le titre de la fenêtre.
                this.setTitle("Votre Profil");
                //Définit la taille de la fenêtre.
                this.setSize(800, 600);
                //Positionne la fenêtre au centre de l'écran.
                this.setLocationRelativeTo(null);
                //Empêche le redimensionnement de la fenêtre.
                this.setResizable(false);



	}


    
/**
* On construit le fond d'écran avec les composants (boutons et titres).
* La méthode prend en paramètre le nom du parieur qui est donné dans la JTextField de l'écran 1.
*/
	public void addBackground2(String nameParieur)
	{
                layer0 = new JLayeredPane();

		//Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "ball.jpg"));
		background.setBounds (0,0,800,600) ;
		background.setOpaque(true);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);
		
		//Pour le bouton
                go = new Bouton (500,380,200,111);
                go.setIcon(new ImageIcon(pathImage + "boutonStart.jpg" ));

                go.addMouseListener(new java.awt.event.MouseAdapter()
                {
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("go");

                            Clock clock = new Clock(2);
                            clock.start();

                            while(true)
                            {
                                if(clock.getFlag())
                                {
                                     Ecran3 ecran3 = new Ecran3(dataP);
                                     ecran3.addBackground3();
                                     ecran3.setVisible(true);

                                    setVisible(false);
                                    break;
                                }
                                else{}
                            }
                           

                     }
                    });
                    

                //Pour les indications
                titre = new LabelOutils(0,30,800,70);
                titre.addMessage("Profil de " + nameParieur, "Arial", 50, Color.green);
                titre.setHorizontalAlignment(JLabel.CENTER);


                felicitation = new LabelOutils(0,120,800,50);
                felicitation.addMessage("Félicitations !", "Arial", 40, Color.red);
                felicitation.setHorizontalAlignment(JLabel.CENTER);
                
                felicitation2 = new LabelOutils(0,160,800,50);
                felicitation2.addMessage("Vous venez de créer votre compte Parieur", "Arial", 30, Color.red);
                felicitation2.setHorizontalAlignment(JLabel.CENTER);

                nbVies = new LabelOutils(50,250,700,50);
                nbVies.addMessage("Vous disposez à présent de 50 vies de Poulpe", "Arial", 30, Color.black);
                nbVies.setHorizontalAlignment(JLabel.CENTER);

                explication = new LabelOutils(40,290,750,50);
                explication.addMessage("Celles-ci vous permettront de parier sur les matchs de la Poulpe Cup !", "Arial", 23, Color.black);
                explication.setHorizontalAlignment(JLabel.CENTER);
                
                acces = new LabelOutils(150,420,400,50);
                acces.addMessage("Accès aux Paris en ligne :", "Arial", 28, Color.red);

		// On ajoute les composants
		layer0.add (go,new Integer (1));
                layer0.add (titre,new Integer (1));
		layer0.add (felicitation,new Integer (1));
                layer0.add (felicitation2,new Integer (1));
		layer0.add (nbVies,new Integer (1));
                layer0.add (explication,new Integer (1));
                layer0.add (acces,new Integer (1));

	}

}
