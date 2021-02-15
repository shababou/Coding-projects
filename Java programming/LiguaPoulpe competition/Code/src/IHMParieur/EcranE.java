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
 * L'écran E donne accès aux caractéristiques de l'équipe E
 * (coach, matchs joués et graphe des compérences).
 */
public class EcranE extends JFrame
{
     // Communication avec le serveur
    PlayerDataParieur dataP;
    private TCP_SERVER server;

    // Composants de la fenêtre
    public String pathImage;

    private JLayeredPane layer0 ;
    private Bouton retour;
    private LabelOutils nomCoach,matchjoues,graphe;
    private LabelOutils name,resultat;
    private JLabel background;
    private Graphe graphique;
    private JList listeMatchs;

    private String teamName;
    private int num; //numéro de l'équipe.



/**
  * Le constructeur avec en paramètre un PlayerDataPlayer,
  * le nom de l'équipe dont on souhaite consulter la présentation ainsi que son numéro.
  */
    public EcranE(PlayerDataParieur _dataP,String _teamName, int numEquipe)
    {
                dataP = _dataP;
                server = dataP.getServer();
                dataP.setT(server.getTournament());

                pathImage=dataP.getPathImage();

                teamName = _teamName ;
                num = numEquipe;

		addWindowListener(new WindowAdapter() {
                @Override
			public void windowClosing(WindowEvent e) {
				System.out.println("bye");
				dispose();
				System.exit(0);
			}
		});


                //Définit le titre de la fenêtre.
                this.setTitle("Equipe "+teamName);
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
	public void addBackgroundE()
	{
                layer0 = new JLayeredPane();

		//Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "caracteristiques2.jpg"));
		background.setBounds (0,0,800,600) ;
		background.setOpaque(true);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);


		//Pour le bouton
                retour = new Bouton (650,30,100,60);
                retour.setIcon(new ImageIcon(pathImage + "retour4.jpg" ));
                retour.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("retour E->7");
                            setVisible(false);

                     }
                 });


                 //Pour les sous-titres
                 nomCoach = new LabelOutils(100,30,300,50);
                 nomCoach.addMessage("Nom du Coach :", "Arial", 20, Color.black);

                 matchjoues = new LabelOutils(100,60,500,50);
                 matchjoues.addMessage("Liste des matchs joués et les résultats :", "Arial", 20, Color.black);

                 graphe = new LabelOutils(100,260,500,50);
                 graphe.addMessage("Graphe des performances de l'équipe :", "Arial", 20, Color.black);


                 //Pour les réponses
                 name = new LabelOutils(250,30,300,50);
                 name.addMessage(dataP.afficheCoach(num), "Arial", 25, Color.yellow);


                 //Pour les résultats des matchs joués.
                 String[] liste = dataP.voirMatchsJouesEquipeE(num);
                 
                 listeMatchs = new JList();
                 Font police1 = new Font("Arial",Font.ROMAN_BASELINE,18);
                 listeMatchs.setFont(police1);
                 listeMatchs.setForeground(Color.blue);
                 listeMatchs.setBounds(200,110,400,200);
                 
                 listeMatchs.setListData(liste);
                 listeMatchs.setOpaque(false);

                 
               
                 // Création du graphe de compétences de l'équipe
                 int[] capacites = dataP.voirCapacitesEquipe(num);
                 graphique = new Graphe(capacites[0],capacites[1],capacites[2],capacites[3],capacites[4],275,310,250);
                 graphique.setBounds(300,300,250,250);
                 graphique.setOpaque(true);
                 



		// On ajoute les composants
		layer0.add (retour,new Integer (1));
		layer0.add (nomCoach,new Integer (1));
                layer0.add (matchjoues,new Integer (1));
                layer0.add (graphe,new Integer (1));
                layer0.add (name,new Integer (1));
                layer0.add (listeMatchs,new Integer (1));
                layer0.add (graphique,new Integer (1));
                getContentPane().add(layer0, BorderLayout.CENTER);
	}

}
