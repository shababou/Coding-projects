package IHMParieur;



import DataJoueur.PlayerDataParieur;
import Reseaux.TCP_SERVER;
import liguapoulpe.Tournament;

import java.awt.BorderLayout;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;


/**
 * L'écran 6 est un menu.
 */


public class Ecran6 extends JFrame
{
    // Communication avec le serveur
    private PlayerDataParieur dataP;
    private TCP_SERVER server;

    // Composants de la fenêtre
    public String pathImage ;

    private JLayeredPane layer0 ;
    private Bouton retour,description,tournoi;
    private JLabel background;
    


/**
  * Le constructeur avec en paramètre un PlayerDataParieur.
  */
    public Ecran6(PlayerDataParieur _dataP)
	{
                dataP = _dataP;
                server = dataP.getServer();
                dataP.setT(server.getTournament());

                pathImage=dataP.getPathImage();

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
                this.setTitle("La compétition en temps réel");
                //Définit la taille de la fenêtre.
                this.setSize(800, 600);
                //Positionne la fenêtre au centre de l'écran.
                this.setLocationRelativeTo(null);
                //Empêche le redimensionnement de la fenêtre.
                this.setResizable(false);
	}



/**
* On construit le fond d'écran avec les composants (boutons et titres)
*/
	public void addBackground6()
	{
                layer0 = new JLayeredPane();

		//Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "chrono.jpg"));
		background.setBounds (0,0,800,600) ;
		background.setOpaque(true);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);

		//Pour les boutons
                retour = new Bouton (250,370,300,70);
                retour.setIcon(new ImageIcon(pathImage + "retourtert.jpg" ));
                retour.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("retour 6->3");

                            Ecran3 ecran3 = new Ecran3(dataP);
                            ecran3.addBackground3();
                            ecran3.setVisible(true);
                            setVisible(false);

                     }
                    });


                 description = new Bouton(250,150,300,70);
                 description.setIcon(new ImageIcon(pathImage + "descEquipes.jpg" ));
                 description.addMouseListener(new java.awt.event.MouseAdapter()
                 {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("description équipes");

                            Ecran7 ecran7 = new Ecran7(dataP);
                            ecran7.addBackground7();
                            ecran7.setVisible(true);
                            setVisible(false);
                            System.out.println(dataP.getNumPunter());

                     }
                 });

                 tournoi = new Bouton(250,265,300,70);
                 tournoi.setIcon(new ImageIcon(pathImage + "boutonTournoi.jpg" ));
                 tournoi.addMouseListener(new java.awt.event.MouseAdapter()
                 {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("arbre du tournoi");

                            Ecran8 ecran8 = new Ecran8(dataP, dataP.getServer().getPhase());
                            ecran8.addBackground8();
                            ecran8.setVisible(true);
                            setVisible(false);

                     }
                 });


               
		// On ajoute les composants
		layer0.add (retour,new Integer (1));
		layer0.add (description,new Integer (1));
                layer0.add (tournoi,new Integer (1));

	}
}
