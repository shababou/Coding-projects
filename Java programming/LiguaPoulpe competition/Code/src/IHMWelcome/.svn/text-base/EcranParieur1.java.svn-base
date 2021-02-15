package IHMWelcome;





import DataJoueur.PlayerDataParieur;
import Reseaux.*;
import IHMParieur.*;
import liguapoulpe.Tournament;

import java.awt.BorderLayout;
import java.awt.Color;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.JTextField;


/**
 * Il s'agit de l'écran de création du profil du nouveau Parieur.
 * Il va y rentrer son identifiant et créer son compte.
 */

public class EcranParieur1 extends JFrame
{
        // Pour communiquer avec le serveur.
        private TCP_SERVER server;
        private Tournament t;
        private String IPserver,IPjoueur;
        private int port, numParieur;


        // Les différents composants de la fenêtre.
	private JLayeredPane layer0 ;
	private Bouton creer ;
        private LabelOutils creation,indications ;
        private JTextField nomParieur;
        private JLabel background;

	public String pathImage ;



	public EcranParieur1(String _IPserver,int _port,String _IPjoueur,TCP_SERVER _server,String _pathImage,int _numParieur)
	{
                server = _server ;
                t = server.getTournament();
                IPserver = _IPserver;
                IPjoueur = _IPjoueur;
                port = _port;

                pathImage = _pathImage;

                numParieur = _numParieur;


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
                this.setTitle("Espace Parieur");
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
	public void addBackground1()
	{
                layer0 = new JLayeredPane();

		// Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "ballon.jpg"));
		background.setBounds (0,0,800,600) ;
		background.setOpaque(true);
		layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);


                //Pour le titre
                creation = new LabelOutils(140,100,600,50);
                creation.addMessage("Création de votre profil Parieur","Arial",40,Color.yellow);


                //Pour donner le nom du parieur
                indications = new LabelOutils(230,280,140,40);
                indications.addMessage("Identifiant :", "Arial", 25, Color.red);
                indications.setOpaque(false);

                nomParieur = new JTextField();
                nomParieur.setBounds(370, 280, 200, 40);
                nomParieur.setBackground(Color.red);


                //Pour les boutons
                creer = new Bouton (300,420,200,80);
                creer.setIcon(new ImageIcon(pathImage + "créer.jpg" ));

                creer.addMouseListener(new java.awt.event.MouseAdapter()
                {
                 @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("creer compte Parieur");

                            //On transmet au server le nom du nouveau Parieur pour qu'il puisse créer son compte
                            new TCP_CLIENT (IPserver,port,"new punter" + ":" +(nomParieur.getText())+":"+numParieur).start();

                            //On crée un nouveau Serveur du type PlayerDataParieur, qui va gérer les liaisons entre l'IHM Parieur et le code.
                            PlayerDataParieur dataP = new PlayerDataParieur(server,IPserver,port,nomParieur.getText());
                            dataP.setPathImage(pathImage);

                            // On affiche l'écran suivant, qui fait parti de l'IHM Parieur.
                            Ecran2 ecran2 = new Ecran2(dataP);
                            ecran2.addBackground2(nomParieur.getText());
                            ecran2.setVisible(true);
                            setVisible(false);

                      }
                    });



		// On ajoute les composants
		layer0.add (creer,new Integer (1));
		layer0.add (creation,new Integer (1));
                layer0.add (nomParieur,new Integer (1));
                layer0.add (indications,new Integer (1));

	}
}




