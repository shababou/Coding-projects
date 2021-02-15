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
 * Il y a deux possibilités pour cet écran ;
 *          soit le parieur n'a fait aucune mise sur les matchs qui sont en cours ou qui vont être joués ;
 *          soit il a effectué une ou plusieurs mises et peut consulter cette liste.
 */


public class Ecran4 extends JFrame
{
    // Pour communiquer avec le serveur
    private PlayerDataParieur dataP;
    private TCP_SERVER server;


    // Pour l'architecture de la fenêtre
    public String pathImage ;

    private JLayeredPane layer0 ;
    private Bouton nvParis, retour ;
    private LabelOutils aucunPari ;
    private JList listeParis;
    private JLabel background;




    public Ecran4(PlayerDataParieur _dataP)
	{
                dataP = _dataP ;
                server = dataP.getServer();
                dataP.setT(server.getTournament());
                pathImage = dataP.getPathImage();

		addWindowListener(new WindowAdapter()
                {
                @Override
			public void windowClosing(WindowEvent e)
                        {
				System.out.println("bye");
				dispose();
				System.exit(0);
			}
		});


                //Définit le titre de la fenêtre.
                this.setTitle("Paris en cours");
                //Définit la taille de la fenêtre.
                this.setSize(800, 600);
                //Positionne la fenêtre au centre de l'écran.
                this.setLocationRelativeTo(null);
                //Empêche le redimensionnement de la fenêtre.
                this.setResizable(false);
	}



/**
* On construit le fond d'écran avec les composants (boutons et titres).
* Cette 1ère méthode s'utilise si le joueur n'a aucun pari en cours ;
* elle ne nécessite aucun paramètre.
*/
	void addBackground4()
	{
                layer0 = new JLayeredPane();

		//Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "liste.jpg"));
		background.setBounds (0,0,800,600) ;
		background.setOpaque(true);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);


		//Pour les boutons
                nvParis = new Bouton(225,400,150,50);
                nvParis.setIcon(new ImageIcon(pathImage + "nvParisEC4.jpg" ));
                nvParis.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("nouveaux paris");
                            Ecran5 ecran5 = new Ecran5(dataP);
                            ecran5.addBackground5();
                            ecran5.setVisible(true);
                            setVisible(false);

                     }
                    });

                    
                retour = new Bouton(425,400,150,50);
                retour.setIcon(new ImageIcon(pathImage + "retourEC4.jpg" ));
                retour.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("retour 4->3");

                            Ecran3 ecran3 = new Ecran3(dataP);
                            ecran3.addBackground3();
                            ecran3.setVisible(true);
                            setVisible(false);

                     }
                    });


                //Pour les indications
                aucunPari = new LabelOutils(100,250,700,50);
                aucunPari.addMessage("Vous n'avez aucun paris en cours actuellement", "Arial", 30, Color.red);

               
		// On ajoute les composants
		layer0.add (nvParis,new Integer (1));
		layer0.add (retour,new Integer (1));
                layer0.add (aucunPari,new Integer (1));
		
	}




/**
 * On construit le fond d'écran avec les composants (boutons et titres).
 * Cette 2ème méthode s'utilise si le joueur a un ou plusieurs paris en cours (ils apparaîtront sous forme de liste, avec la mise)
 * Elle ne nécessite aucun paramètre.
 */

        void addBackground4bis()
	{

                layer0 = new JLayeredPane();

		//Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "liste.jpg"));
		background.setBounds (0,0,800,600) ;
		background.setOpaque(true);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);



		//Pour les boutons
                nvParis = new Bouton(200,450,150,50);
                nvParis.setIcon(new ImageIcon(pathImage + "nvParisEC4.jpg" ));
                nvParis.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("nouveaux paris");
                            Ecran5 ecran5 = new Ecran5(dataP);
                            ecran5.addBackground5();
                            ecran5.setVisible(true);
                            setVisible(false);

                     }
                });



                retour = new Bouton(425,450,150,50);
                retour.setIcon(new ImageIcon(pathImage + "retourEC4.jpg" ));
                retour.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("retour 4->3");

                            Ecran3 ecran3 = new Ecran3(dataP);
                            ecran3.addBackground3();
                            ecran3.setVisible(true);
                            setVisible(false);

                     }
                    });




                //Pour la liste
                listeParis = new JList();
                Font police1 = new Font("Arial",Font.ROMAN_BASELINE,20);
                listeParis.setFont(police1);
                listeParis.setBounds(100, 200, 600, 200);
                String[][] paris = dataP.voirParis();
                String[] liste = new String[dataP.nbParisEnCours()];


                //Remplir la liste uniquement avec les matchs sur lesquels le parieur a misé.
                int j=0;
                for(int i=0;i<paris.length;i++)
                {
                    if(Integer.parseInt(paris[i][3]) != 0)
                    {
                        liste[j]= paris[i][0] +" vs "+ paris[i][1] + paris[i][2] + paris[i][3] + " vie(s) de poulpe. ";
                        j=j+1;
                    }                
                }

                listeParis.setListData(liste);
                listeParis.setOpaque(false);
                listeParis.setForeground(Color.red);



		// On ajoute les composants
		layer0.add (nvParis,new Integer (1));
		layer0.add (retour,new Integer (1));
                layer0.add(listeParis,new Integer(1));
                


	}
}
