package IHMParieur;




import DataJoueur.PlayerDataParieur;
import Reseaux.TCP_SERVER;
import liguapoulpe.Tournament;

import java.awt.BorderLayout;

import java.awt.Color;
import java.awt.Font;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.JList;


/**
 * L'écran Gains présente la liste des gains (ou perte) du parieur.
 */


public class EcranGains extends JFrame
{
    // Pour communiquer avec le serveur Parieur
    private PlayerDataParieur dataP ;
    private TCP_SERVER server;

    // Les composants de la fenêtre.
    public String pathImage ;

    private JLayeredPane layer0 ;
    private JLabel background;
    private Bouton retour ;
    private JList listeGains;
    private LabelOutils titre;



    public EcranGains(PlayerDataParieur _dataP)
    {
        dataP = _dataP;
        server = dataP.getServer();
        dataP.setT(server.getTournament());

        pathImage = dataP.getPathImage();

        addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				System.out.println("bye");
				dispose();
				System.exit(0);
			}
		});

                //Définit le titre de la fenêtre.
                this.setTitle("Vos gains");
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
	public void addBackgroundG()
	{
                layer0 = new JLayeredPane();

		//Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "money.jpg"));
		background.setBounds (0,0,800,600) ;
		background.setOpaque(true);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);

                //Pour le titre
                titre = new LabelOutils(200,30,400,50);
                titre.addMessage("Résultats de vos paris", "Arial", 35, Color.darkGray);
                titre.setHorizontalAlignment(JLabel.CENTER);

                //Pour le bouton retour
                retour = new Bouton(600,500,150,50);
                retour.setIcon(new ImageIcon(pathImage + "retourEC4.jpg" ));
                retour.addMouseListener(new java.awt.event.MouseAdapter()
                {
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("retour G->3");

                            Ecran3 ecran3 = new Ecran3(dataP);
                            ecran3.addBackground3();
                            ecran3.setVisible(true);
                            setVisible(false);

                     }
                    });



                 //Pour les résultats.
                 String[] liste = dataP.voirGains();
                 listeGains = new JList();
                 Font police1 = new Font("Arial",Font.BOLD,18);
                 listeGains.setFont(police1);
                 listeGains.setForeground(Color.blue);
                 listeGains.setBounds(100,200,600,200);

                 listeGains.setListData(liste);
                 listeGains.setOpaque(false);



                //On ajoute les composants
                layer0.add (retour,new Integer (1));
                layer0.add (listeGains,new Integer (1));
                layer0.add (titre,new Integer (1));
        }

}